// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const transfers = await prisma.transfer.findMany({
      include: {
        fromAccount: {
          include: {
            customer: true,
          },
        },
        toAccount: {
          include: {
            customer: true,
          },
        },
      },
    });
    
    return NextResponse.json(transfers);
  } catch (error) {
    console.error('Error fetching transfers:', error);
    return NextResponse.json({ error: 'Failed to fetch transfers' }, { status: 500 });
  }
}