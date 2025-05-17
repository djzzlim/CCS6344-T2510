// src/lib/auth.ts
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Gets the current user ID from session cookie
 */
export async function getCurrentUserId(req?: NextRequest): Promise<string | null> {
  try {
    let sessionId: string | undefined;
    
    // Extract the cookie based on the context
    if (req) {
      // Using the request directly
      const sessionCookie = req.cookies.get('session_id');
      sessionId = sessionCookie?.value;
    } else {
      // Using the Next.js cookies API
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session_id'); // This app uses session_id, not user_session
      sessionId = sessionCookie?.value;
    }

    // If session ID exists, get the user from the database
    if (sessionId) {
      const session = await prisma.session.findUnique({
        where: {
          SessionID: sessionId,
          ExpiresAt: {
            gt: new Date() // Check if session is not expired
          }
        },
        include: {
          user: {
            select: {
              UserID: true
            }
          }
        }
      });

      if (session?.user) {
        return session.user.UserID;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Verifies if the request is authenticated
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const userId = await getCurrentUserId(req);
  return userId !== null;
}