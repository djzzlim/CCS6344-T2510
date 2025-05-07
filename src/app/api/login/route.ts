import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers'; // for cookie management

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { Email: email },
    });

    // If no user or PasswordHash is missing, return error
    if (!user || !user.PasswordHash) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the provided password with the stored hash
    const isValid = await bcrypt.compare(password, user.PasswordHash);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Create a session for the user
    const session = await prisma.session.create({
      data: {
        UserID: user.UserID, // Link to the User model
        ExpiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000), // Set expiration (24 hours)
      },
    });

    // Set the session_id cookie
    (await cookies()).set('session_id', session.SessionID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Return response
    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.UserID, email: user.Email },
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
