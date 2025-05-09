//validate-session route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ valid: false, role: null });
  }

  const session = await prisma.session.findUnique({
    where: { SessionID: sessionId },
    include: {
      user: {  // Correct relation field 'user'
        select: {
          Role: true  // Getting role of the user associated with the session
        }
      }
    },
  });

  // Session does not exist
  if (!session) {
    return NextResponse.json({ valid: false, role: null });
  }

  const now = new Date();

  // Session is expired → delete it
  if (session.ExpiresAt < now) {
    await prisma.session.delete({
      where: { SessionID: sessionId },
    });

    return NextResponse.json({ valid: false, role: null });
  }

  // Session is valid
  return NextResponse.json({ valid: true, role: session.user?.Role || null });
}

