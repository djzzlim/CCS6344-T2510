import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: Promise<{ id: string }> })  {
  try {
    // Check authentication
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'officer') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { id } = (await context.params);
    
    // Get customer details with accounts
    const customer = await prisma.customer.findUnique({
      where: {
        CustomerID: id
      },
      include: {
        accounts: true
      }
    });
    
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    
    // Get account transactions
    const accounts = await Promise.all(customer.accounts.map(async (account) => {
      // Get payments
      const payments = await prisma.payment.findMany({
        where: { AccountID: account.AccountID },
        orderBy: { Timestamp: 'desc' },
        take: 10
      });
      
      // Get transfers from this account
      const transfersFrom = await prisma.transfer.findMany({
        where: { FromAccountID: account.AccountID },
        orderBy: { CreatedAt: 'desc' },
        take: 10
      });
      
      // Get transfers to this account
      const transfersTo = await prisma.transfer.findMany({
        where: { ToAccountID: account.AccountID },
        orderBy: { CreatedAt: 'desc' },
        take: 10
      });
      
      // Combine and sort all transactions
      const allTransactions = [
        ...payments.map(payment => ({
          id: `PAY-${payment.PaymentID}`,
          date: payment.Timestamp,
          amount: payment.Amount.toNumber(),
          type: 'Payment',
          status: 'Completed',
          description: payment.Description || 'Payment'
        })),
        ...transfersFrom.map(transfer => ({
          id: `TRX-${transfer.TransferID}`,
          date: transfer.CreatedAt,
          amount: -transfer.Amount.toNumber(), // Negative amount for outgoing transfers
          type: transfer.TransferType || 'Transfer Out',
          status: transfer.Status,
          description: transfer.Description || 'Transfer Out'
        })),
        ...transfersTo.map(transfer => ({
          id: `TRX-${transfer.TransferID}`,
          date: transfer.CreatedAt,
          amount: transfer.Amount.toNumber(),
          type: transfer.TransferType || 'Transfer In',
          status: transfer.Status,
          description: transfer.Description || 'Transfer In'
        }))
      ];
      
      // Sort by date, newest first
      allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return {
        number: `****${account.AccountID.substring(account.AccountID.length - 4)}`,
        type: account.AccountType,
        balance: account.Balance.toNumber(),
        openDate: formatDate(account.AccountOpenDate), // Use AccountOpenDate here
        status: account.Status,
        accountId: account.AccountID,
        transactions: allTransactions.slice(0, 10) // Only return 10 most recent transactions
      };
    }));
    
    // Format response
    const formattedCustomer = {
      id: customer.CustomerID,
      name: `${customer.FirstName} ${customer.LastName}`,
      email: customer.Email,
      phone: customer.ContactNumber || 'N/A',
      address: customer.AddressLine1 ? 
        `${customer.AddressLine1}, ${customer.City || ''}, ${customer.State || ''} ${customer.ZipCode || ''}` : 
        'No address on file',
      accountOpenDate: formatDate(customer.AccountOpenDate || new Date()), // Use AccountOpenDate here
      // Determine account manager - this would typically be fetched from a relationship
      // but for now we'll use a placeholder
      accountManager: 'Assigned Officer',
      lastContact: formatDate(new Date()), // Placeholder, would be from an interactions table
      accounts: accounts,
      // Merge all transactions from all accounts and sort by date
      transactionHistory: accounts.flatMap(account => account.transactions)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10) // Only return 10 most recent transactions
    };
    
    return NextResponse.json(formattedCustomer);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    return NextResponse.json({ error: 'Failed to fetch customer details' }, { status: 500 });
  }
}

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
}
