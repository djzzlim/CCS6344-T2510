// src/lib/auth.ts
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

interface Session {
  userId: string;
}

/**
 * Gets the current user ID from session cookie
 */
export async function getCurrentUserId(req?: NextRequest): Promise<string | null> {
  try {
    if (req) {
      const sessionCookie = req.cookies.get('user_session');
      if (sessionCookie) {
        const session: Session = JSON.parse(sessionCookie.value);
        return session.userId;
      }
    } else {
      const cookieStore = cookies(); // Allowed here because it's inside a server function
      const sessionCookie = cookieStore.get('user_session');
      if (sessionCookie) {
        const session: Session = JSON.parse(sessionCookie.value);
        return session.userId;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  }
}

/**
 * Verifies if the request is authenticated
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const userId = await getCurrentUserId(req);
  return userId !== null;
}
