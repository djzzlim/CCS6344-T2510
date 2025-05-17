// app/api/transactions/[transactionId]/approve/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function PATCH(request: Request, props: { params: Promise<{ transactionId: string }> }) {
  const params = await props.params;
  const { transactionId } = params;

  try {
    // Retrieve session info (like in your create account API)
    const sessionId = (await cookies()).get('session_id')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Unauthorized: No session found' }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { SessionID: sessionId },
      include: { user: true },  // To get role directly
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized: Invalid session' }, { status: 401 });
    }

    const { user } = session;

    // Check if transfer exists (and is not already approved)
    const transfer = await prisma.transfer.findUnique({
      where: { TransferID: transactionId },
    });

    if (!transfer) {
      return NextResponse.json(
        { error: `Transfer with ID ${transactionId} not found.` },
        { status: 404 }
      );
    }

    if (transfer.Status === 'Approved') {
      return NextResponse.json(
        { error: `Transfer ${transactionId} is already approved.` },
        { status: 400 }
      );
    }

    // Fetch fromAccount and toAccount
    const [fromAccount, toAccount] = await Promise.all([
      prisma.account.findUnique({ where: { AccountID: transfer.FromAccountID } }),
      prisma.account.findUnique({ where: { AccountID: transfer.ToAccountID } }),
    ]);

    if (!fromAccount || !toAccount) {
      return NextResponse.json(
        { error: 'One or both accounts involved in this transfer no longer exist.' },
        { status: 400 }
      );
    }

    const amount = Number(transfer.Amount);

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid transfer amount.' },
        { status: 400 }
      );
    }

    // Ensure fromAccount has enough balance
    if (Number(fromAccount.Balance) < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance in sender account.' },
        { status: 400 }
      );
    }

    // Prisma transaction — approve transfer, update balances, insert audit log
    const [updatedTransfer, updatedFromAccount, updatedToAccount] = await prisma.$transaction([
      prisma.transfer.update({
        where: { TransferID: transactionId },
        data: {
          Status: 'Approved',
          UpdatedAt: new Date(),
        },
      }),
      prisma.account.update({
        where: { AccountID: transfer.FromAccountID },
        data: {
          Balance: String(Number(fromAccount.Balance) - amount),
        },
      }),
      prisma.account.update({
        where: { AccountID: transfer.ToAccountID },
        data: {
          Balance: String(Number(toAccount.Balance) + amount),
        },
      }),
    ]);


    // // Add audit log (SUCCESS)
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: user.Role,
        actor_id: user.UserID,
        action: `Approved transfer of $${amount.toFixed(2)}`,  // Descriptive action
        target_id: transactionId,
        status: 'success',
      },
    });

    return NextResponse.json({
      message: `Transfer ${transactionId} approved successfully. Funds transferred.`,
      transfer: updatedTransfer,
      fromAccount: updatedFromAccount,
      toAccount: updatedToAccount,
    });

  } catch (error) {
    console.error('[APPROVE_TRANSFER_ERROR]', error);

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
              action: 'Failed to approve transfer',
              status: 'error',
            },
          });
        }
      }
    } catch (auditError) {
      console.error('[AUDIT LOG ERROR]', auditError);
    }

    return NextResponse.json(
      { error: 'An error occurred while approving the transfer.' },
      { status: 500 }
    );
  }

}