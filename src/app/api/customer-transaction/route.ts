// /api/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get session ID from cookies
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find the session in the database
    const session = await prisma.session.findUnique({
      where: { SessionID: sessionId },
      include: { user: true }
    });

    // Verify session is valid and not expired
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 401 }
      );
    }

    if (new Date() > session.ExpiresAt) {
      // Delete expired session
      await prisma.session.delete({
        where: { SessionID: sessionId }
      });
      
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      );
    }

    const user = session.user;

    // Find all accounts for the user
    const accounts = await prisma.account.findMany({
      where: { UserID: user.UserID }
    });

    if (!accounts || accounts.length === 0) {
      return NextResponse.json(
        { transfers: [], payments: [] },
        { status: 200 }
      );
    }

    // Get account IDs
    const accountIds = accounts.map(account => account.AccountID);

    // Find transfers where user's accounts are involved (both sent and received)
    const transfers = await prisma.transfer.findMany({
      where: {
        OR: [
          { FromAccountID: { in: accountIds } },
          { ToAccountID: { in: accountIds } }
        ]
      },
      orderBy: {
        CreatedAt: 'desc'
      },
      take: 20 // Limit to most recent 20 transfers
    });

    // Find all payments made from user's accounts
    const payments = await prisma.payment.findMany({
      where: {
        AccountID: { in: accountIds }
      },
      include: {
        utility: true // Include utility information
      },
      orderBy: {
        Timestamp: 'desc'
      },
      take: 20 // Limit to most recent 20 payments
    });

    // Process transfers to determine if they are debits or credits
    // from the current user's perspective
    const processedTransfers = transfers.map(transfer => {
      // Check if this transfer is outgoing from the user's account
      const isOutgoing = accountIds.includes(transfer.FromAccountID);
      
      // For outgoing transfers, make amount negative (money leaving account)
      // For incoming transfers, keep amount positive (money entering account)
      const amount = isOutgoing ? -Number(transfer.Amount) : Number(transfer.Amount);

      // Determine source/destination account names (for better descriptions)
      let description = transfer.Description || 'Transfer';
      
      return {
        ...transfer,
        // Handle BigInt/Decimal conversion for JSON serialization
        TransferID: transfer.TransferID,
        FromAccountID: transfer.FromAccountID,
        ToAccountID: transfer.ToAccountID,
        Amount: amount,
        Description: description,
        CreatedAt: transfer.CreatedAt ? transfer.CreatedAt.toISOString() : null,
        Status: transfer.Status,
        TransferType: transfer.TransferType,
        isOutgoing: isOutgoing
      };
    });

    // Process payments (always debits)
    const processedPayments = payments.map(payment => {
      return {
        PaymentID: payment.PaymentID,
        AccountID: payment.AccountID,
        UtilityID: payment.UtilityID,
        Amount: -Number(payment.Amount), // Payments are always negative (money going out)
        Timestamp: payment.Timestamp ? payment.Timestamp.toISOString() : null,
        Description: payment.Description || (payment.utility ? payment.utility.AccountName : 'Payment'),
        UtilityName: payment.utility ? payment.utility.AccountName : null,
        UtilityAccountNumber: payment.utility ? payment.utility.AccountNumber : null
      };
    });

    // Log activity
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: "user",
        actor_id: user.UserID,
        action: "view_transactions",
        target_id: user.UserID,
        status: "success"
      }
    });

    // Update session activity timestamp
    await prisma.session.update({
      where: { SessionID: sessionId },
      data: { UpdatedAt: new Date() }
    });

    return NextResponse.json({
      transfers: processedTransfers,
      payments: processedPayments
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}