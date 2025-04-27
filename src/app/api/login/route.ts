// src/app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      console.error('❌ Missing email or password');
      return NextResponse.json({ message: 'Please provide both email and password.' }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.customer.findUnique({
      where: { Email: email },
    });

    if (!user) {
      console.error(`❌ User not found for email: ${email}`);
      return NextResponse.json({ message: 'Login Failed.' }, { status: 404 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      console.error(`❌ Invalid password attempt for email: ${email}`);
      return NextResponse.json({ message: 'Login Failed.' }, { status: 401 });
    }

    // Successful login
    const loginTime = new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });
    const successMessage = `✅ LOGIN SUCCESSFUL: ${email} at ${loginTime}`;
    console.log('\n' + '='.repeat(50));
    console.log(successMessage);
    console.log('='.repeat(50) + '\n');

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.PasswordHash;

    return NextResponse.json(userWithoutPassword, { status: 200 });

  } catch (error: unknown) {
    console.error('❌ Login error:', error);
    return NextResponse.json({ message: 'An error occurred during login.' }, { status: 500 });
  }
}
