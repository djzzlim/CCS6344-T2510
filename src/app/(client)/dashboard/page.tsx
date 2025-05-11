//dashboard page
"use client";

import { useState, useEffect } from 'react';
import { Landmark, Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Account {
  AccountID: string;
  UserID?: string;
  AccountType?: string;
  Balance?: number;
  Status?: string;
  AccountNumber?: string; // For display purposes
}

interface Transfer {
  TransferID: string;
  FromAccountID?: string;
  ToAccountID?: string;
  Amount?: number;
  Description?: string;
  CreatedAt?: string;
  Status?: string;
  TransferType?: string;
}

// Combined type for all transactions display
interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'transfer' | 'payment';
}

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userName, setUserName] = useState('User');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Improved function to get the session ID from cookies in Next.js
    const getSessionId = () => {
      try {
        // Next.js specific cookie handling can be tricky
        // The cookie is set as httpOnly which means JavaScript can't directly access it
        // But we can still check document.cookie for its existence

        // Method 1: Try to check for cookie existence via document.cookie
        const cookieString = document.cookie;
        console.log('Cookie string:', cookieString);

        // You might need to just fetch data and let the browser handle cookies
        // Since httpOnly cookies are sent with requests but not accessible via JS

        // The session_id in your API route is set up correctly as httpOnly
        // We should rely on the browser to send it automatically with fetch
        // But return a placeholder value to prevent redirect

        return "session_exists"; // Placeholder to continue with fetch
      } catch (error) {
        console.error('Error accessing cookies:', error);
        return null;
      }
    };

    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // For httpOnly cookies, we don't need to manually extract the session
        // The browser will automatically send cookies with requests to the same domain
        const sessionId = getSessionId();

        if (!sessionId) {
          console.error('No session detected');
          setError('Authentication failed. Please log in again.');
          router.push('/auth/login'); // Redirect to login page
          return;
        }

        // Let browser automatically include the httpOnly cookie
        const response = await fetch('/api/accounts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // The browser will automatically include cookies
          credentials: 'include' // Important! This tells fetch to include cookies
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching accounts:', errorData);

          if (response.status === 401 || response.status === 403) {
            router.push('/auth/login'); // Redirect to login on auth errors
            return;
          }

          throw new Error(errorData.message || 'Failed to fetch accounts');
        }

        const data = await response.json();
        console.log('Fetched Accounts:', data);

        if (Array.isArray(data.accounts)) {
          setAccounts(data.accounts);

          // Set user name if available
          if (data.user) {
            const fullName = [data.user.FirstName, data.user.LastName]
              .filter(Boolean)
              .join(' ');
            setUserName(fullName || data.user.Email || '');
          }
        } else {
          throw new Error('Invalid accounts format received from server');
        }
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        setError(error.message || 'An error occurred while fetching your accounts');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/customer-transaction', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching transactions:', errorData);
          return;
        }

        const data = await response.json();
        let allTransactions = [];

        // Process transfers
        if (data.transfers && Array.isArray(data.transfers)) {
          const formattedTransfers = data.transfers.map((transfer: Transfer) => {
            // Format date
            const date = transfer.CreatedAt
              ? new Date(transfer.CreatedAt)
              : new Date();

            // Format relative date
            const formattedDate = formatRelativeDate(date);

            return {
              id: transfer.TransferID,
              name: transfer.Description || 'Transfer',
              category: transfer.TransferType || 'Transfer',
              amount: transfer.Amount || 0,
              date: formattedDate,
              type: 'transfer' as const
            };
          });

          allTransactions = [...allTransactions, ...formattedTransfers];
        }

        // Process payments
        if (data.payments && Array.isArray(data.payments)) {
          const formattedPayments = data.payments.map((payment) => {
            // Format date
            const date = payment.Timestamp
              ? new Date(payment.Timestamp)
              : new Date();

            // Format relative date
            const formattedDate = formatRelativeDate(date);

            return {
              id: payment.PaymentID,
              name: payment.Description || 'Payment',
              category: payment.UtilityName || 'Bill Payment',
              amount: payment.Amount || 0,
              date: formattedDate,
              type: 'payment' as const
            };
          });

          allTransactions = [...allTransactions, ...formattedPayments];
        }

        // Sort by date (newest first) and take the first 5
        const sortedTransactions = allTransactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchAccounts();
    fetchTransactions();
  }, [router]);

  // Helper function to format dates relative to today
  const formatRelativeDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      // Format as MMM DD
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Generate a formatted account number from AccountID for display
  const formatAccountNumber = (accountId: string): string => {
    // Take the last 4 characters of the ID and format as ****1234
    const lastFour = accountId.slice(-4);
    return `****${lastFour}`;
  };

  // Transaction Component
  const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isIncome = transaction.amount > 0;
    return (
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {isIncome ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
          </div>
          <div className="ml-3">
            <p className="font-medium">{transaction.name}</p>
            <p className="text-xs text-gray-500">{transaction.category}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">{transaction.date}</p>
        </div>
      </div>
    );
  };

  // Account Component
  const AccountItem = ({ account }: { account: Account }) => {
    const isSavings = account.AccountType?.toLowerCase() === 'savings';
    const displayNumber = formatAccountNumber(account.AccountID);

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{account.AccountType || 'Account'}</h3>
            <p className="text-sm text-gray-500">{displayNumber}</p>
          </div>
          {isSavings ? <Wallet className="w-6 h-6 text-blue-600" /> : <Landmark className="w-6 h-6 text-blue-600" />}
        </div>
        <div className="mt-2">
          <p className="text-xl font-semibold text-green-600">
            ${(account.Balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {account.Status === 'Active' ? "Available Balance" : "Balance"}
          </p>
        </div>
        <div className="mt-4">
          <Link href={`/accounts/${account.AccountID}`} className="text-sm text-blue-600 font-medium">
            View Details
          </Link>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center h-screen">
            <p className="text-gray-600">Loading your financial data...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => router.push('/auth/login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Go to Login
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <Header setIsMenuOpen={setIsMenuOpen} />

        {/* Dashboard content */}
        <div className="p-4 md:p-6">
          {/* Welcome message */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName}!</h1>
            <p className="text-gray-600">
              Here&apos;s your financial overview for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Account summary cards */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Your Accounts</h2>
            <Link href="/accounts" className="text-sm text-blue-600 font-medium hover:underline">
              View All
            </Link>
          </div>

          {accounts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {accounts.map(account => (
                <AccountItem key={account.AccountID} account={account} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <p className="text-gray-600">No accounts found. Please contact support if you believe this is an error.</p>
            </div>
          )}

          {/* Quick Actions */}
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="w-full bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center shadow-sm hover:shadow transition-shadow">
              <Link href="/transfers" className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Transfer</span>
              </Link>
            </button>

            <button className="w-full bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center shadow-sm hover:shadow transition-shadow">
              <Link href="/payments" className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Pay Bills</span>
              </Link>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              <Link href="/history" className="text-sm text-blue-600 font-medium">
                View All
              </Link>
            </div>

            {transactions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-600">No recent transactions found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}