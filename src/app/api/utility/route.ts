// /api/utilities/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

function calculateEstimatedDueDate(timestamp: Date): Date {
  const dueDate = new Date(timestamp);
  dueDate.setDate(dueDate.getDate() + 30);
  return dueDate;
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    const authHeader = request.headers.get('authorization');
    const authSessionId = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    const finalSessionId = sessionId || authSessionId;

    if (!finalSessionId) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { SessionID: finalSessionId },
      include: {
        user: { select: { UserID: true } },
      },
    });

    if (!session || session.ExpiresAt <= new Date()) {
      return NextResponse.json({ message: 'Invalid or expired session' }, { status: 401 });
    }

    const utilities = await prisma.utilities.findMany({
      select: {
        UtilityID: true,
        AccountName: true,
        AccountNumber: true,
        payments: {
          orderBy: { Timestamp: 'desc' },
          take: 1,
          select: { Amount: true, Timestamp: true },
        },
      },
    });

    const formattedUtilities = utilities.map((utility) => {
      const lastPayment = utility.payments[0];
      return {
        id: utility.UtilityID,
        name: utility.AccountName || 'Unknown Utility',
        accountNumber: utility.AccountNumber.slice(-4).padStart(utility.AccountNumber.length, '*'), // Mask sensitive data
        lastAmount: lastPayment?.Amount ? Number(lastPayment.Amount) : null,
        lastPaymentDate: lastPayment?.Timestamp || null,
        estimatedDueDate: lastPayment?.Timestamp
          ? calculateEstimatedDueDate(lastPayment.Timestamp)
          : null,
      };
    });

    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'user',
        actor_id: session.user.UserID,
        action: 'utilities_list_viewed',
        status: 'success',
      },
    });

    return NextResponse.json({ utilities: formattedUtilities });
  } catch (error) {
    console.error('Error in utilities API:', error);

    try {
      await prisma.aUDIT_LOGS.create({
        data: {
          actor_type: 'system',
          action: 'utilities_list_error',
          status: 'error',
        },
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
