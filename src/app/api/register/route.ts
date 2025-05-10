// src/app/api/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid'; // <- use UUID to generate unique IDs

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      contactNumber,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      password
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !contactNumber || !dateOfBirth || !addressLine1 || !city || !state || !zipCode) {
      return NextResponse.json({ message: 'Please provide all required fields.' }, { status: 400 });
    }

    // Check if email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { Email: email }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use.' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique UserID using UUID
    const userId = `USER-${uuidv4()}`;

    // Create new user with a default "Customer" role
    const newUser = await prisma.user.create({
      data: {
        UserID: userId,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        ContactNumber: contactNumber,
        DateOfBirth: new Date(dateOfBirth),
        AddressLine1: addressLine1,
        AddressLine2: addressLine2 || null,
        City: city,
        State: state,
        ZipCode: zipCode,
        PasswordHash: hashedPassword,
        Role: 'Customer',  // Ensure the role is set to 'Customer' explicitly
        AccountOpenDate: new Date(),
      },
    });

    // Return the new user object without the password hash for security
    const { PasswordHash, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Check if the error is related to a duplicate email (unique constraint violation)
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'This email is already registered.' }, { status: 400 });
    }
    
    // Return a generic error message for other errors
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}
