// app/api/transactions/[transactionId]/approve/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // assuming you have prisma client in lib/prisma.ts


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

    // Approve the transfer
    const approvedTransfer = await prisma.transfer.update({
      where: { TransferID: transactionId },
      data: {
        Status: 'Approved',
        UpdatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: `Transfer ${transactionId} approved successfully.`,
      transfer: approvedTransfer,
    });
  } catch (error: any) {
    console.error('[APPROVE_TRANSFER_ERROR]', error);
    return NextResponse.json(
      { error: 'An error occurred while approving the transfer.' },
      { status: 500 }
    );
  }
}
