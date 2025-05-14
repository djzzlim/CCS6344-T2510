import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUserId } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - List all users
export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the user with role
    const user = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!user || user.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get users with their accounts
    const users = await prisma.user.findMany({
      select: {
        UserID: true,
        Email: true,
        FirstName: true,
        LastName: true,
        Role: true,
        ContactNumber: true,
        DateOfBirth: true,
        AddressLine1: true,
        AddressLine2: true,
        City: true,
        State: true,
        ZipCode: true,
        AccountOpenDate: true,
        accounts: {
          select: {
            AccountID: true,
            AccountType: true,
            Balance: true,
            Status: true
          }
        }
      }
    });

    // Log access for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: 'Listed all users',
        status: 'success'
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Create new user
export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the user with role
    const user = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!user || user.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      contactNumber,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode
    } = data;

    // Create user
    const newUser = await prisma.user.create({
      data: {
        Email: email,
        PasswordHash: password, // Note: In production, hash the password before storing
        FirstName: firstName,
        LastName: lastName,
        Role: role,
        ContactNumber: contactNumber,
        DateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        AddressLine1: addressLine1,
        AddressLine2: addressLine2,
        City: city,
        State: state,
        ZipCode: zipCode,
        AccountOpenDate: new Date()
      }
    });

    // Log creation for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: user.UserID,
        action: 'Created new user',
        target_id: newUser.UserID,
        status: 'success'
      }
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 