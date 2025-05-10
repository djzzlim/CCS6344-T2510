import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    // Get customer details with accounts
    const customer = await prisma.user.findUnique({
      where: {
        UserID: id,
      },
      include: {
        accounts: {
          include: {
            payments: true, // Include payments for the account
            transfersFrom: true, // Include transfers from the account
            transfersTo: true, // Include transfers to the account
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Process account transactions (payments and transfers)
    const accounts = customer.accounts.map((account) => {
      // Combine and sort payments and transfers
      const transactions = [
        ...account.payments.map(payment => ({
          id: payment.PaymentID,
          date: payment.Timestamp,
          amount: payment.Amount?.toNumber(),
          type: 'Payment',
          status: 'Completed',
          description: payment.Description || 'Payment'
        })),
        ...account.transfersFrom.map(transfer => ({
          id: transfer.TransferID,
          date: transfer.CreatedAt,
          amount: -transfer.Amount?.toNumber(), // Negative for outgoing transfers
          type: transfer.TransferType || 'Transfer Out',
          status: transfer.Status,
          description: transfer.Description || 'Transfer Out'
        })),
        ...account.transfersTo.map(transfer => ({
          id: transfer.TransferID,
          date: transfer.CreatedAt,
          amount: transfer.Amount?.toNumber(),
          type: transfer.TransferType || 'Transfer In',
          status: transfer.Status,
          description: transfer.Description || 'Transfer In'
        }))
      ];

      // Sort transactions by date (most recent first)
      transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return {
        number: `****${account.AccountID?.substring(account.AccountID?.length - 4)}`, // Mask account number
        type: account.AccountType,
        balance: account.Balance?.toNumber(),
        status: account.Status,
        accountId: account.AccountID,
        transactions: transactions.slice(0, 10), // Only the 10 most recent transactions
      };
    });

    // Format response with customer data and account details
    const formattedCustomer = {
      id: customer.UserID,
      name: `${customer.FirstName} ${customer.LastName}`,
      email: customer.Email,
      phone: customer.ContactNumber || 'N/A',
      address: customer.AddressLine1 ? 
        `${customer.AddressLine1}, ${customer.City || ''}, ${customer.State || ''} ${customer.ZipCode || ''}` : 
        'No address on file',
      accountOpenDate: customer.AccountOpenDate ? formatDate(customer.AccountOpenDate) : 'Unknown',
      accounts: accounts,
      transactionHistory: accounts.flatMap(account => account.transactions)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10), // Only return the 10 most recent transactions across all accounts
    };

    return NextResponse.json(formattedCustomer);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    return NextResponse.json({ error: 'Failed to fetch customer details' }, { status: 500 });
  }
}

// Helper function to format date
function formatDate(dateString: Date | string | null) {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
}
