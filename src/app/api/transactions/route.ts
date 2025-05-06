// app/api/transactions/route.js

import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchTerm, filterStatus, activeTab } = req.nextUrl.searchParams;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        status: filterStatus !== 'all' ? filterStatus : undefined,
        customerName: {
          contains: searchTerm,
          mode: 'insensitive', // case-insensitive search
        },
        // Add more filters based on activeTab, etc.
      },
      orderBy: {
        initiatedDate: 'desc', // sort by date
      },
    });

    return new Response(JSON.stringify({ transactions }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching transactions' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
