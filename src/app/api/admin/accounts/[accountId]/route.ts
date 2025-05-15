import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUserId } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - Get account by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const { accountId } = await params;
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

    // Get account with user details
    const account = await prisma.account.findUnique({
      where: { AccountID: accountId },
      include: {
        user: {
          select: {
            UserID: true,
            Email: true,
            FirstName: true,
            LastName: true
          }
        }
      }
    });

    if (!account) {
      return NextResponse.json({ message: 'Account not found' }, { status: 404 });
    }

    // Log access for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: 'Viewed account details',
        target_id: account.AccountID,
        status: 'success'
      }
    });

    return NextResponse.json({ account });
  } catch (error) {
    console.error('Error fetching account:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH - Update account
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const { accountId } = await params;
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

    // Check if account exists
    const existingAccount = await prisma.account.findUnique({
      where: { AccountID: accountId }
    });

    if (!existingAccount) {
      return NextResponse.json({ message: 'Account not found' }, { status: 404 });
    }

    const data = await request.json();
    const { balance, status } = data;

    // Update account
    const account = await prisma.account.update({
      where: { AccountID: accountId },
      data: {
        Status: status,
        Balance: balance
      }
    });

    // Log update for audit - the details field doesn't exist in the schema
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: `Updated account: status=${status}, balance=${balance}`,
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

// DELETE - Delete account
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const { accountId } = await params;
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

    // Check if account exists
    const existingAccount = await prisma.account.findUnique({
      where: { AccountID: accountId }
    });

    if (!existingAccount) {
      return NextResponse.json({ message: 'Account not found' }, { status: 404 });
    }

    // Log deletion for audit (before actual deletion) - details field doesn't exist in schema
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: `Deleted account: type=${existingAccount.AccountType}, balance=${existingAccount.Balance}`,
        target_id: accountId,
        status: 'success'
      }
    });

    // Delete related transactions
    // The 'transaction' model is named 'Transfer' in the schema
    await prisma.transfer.deleteMany({
      where: { 
        OR: [
          { FromAccountID: accountId },
          { ToAccountID: accountId }
        ]
      }
    });

    // Delete account
    await prisma.account.delete({
      where: { AccountID: accountId }
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 