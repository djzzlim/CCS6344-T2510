// api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { getCurrentUserId } from "@/lib/auth";

// GET endpoint to fetch user profile data
export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user's ID
    const userId = await getCurrentUserId(req);
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: {
        UserID: userId,
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
        DateOfBirth: true,
        // Not returning sensitive data like PasswordHash
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
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
    // Get the authenticated user's ID
    const userId = await getCurrentUserId(req);
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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
        // Not returning sensitive data like PasswordHash
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