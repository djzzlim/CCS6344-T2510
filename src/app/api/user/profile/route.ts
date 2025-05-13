// api/user/profile/route.ts (Updated version)
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET endpoint to fetch user profile data
export async function GET(req: NextRequest) {
  try {
    // Get the session ID from cookies
    const sessionId = (await cookies()).get('session_id')?.value;

    // Check if session exists
    if (!sessionId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the session and include the associated user
    const session = await prisma.session.findUnique({
      where: { SessionID: sessionId },
      include: {
        user: {
          select: {
            UserID: true,
            Email: true,
            FirstName: true,
            LastName: true,
            ContactNumber: true,
            AddressLine1: true,
            AddressLine2: true,
            City: true,
            State: true,
            ZipCode: true,
            DateOfBirth: true,
            Role: true,
            // Not selecting PasswordHash
          }
        }
      }
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Session not found or invalid" },
        { status: 401 }
      );
    }

    // Return user profile data
    return NextResponse.json(session.user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

// PUT endpoint to update user profile data
export async function PUT(req: NextRequest) {
  try {
    // Get the session ID from cookies
    const sessionId = cookies().get('session_id')?.value;

    // Check if session exists
    if (!sessionId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the session to get the user ID
    const session = await prisma.session.findUnique({
      where: { SessionID: sessionId },
      select: {
        user: {
          select: {
            UserID: true
          }
        }
      }
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Session not found or invalid" },
        { status: 401 }
      );
    }

    const userId = session.user.UserID;

    // Parse the request body
    const data = await req.json();
    
    // Update the user profile
    const updatedUser = await prisma.user.update({
      where: {
        UserID: userId,
      },
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        ContactNumber: data.phone,
        AddressLine1: data.addressLine1,
        AddressLine2: data.addressLine2,
        City: data.city,
        State: data.state,
        ZipCode: data.zipCode,
      },
      select: {
        UserID: true,
        Email: true,
        FirstName: true,
        LastName: true,
        ContactNumber: true,
        AddressLine1: true,
        AddressLine2: true,
        City: true,
        State: true,
        ZipCode: true,
        Role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}