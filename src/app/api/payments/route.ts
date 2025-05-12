// /api/payments/route.ts
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
    if (!session || new Date() > session.ExpiresAt) {
      return NextResponse.json(
        { error: 'Session expired or invalid' },
        { status: 401 }
      );
    }

    const user = session.user;

    // Find all accounts for the user
    const accounts = await prisma.account.findMany({
      where: { UserID: user.UserID }
    });

    // Fetch all utility providers
    const utilities = await prisma.utilities.findMany();

    // Fetch recent payments for the user's accounts
    const recentPayments = await prisma.payment.findMany({
      where: {
        AccountID: { in: accounts.map(account => account.AccountID) }
      },
      include: {
        utility: true,
        account: true
      },
      orderBy: {
        Timestamp: 'desc'
      },
      take: 5
    });

    // Log activity
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: "user",
        actor_id: user.UserID,
        action: "view_payment_details",
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
      accounts,
      utilities,
      recentPayments: recentPayments.map(payment => ({
        id: payment.PaymentID,
        to: payment.utility?.AccountName || 'Unknown Utility',
        amount: Number(payment.Amount),
        date: payment.Timestamp?.toISOString(),
        status: 'Completed', // You might want to add a status field to the Payment model
        accountName: payment.account?.AccountType || 'Unknown Account'
      }))
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
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
    if (!session || new Date() > session.ExpiresAt) {
      return NextResponse.json(
        { error: 'Session expired or invalid' },
        { status: 401 }
      );
    }

    const user = session.user;

    // Parse request body
    const body = await req.json();
    const { 
      fromAccountId, 
      utilityId, 
      amount, 
      paymentDate, 
      memo 
    } = body;

    // Validate input
    if (!fromAccountId || !utilityId || !amount) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Check if account belongs to the user
    const fromAccount = await prisma.account.findFirst({
      where: {
        AccountID: fromAccountId,
        UserID: user.UserID
      }
    });

    if (!fromAccount) {
      return NextResponse.json(
        { error: 'Invalid account' },
        { status: 403 }
      );
    }

    // Check if utility exists
    const utility = await prisma.utilities.findUnique({
      where: { UtilityID: utilityId }
    });

    if (!utility) {
      return NextResponse.json(
        { error: 'Invalid utility provider' },
        { status: 404 }
      );
    }

    // Check if account has sufficient balance
    if (Number(fromAccount.Balance) < Number(amount)) {
      return NextResponse.json(
        { error: 'Insufficient funds' },
        { status: 400 }
      );
    }

    // Create payment transaction
    const payment = await prisma.$transaction(async (prisma) => {
      // Create payment record
      const newPayment = await prisma.payment.create({
        data: {
          AccountID: fromAccountId,
          UtilityID: utilityId,
          Amount: Number(amount),
          Description: memo || `Payment to ${utility.AccountName}`,
          Timestamp: new Date(paymentDate || Date.now())
        }
      });

      // Update account balance
      await prisma.account.update({
        where: { AccountID: fromAccountId },
        data: { 
          Balance: { 
            decrement: Number(amount) 
          } 
        }
      });

      // Log activity
      await prisma.aUDIT_LOGS.create({
        data: {
          actor_type: "user",
          actor_id: user.UserID,
          action: "make_payment",
          target_id: utilityId,
          status: "success"
        }
      });

      return newPayment;
    });

    // Update session activity timestamp
    await prisma.session.update({
      where: { SessionID: sessionId },
      data: { UpdatedAt: new Date() }
    });

    return NextResponse.json({
      message: 'Payment successful',
      paymentId: payment.PaymentID
    }, { status: 201 });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}