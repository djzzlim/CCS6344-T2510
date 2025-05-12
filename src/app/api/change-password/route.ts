// api/user/change-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { getCurrentUserId } from "@/lib/auth";
import { compare, hash } from "bcrypt";

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
    const { currentPassword, newPassword } = await req.json();
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Fetch user with password
    const user = await prisma.user.findUnique({
      where: {
        UserID: userId,
      },
      select: {
        UserID: true,
        PasswordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.PasswordHash);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: {
        UserID: userId,
      },
      data: {
        PasswordHash: hashedPassword,
      },
    });

    // Add an audit log entry
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: "USER",
        actor_id: userId,
        action: "PASSWORD_CHANGE",
        target_id: userId,
        status: "SUCCESS",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}