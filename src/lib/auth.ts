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
    let sessionValue: string | undefined;
    
    // Extract the cookie based on the context
    if (req) {
      // Using the request directly
      const sessionCookie = req.cookies.get('user_session');
      sessionValue = sessionCookie?.value;
    } else {
      // Using the Next.js cookies API
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get('user_session');
      sessionValue = sessionCookie?.value;
    }

    // If we have a session value, try to parse it
    if (sessionValue) {
      try {
        const session = JSON.parse(sessionValue) as Session;
        // Validate that the session has the expected structure
        if (session && typeof session === 'object' && 'userId' in session) {
          return session.userId;
        }
      } catch (parseError) {
        console.error('Error parsing session cookie:', parseError);
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