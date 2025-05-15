import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUserId } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - Get a user by ID
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the current user with role
    const currentUser = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!currentUser || currentUser.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get requested user
    const user = await prisma.user.findUnique({
      where: { UserID: params.userId },
      include: {
        accounts: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Log access for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: currentUser.UserID,
        action: 'Viewed user details',
        target_id: params.userId,
        status: 'success'
      }
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update a user
export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the current user with role
    const currentUser = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!currentUser || currentUser.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const {
      email,
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

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { UserID: params.userId }
    });

    if (!userExists) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { UserID: params.userId },
      data: {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        Role: role,
        ContactNumber: contactNumber,
        DateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        AddressLine1: addressLine1,
        AddressLine2: addressLine2,
        City: city,
        State: state,
        ZipCode: zipCode
      }
    });

    // Log update for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: currentUser.UserID,
        action: 'Updated user',
        target_id: params.userId,
        status: 'success'
      }
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Delete a user
export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the current user with role
    const currentUser = await prisma.user.findUnique({
      where: { UserID: userId },
      select: { Role: true, UserID: true }
    });

    // Check if user is admin
    if (!currentUser || currentUser.Role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { UserID: params.userId }
    });

    if (!userExists) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Delete user's accounts first (due to foreign key constraints)
    await prisma.account.deleteMany({
      where: { UserID: params.userId }
    });

    // Delete user's sessions
    await prisma.session.deleteMany({
      where: { UserID: params.userId }
    });

    // Delete user
    await prisma.user.delete({
      where: { UserID: params.userId }
    });

    // Log deletion for audit
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: 'Admin',
        actor_id: currentUser.UserID,
        action: 'Deleted user',
        target_id: params.userId,
        status: 'success'
      }
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 