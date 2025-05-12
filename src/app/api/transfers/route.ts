// /app/api/transfers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get session ID from cookies
    const cookieStore = cookies();
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

    // Parse the request body
    const body = await req.json();
    const { 
      fromAccountId: FromAccountID, 
      toAccountId: ToAccountID, 
      amount: Amount, 
      memo: Description, 
      transferType: TransferType,
      accountNumber  // For external transfers, we'll just use accountNumber
    } = body;

    // Validate required fields
    if (!FromAccountID || !Amount || Amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Check if source account belongs to user
    const sourceAccount = await prisma.account.findFirst({
      where: {
        AccountID: FromAccountID,
        UserID: user.UserID
      }
    });

    if (!sourceAccount) {
      return NextResponse.json(
        { error: 'Source account not found or unauthorized' },
        { status: 403 }
      );
    }

    // Check if source account has enough funds
    if (sourceAccount.Balance < Amount) {
      return NextResponse.json(
        { error: 'Insufficient funds' },
        { status: 400 }
      );
    }

    // Prepare destination account ID
    let destinationAccountId = null;
    let destinationAccount = null;

    if (TransferType === 'Internal') {
      // For internal transfers, use the provided ToAccountID
      if (!ToAccountID) {
        return NextResponse.json(
          { error: 'Destination account is required for internal transfers' },
          { status: 400 }
        );
      }
      destinationAccountId = ToAccountID;
      
      // For internal transfers, check if the account belongs to the user
      destinationAccount = await prisma.account.findFirst({
        where: {
          AccountID: destinationAccountId,
          UserID: user.UserID
        }
      });
    } else {
      // For external transfers, use the accountNumber to find the account
      if (!accountNumber) {
        return NextResponse.json(
          { error: 'Account number is required for external transfers' },
          { status: 400 }
        );
      }
      
      // Try to find the account by ID
      destinationAccount = await prisma.account.findUnique({
        where: {
          AccountID: accountNumber
        }
      });
      
      if (destinationAccount) {
        destinationAccountId = destinationAccount.AccountID;
      } else {
        return NextResponse.json(
          { error: 'Destination account not found' },
          { status: 400 }
        );
      }
    }

    // Check that the destination account is valid
    if (!destinationAccount) {
      return NextResponse.json(
        { error: 'Destination account not found' },
        { status: 400 }
      );
    }

    // Check that accounts are different
    if (FromAccountID === destinationAccountId) {
      return NextResponse.json(
        { error: 'Source and destination accounts must be different' },
        { status: 400 }
      );
    }

    // Determine if transaction should be auto-approved (all transactions below $100)
    const isAutoApproved = Amount < 100;
    
    // Now all transfers are immediate, with status depending on amount
    const transferStatus = isAutoApproved ? 'Completed' : 'Pending Approval';

    // Use database transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      // Create transfer record
      const transfer = await prisma.transfer.create({
        data: {
          FromAccountID: FromAccountID,
          ToAccountID: destinationAccountId,
          Amount: Amount,
          Description: Description || 'Transfer',
          Status: transferStatus,
          TransferType: TransferType,
          CreatedAt: new Date(),
          UpdatedAt: new Date()
        }
      });

      // For completed transfers, update account balances immediately
      if (transferStatus === 'Completed') {
        // Deduct from source account
        await prisma.account.update({
          where: { AccountID: FromAccountID },
          data: {
            Balance: {
              decrement: Amount
            }
          }
        });

        // Add to destination account
        await prisma.account.update({
          where: { AccountID: destinationAccountId },
          data: {
            Balance: {
              increment: Amount
            }
          }
        });
      }

      // Log audit record
      await prisma.aUDIT_LOGS.create({
        data: {
          actor_type: "user",
          actor_id: user.UserID,
          action: `transfer_${isAutoApproved ? 'auto_approved' : 'pending_approval'}`,
          target_id: transfer.TransferID,
          status: "success"
        }
      });

      return transfer;
    });

    // Update session activity timestamp
    await prisma.session.update({
      where: { SessionID: sessionId },
      data: { UpdatedAt: new Date() }
    });

    // Return appropriate message based on auto-approval status
    const message = isAutoApproved 
      ? 'Transfer completed successfully' 
      : 'Transfer submitted successfully and pending approval';

    return NextResponse.json({
      success: true,
      message: message,
      transferId: result.TransferID,
      status: result.Status
    });
  } catch (error) {
    console.error('Error processing transfer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}