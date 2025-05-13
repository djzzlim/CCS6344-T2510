import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { compare, hash } from "bcrypt";

/**
 * Helper function to log failed password change attempts
 */
async function logAuditFailure(actorId: string, targetId: string, action: string) {
  try {
    await prisma.aUDIT_LOGS.create({
      data: {
        actor_type: "USER",
        actor_id: actorId,
        action: action,
        target_id: targetId,
        status: "FAILURE",
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}

/**
 * PUT /api/user/change-password
 */
export async function PUT(req: NextRequest) {
  try {
    // Get session ID from cookies
    const sessionId = (await cookies()).get("session_id")?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch session and user
    const session = await prisma.session.findUnique({
      where: { SessionID: sessionId },
      include: {
        user: true,
      },
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    const user = session.user;

    // Parse request body
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Password complexity check
    const passwordChecks = {
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };

    if (!Object.values(passwordChecks).every(Boolean)) {
      return NextResponse.json(
        {
          error:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          checks: passwordChecks,
        },
        { status: 400 }
      );
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.PasswordHash);
    if (!isPasswordValid) {
      await logAuditFailure(user.UserID, user.UserID, "Invalid current password");
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    // Prevent reusing same password
    const isSamePassword = await compare(newPassword, user.PasswordHash);
    if (isSamePassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 }
      );
    }

    // Rate-limit password changes (optional)
    const recentChanges = await prisma.aUDIT_LOGS.count({
      where: {
        actor_id: user.UserID,
        action: "PASSWORD_CHANGE",
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // last 24h
        },
      },
    });

    if (recentChanges >= 5) {
      await logAuditFailure(user.UserID, user.UserID, "Too many password changes");
      return NextResponse.json(
        { error: "Too many password changes in the last 24 hours. Please try again later." },
        { status: 429 }
      );
    }

    const hashedPassword = await hash(newPassword, 12);

    // Update password and audit log
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { UserID: user.UserID },
        data: { PasswordHash: hashedPassword },
      });

      await tx.aUDIT_LOGS.create({
        data: {
          actor_type: "USER",
          actor_id: user.UserID,
          action: "Password successfully changed",
          target_id: user.UserID,
          status: "SUCCESS",
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Password has been successfully updated",
    });
  } catch (error: any) {
    console.error("Error changing password:", error);

    try {
      const sessionId = (await cookies()).get("session_id")?.value;
      if (sessionId) {
        const session = await prisma.session.findUnique({
          where: { SessionID: sessionId },
        });

        if (session) {
          await logAuditFailure(session.UserID, session.UserID, `Server error: ${error.message}`);
        }
      }
    } catch (logError) {
      console.error("Error logging failure:", logError);
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
