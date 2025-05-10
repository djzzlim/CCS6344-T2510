// app/api/transactions/[transactionId]/reject/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function PATCH(request: Request, props: { params: Promise<{ transactionId: string }> }) {
  const params = await props.params;
  const { transactionId } = params;

  try {
    // Retrieve session info
    const sessionId = (await cookies()).get('session_id')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Unauthorized: No session found' }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { SessionID: sessionId },
      include: { user: true },
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized: Invalid session' }, { status: 401 });
    }

    const { user } = session;

    // Check if transfer exists
    const transfer = await prisma.transfer.findUnique({
      where: { TransferID: transactionId },
    });

    if (!transfer) {
      return NextResponse.json(
        { error: `Transfer with ID ${transactionId} not found.` },
        { status: 404 }
      );
    }

    if (transfer.Status === 'Rejected') {
      return NextResponse.json(
        { error: `Transfer ${transactionId} is already rejected.` },
        { status: 400 }
      );
    }

    if (transfer.Status === 'Approved') {
      return NextResponse.json(
        { error: `Transfer ${transactionId} has already been approved and cannot be rejected.` },
        { status: 400 }
      );
    }

    // Reject the transfer
    const rejectedTransfer = await prisma.transfer.update({
      where: { TransferID: transactionId },
      data: {
        Status: 'Rejected',
        UpdatedAt: new Date(),
      },
    });

    // Add audit log (SUCCESS)
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: user.Role,
        actor_id: user.UserID,
        action: `Rejected transfer of $${Number(transfer.Amount).toFixed(2)}`,  // Descriptive action
        target_id: transactionId,
        status: 'success',
      },
    });

    return NextResponse.json({
      message: `Transfer ${transactionId} rejected successfully.`,
      transfer: rejectedTransfer,
    });
  } catch (error) {
    console.error('[REJECT_TRANSFER_ERROR]', error);

    // Attempt to log audit FAILURE
    try {
      const sessionId = (await cookies()).get('session_id')?.value;
      if (sessionId) {
        const session = await prisma.session.findUnique({
          where: { SessionID: sessionId },
        });

        if (session) {
          await prisma.aUDIT_LOGS.create({
            data: {
              actor_type: 'User',
              actor_id: session.UserID,
              action: 'Failed to reject transfer',
              status: 'error',
            },
          });
        }
      }
    } catch (auditError) {
      console.error('[AUDIT LOG ERROR]', auditError);
    }

    return NextResponse.json(
      { error: 'An error occurred while rejecting the transfer.' },
      { status: 500 }
    );
  }
}
