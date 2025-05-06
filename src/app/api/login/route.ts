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
    const user = await prisma.customer.findUnique({
      where: { Email: email },
    });

    if (!user || !user.PasswordHash) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.PasswordHash);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Set session_id cookie
    cookies().set('session_id', user.CustomerID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.CustomerID, email: user.Email },
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
