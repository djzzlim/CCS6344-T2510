import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const body = await req.json();
    console.log('Parsed Body:', body); // Log the entire body to debug

    // Destructure the values from the parsed body
    const { accountType, email, password } = body;

    // Log the destructured values to ensure they're correct
    console.log('Parsed Values:', { accountType, email, password });

    // Check if email and password exist
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if accountType is valid
    if (!accountType) {
      return NextResponse.json(
        { message: 'Account type is required' },
        { status: 400 }
      );
    }

    // Validate user credentials
    const user = await prisma.user.findUnique({
      where: { Email: email },
    });

    if (!user || user.PasswordHash !== password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate a session ID (example, could be any other logic)
    const sessionId = 'some_unique_session_id';

    // Create or update session in the database
    await prisma.session.create({
      data: {
        SessionID: sessionId,
        UserID: user.UserID,
        ExpiresAt: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour expiration
      },
    });

    // Set the session cookie in the response
    const response = NextResponse.json({ message: 'Login successful' });

    // Set the session cookie with the appropriate settings
    response.cookies.set('user_session', JSON.stringify({ userId: user.UserID, sessionId }), {
      httpOnly: true, // Security: Cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production
      maxAge: 60 * 60, // 1 hour expiration
      path: '/', // Make sure the cookie is available for all paths
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
