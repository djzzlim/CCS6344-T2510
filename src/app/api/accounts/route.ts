import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID missing' }, { status: 400 });
  }

  // Validate session
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { customer: true },
  });

  if (!session || !session.customer) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 404 });
  }

  const customerId = session.customer.CustomerID;

  // Fetch accounts for the customer
  const accounts = await prisma.account.findMany({
    where: { CustomerID: customerId },
  });

  return NextResponse.json({ accounts });
}
