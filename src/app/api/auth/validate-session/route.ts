// app/api/auth/validate-session/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ valid: false });
  }

  const session = await prisma.session.findUnique({
    where: { SessionID: sessionId },
  });

  // Session does not exist
  if (!session) {
    return NextResponse.json({ valid: false });
  }

  const now = new Date();

  // Session is expired → delete it
  if (session.ExpiresAt < now) {
    await prisma.session.delete({
      where: { SessionID: sessionId },
    });

    return NextResponse.json({ valid: false });
  }

  // Session is valid
  return NextResponse.json({ valid: true });
}
