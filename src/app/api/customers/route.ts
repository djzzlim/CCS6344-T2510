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

      // Add search conditions based on Username, Email, FirstName, LastName
      orConditions.push(
        {
          Username: {
            contains: loweredSearch,
            mode: 'insensitive', // Case-insensitive search
          },
        },
        {
          Email: {
            contains: loweredSearch,
            mode: 'insensitive',
          },
        },
        {
          FirstName: {
            contains: loweredSearch,
            mode: 'insensitive',
          },
        },
        {
          LastName: {
            contains: loweredSearch,
            mode: 'insensitive',
          },
        }
      );

      // If numeric, search UserID (e.g., account number, if that is the key identifier)
      if (!isNaN(Number(searchTerm))) {
        orConditions.push({ UserID: String(Number(searchTerm)) });
      }
    }

    const whereClause = orConditions.length > 0 ? { OR: orConditions, Role: 'Customer' } : { Role: 'Customer' };

    // Fetch only users with the "Customer" role and associated accounts
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        accounts: true,
      },
      orderBy: {
        LastName: 'asc',
      },
    });

    console.log(`Found ${users.length} customers`);

    // Format the response
    const formattedUsers = users.map(user => {
      const totalBalance = user.accounts.reduce((sum, account) => {
        return sum + (account.Balance?.toNumber() || 0); // Handle case where Balance might be null/undefined
      }, 0);

      return {
        id: user.UserID,
        name: `${user.FirstName || ''} ${user.LastName || ''}`.trim(),
        username: user.Username,
        email: user.Email,
        phone: user.ContactNumber || 'N/A',
        address: user.AddressLine1
          ? `${user.AddressLine1}, ${user.City || ''}, ${user.State || ''} ${user.ZipCode || ''}`.trim()
          : 'No address on file',
        accountOpenDate: user.AccountOpenDate
          ? formatDate(user.AccountOpenDate)
          : 'No account open date',
        totalBalance: totalBalance,
        accountCount: user.accounts.length,
      };
    });

    return NextResponse.json(formattedUsers);

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// Helper function to format date
function formatDate(dateString: string | Date | null) {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
