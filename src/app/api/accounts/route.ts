// /api/accounts/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Get session ID directly from cookies - Next.js server component way
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;
    
    // Fallback: Check Authorization header
    let authSessionId: string | null = null;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      authSessionId = authHeader.substring(7);
    }
    
    // Use either cookie or auth header
    const finalSessionId = sessionId || authSessionId;
    
    // Debug info - will show in server logs
    console.log('Cookies available:', cookieStore.getAll().map(c => c.name));
    console.log('Session from cookie:', sessionId);
    console.log('Session from auth header:', authSessionId);
    
    // Validate session ID
    if (!finalSessionId) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find active session and related user
    const session = await prisma.session.findUnique({
      where: {
        SessionID: finalSessionId,
        ExpiresAt: {
          gt: new Date() // Check if session is not expired
        }
      },
      include: {
        user: {
          select: {
            UserID: true,
            FirstName: true,
            LastName: true,
            Email: true
          }
        }
      }
    });

    // If session not found or expired
    if (!session) {
      return NextResponse.json(
        { message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Get user accounts (now excluding the removed columns)
    const accounts = await prisma.account.findMany({
      where: {
        UserID: session.user.UserID
      },
      select: {
        AccountID: true,
        Status: true,
        Balance: true,
        AccountType: true
      }
    });

    // Log access for audit purposes
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'user',
        actor_id: session.user.UserID,
        action: 'account_list_viewed',
        status: 'success'
      }
    });

    // Return user accounts and basic user info
    return NextResponse.json({
      accounts,
      user: {
        FirstName: session.user.FirstName,
        LastName: session.user.LastName,
        Email: session.user.Email
      }
    });
    
  } catch (error) {
    console.error('Error in accounts API:', error);
    
    // Log error for audit purposes (if possible)
    try {
      await prisma.aUDIT_LOGS.create({
        data: {
          actor_type: 'system',
          action: 'account_list_error',
          status: 'error'
        }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
