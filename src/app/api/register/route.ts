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

    // Check if email already exists
    const existingUser = await prisma.customer.findUnique({
      where: { Email: email }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use.' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique CustomerID
    const customerId = `CUST-${uuidv4()}`;

    // Create new user
    const newUser = await prisma.customer.create({
      data: {
        CustomerID: customerId,
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
      },
    });

    // Return the new user without the password hash
    const { PasswordHash, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'This email is already registered.' }, { status: 400 });
    }
    
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}
