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

  if (!session || session.ExpiresAt < new Date()) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true });
}
