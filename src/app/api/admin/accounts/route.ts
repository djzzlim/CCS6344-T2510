import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUserId } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - List all accounts
export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the user with role
    const user = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!user || user.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get accounts with their users
    const accounts = await prisma.account.findMany({
      include: {
        user: {
          select: {
            UserID: true,
            Email: true,
            FirstName: true,
            LastName: true,
            Role: true
          }
        }
      }
    });

    // Log access for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: 'Listed all accounts',
        status: 'success'
      }
    });

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error('Error in accounts API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Create new account
export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the user with role
    const user = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!user || user.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { userId: targetUserId, accountType, initialBalance = 0 } = data;

    // Create account
    const account = await prisma.account.create({
      data: {
        UserID: targetUserId,
        AccountType: accountType,
        Balance: initialBalance,
        Status: 'Active'
      }
    });

    // Log creation for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: 'Created new account',
        target_id: account.AccountID,
        status: 'success'
      }
    });

    return NextResponse.json({ account }, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH - Update account
export async function PATCH(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the user with role
    const user = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!user || user.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { accountId, status, balance } = data;

    // Update account
    const account = await prisma.account.update({
      where: { AccountID: accountId },
      data: {
        Status: status,
        Balance: balance
      }
    });

    // Log update for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: 'Updated account',
        target_id: account.AccountID,
        status: 'success'
      }
    });

    return NextResponse.json({ account });
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 