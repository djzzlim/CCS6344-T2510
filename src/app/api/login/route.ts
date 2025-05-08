// src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

const SESSION_DURATION_MS = 60 * 60 * 24 * 1000; // 24 hours

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return NextResponse.json({ message: 'Missing or invalid email/password' }, { status: 400 });
    }

    // Normalize email to lower case (best practice)
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { Email: normalizedEmail },
    });

    if (!user?.PasswordHash) {
      // Same generic error for both missing user and bad password (prevents user enumeration)
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Optional: clean up old sessions (optional but nice hygiene)
    await prisma.session.deleteMany({
      where: {
        UserID: user.UserID,
        ExpiresAt: { lt: new Date() },
      },
    });

    // Create new session
    const session = await prisma.session.create({
      data: {
        UserID: user.UserID,
        ExpiresAt: new Date(Date.now() + SESSION_DURATION_MS),
      },
    });

    // Set secure cookie
    const cookieStore = cookies();
    (await cookieStore).set('session_id', session.SessionID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // prevents CSRF
      maxAge: SESSION_DURATION_MS / 1000,
      path: '/',
    });

    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.UserID, email: user.Email, role: user.Role }, // include role for client-side
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
