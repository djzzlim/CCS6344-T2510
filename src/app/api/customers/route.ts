import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Global Prisma client (singleton pattern)
const globalForPrisma = global as any;
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}
const prisma = globalForPrisma.prisma;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search')?.trim() || '';

    console.log('Querying database for customers with search term:', searchTerm);

    const orConditions: any[] = [];

    if (searchTerm.length > 0) {
      const loweredSearch = searchTerm.toLowerCase();

      orConditions.push(
        {
          FirstName: {
            contains: loweredSearch,
          },
        },
        {
          LastName: {
            contains: loweredSearch,
          },
        },
        {
          Email: {
            contains: loweredSearch,
          },
        }
      );

      // If numeric, search CustomerID
      if (!isNaN(Number(searchTerm))) {
        orConditions.push({ CustomerID: String(Number(searchTerm)) });
      }
    }

    const whereClause = orConditions.length > 0 ? { OR: orConditions } : {};

    const customers = await prisma.customer.findMany({
      where: whereClause,
      include: {
        accounts: true,
      },
      orderBy: {
        LastName: 'asc',
      },
    });

    console.log(`Found ${customers.length} customers`);

    const formattedCustomers = customers.map(customer => {
      const totalBalance = customer.accounts.reduce((sum, account) => {
        return sum + (account.Balance?.toNumber() || 0);
      }, 0);

      return {
        id: customer.CustomerID,
        name: `${customer.FirstName || ''} ${customer.LastName || ''}`.trim(),
        email: customer.Email,
        phone: customer.ContactNumber || 'N/A',
        address: customer.AddressLine1
          ? `${customer.AddressLine1}, ${customer.City || ''}, ${customer.State || ''} ${customer.ZipCode || ''}`.trim()
          : 'No address on file',
        accountOpenDate: customer.AccountOpenDate
          ? formatDate(customer.AccountOpenDate)
          : 'No account open date',
        totalBalance: totalBalance,
        accountCount: customer.accounts.length,
      };
    });

    return NextResponse.json(formattedCustomers);

  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

function formatDate(dateString: string | Date | null) {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
