// app/api/transactions/[transactionId]/reject/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, props: { params: Promise<{ transactionId: string }> }) {
  const params = await props.params;
  const { transactionId } = params;

  try {
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

    // Reject the transfer
    const rejectedTransfer = await prisma.transfer.update({
      where: { TransferID: transactionId },
      data: {
        Status: 'Rejected',
        UpdatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: `Transfer ${transactionId} rejected successfully.`,
      transfer: rejectedTransfer,
    });
  } catch (error: any) {
    console.error('[REJECT_TRANSFER_ERROR]', error);
    return NextResponse.json(
      { error: 'An error occurred while rejecting the transfer.' },
      { status: 500 }
    );
  }
}
