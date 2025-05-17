"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, Download, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';

interface Account {
  AccountID: string;
  AccountType: string;
  Balance: number;
  Status: string;
}

interface Transfer {
  TransferID: string;
  FromAccountID: string;
  ToAccountID: string;
  Amount: number;
  Description?: string;
  CreatedAt: string;
  Status?: string;
}

interface Payment {
  PaymentID: string;
  AccountID: string;
  Amount: number;
  Description?: string;
  Timestamp: string;
  UtilityID?: string;
  utility?: {
    AccountName: string;
  };
}

interface Income {
  IncomeID: string;
  AccountID: string;
  Amount: number;
  Description?: string;
  Timestamp: string;
}

interface CombinedTransaction {
  id: string;
  date: string;
  timestamp: Date;
  description: string;
  category?: string;
  amount: number;
  type: 'transfer' | 'payment' | 'income';
  accountId: string;
  status: string;
  utilityId?: string;
  raw: any;
}

export default function History() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [transactionType, setTransactionType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // State variables for API data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<{
    transfers: Transfer[];
    payments: Payment[];
    incomes: Income[];
  }>({ transfers: [], payments: [], incomes: [] });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch account data
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/accounts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // Include cookies for authentication
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
      } catch (error: any) {
        console.error('Failed to fetch accounts:', error);
        setError(error.message || 'An error occurred while fetching your accounts');
      }
    };

    // Fetch transaction data
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/customer-transaction', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // Include cookies for authentication
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching transactions:', errorData);

          if (response.status === 401 || response.status === 403) {
            router.push('/auth/login');
            return;
          }

          throw new Error(errorData.message || 'Failed to fetch transactions');
        }

        const data = await response.json();
        console.log('Fetched Transactions:', data);
        setTransactions(data);
      } catch (error: any) {
        console.error('Failed to fetch transactions:', error);
        setError(error.message || 'An error occurred while fetching your transactions');
      } finally {
        setIsLoading(false); // Set loading to false after API calls complete
      }
    };

    // Execute both API calls
    const fetchData = async () => {
      await fetchAccounts();
      await fetchTransactions();
    };

    fetchData();
  }, [router]);

  // Combine transfers, payments, and incomes into a single array for display
  // Fix in the combineTransactions function to properly handle transfer amounts

const combineTransactions = () => {
  const combined: CombinedTransaction[] = [];

  // Process transfers
  if (transactions.transfers && transactions.transfers.length > 0) {
    transactions.transfers.forEach(transfer => {
      // Determine if this transfer is outgoing based on the FromAccountID
      const isOutgoing = accounts.some(acc => acc.AccountID === transfer.FromAccountID);
      
      // Always use the raw Amount value directly from the transfer object
      // This ensures we preserve the correct sign as stored in the database
      let transferAmount = Number(transfer.Amount || 0);
      
      combined.push({
        id: `transfer-${transfer.TransferID}`,
        date: new Date(transfer.CreatedAt || Date.now()).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        timestamp: new Date(transfer.CreatedAt || Date.now()),
        description: transfer.Description || 'Transfer',
        // Use the transfer amount directly, don't manipulate the sign based on direction
        amount: transferAmount,
        type: 'transfer',
        accountId: isOutgoing ? transfer.FromAccountID : transfer.ToAccountID,
        status: transfer.Status || 'Completed',
        raw: transfer // Keep the raw data for reference
      });
    });
  }

  // Process payments
  if (transactions.payments && transactions.payments.length > 0) {
    transactions.payments.forEach(payment => {
      combined.push({
        id: `payment-${payment.PaymentID}`,
        date: new Date(payment.Timestamp || Date.now()).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        timestamp: new Date(payment.Timestamp || Date.now()),
        description: payment.Description || (payment.utility ? payment.utility.AccountName : 'Utility Payment'),
        category: payment.utility ? payment.utility.AccountName : 'Payment',
        // Payments should use the amount directly from the database, which is already negative
        amount: Number(payment.Amount || 0),
        type: 'payment',
        accountId: payment.AccountID,
        status: 'Completed',
        utilityId: payment.UtilityID,
        raw: payment // Keep the raw data for reference
      });
    });
  }

  // Process incomes
  if (transactions.incomes && transactions.incomes.length > 0) {
    transactions.incomes.forEach(income => {
      combined.push({
        id: `income-${income.IncomeID}`,
        date: new Date(income.Timestamp || Date.now()).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        timestamp: new Date(income.Timestamp || Date.now()),
        description: income.Description || 'Income',
        category: 'Income',
        // Income amounts are already positive in the database
        amount: Number(income.Amount || 0),
        type: 'income',
        accountId: income.AccountID,
        status: 'Completed',
        raw: income // Keep the raw data for reference
      });
    });
  }

  // Sort by date (newest first)
  return combined.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

  const allTransactions = combineTransactions();

  // Filter transactions based on user filters
  const filterTransactions = () => {
    return allTransactions.filter(transaction => {
      // Filter by account
      if (selectedAccount !== 'all' && transaction.accountId !== selectedAccount) {
        return false;
      }

      // Filter by transaction type
      if (transactionType !== 'all') {
        // Handle the different transaction types
        if (transactionType === 'payment' && transaction.type !== 'payment') {
          return false;
        }
        if (transactionType === 'transfer' && transaction.type !== 'transfer') {
          return false;
        }
        if (transactionType === 'income' && transaction.type !== 'income') {
          return false;
        }
      }

      // Filter by search query
      if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Filter by date range
      if (dateRange !== 'all') {
        const today = new Date();
        const daysAgo = parseInt(dateRange);
        const startDate = new Date();
        startDate.setDate(today.getDate() - daysAgo);

        if (transaction.timestamp < startDate) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredTransactions = filterTransactions();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedAccount('all');
    setDateRange('30');
    setTransactionType('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Helper function to get account information
  const getAccountName = (accountId: string) => {
    const account = accounts.find((acc) => acc.AccountID === accountId);
    return account ? `${account.AccountType} (${account.AccountID})` : 'Unknown Account';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64 w-full">
          <Header title="History" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your transaction history...</p>
            </div>
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
        <main className="flex-1 md:ml-64 w-full">
          <Header title="History" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6">
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-2">Error</h2>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Try Again
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
      <main className="flex-1 md:ml-64 w-full">
        {/* Header */}
        <Header title="History" setIsMenuOpen={setIsMenuOpen} />

        {/* History content */}
        <div className="p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
            <p className="text-gray-600">View and manage your past transactions</p>
          </div>

          {/* Filters and search */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
              <div className="w-full sm:w-auto relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions"
                  className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-gray-300 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap w-full sm:w-auto gap-2 items-center justify-center sm:justify-end">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium"
                >
                  <Filter className="w-4 h-4 mr-2 text-gray-600" />
                  Filter
                </button>
                <div className="flex items-center">
                  <button className="hidden md:flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Last {dateRange} Days</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded filters */}
            {filterOpen && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                    <select
                      className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg"
                      value={selectedAccount}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                    >
                      <option value="all">All Accounts</option>
                      {accounts.map(account => (
                        <option key={account.AccountID} value={account.AccountID}>
                          {account.AccountType || 'Account'} ({account.AccountID.slice(-4).padStart(4, '*')})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select
                      className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                    >
                      <option value="7">Last 7 Days</option>
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last 90 Days</option>
                      <option value="all">All Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                    <select
                      className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg"
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="payment">Bill Payments</option>
                      <option value="transfer">Transfers</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-gray-700 mr-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Transaction list */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Transactions header - desktop only */}
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
              <div className="col-span-1">Date</div>
              <div className="col-span-2">Description</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Account</div>
              <div className="col-span-1 text-right">Amount</div>
            </div>

            {/* Transactions list */}
            <div className="divide-y divide-gray-200">
              {currentTransactions.length > 0 ? (
                currentTransactions.map(transaction => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50">
                    {/* Mobile View */}
                    <div className="md:hidden">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                        <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </div>
                      </div>
                      <div className="font-medium mb-1">{transaction.description}</div>
                      <div className="text-sm text-gray-500 mb-2">
                        {getAccountName(transaction.accountId)}
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`px-2 py-1 ${transaction.status === 'Completed' ? 'bg-green-50 text-green-700' :
                          transaction.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-gray-50 text-gray-700'
                          } text-xs rounded-full`}>
                          {transaction.status}
                        </span>
                        {transaction.category && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {transaction.category}
                          </span>
                        )}
                      </div>
                      <div className="border-t border-gray-100 pt-2 flex justify-between">
                        <button className="text-blue-600 text-sm font-medium">View Details</button>
                        {transaction.type === 'payment' && (
                          <button className="text-blue-600 text-sm font-medium">Pay Again</button>
                        )}
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:grid md:grid-cols-6 md:gap-4">
                      <div className="col-span-1 text-sm text-gray-600">
                        {transaction.date}
                      </div>
                      <div className="col-span-2 font-medium">
                        <span>{transaction.description}</span>
                        {transaction.category && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {transaction.category}
                          </span>
                        )}
                      </div>
                      <div className="col-span-1">
                        <span className={`px-2 py-1 ${transaction.status === 'Completed' || 'Approved' ? 'bg-green-50 text-green-700' :
                          transaction.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-gray-50 text-gray-700'
                          } text-xs rounded-full`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="col-span-1 text-sm text-gray-600">
                        {getAccountName(transaction.accountId).split(' ')[0]}
                      </div>
                      <div className={`col-span-1 font-medium text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="text-gray-500 mb-2">No transactions found.</div>
                  <div className="text-sm text-gray-400">Try changing your filters or search query.</div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
              <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0 text-center sm:text-left">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredTransactions.length)} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${currentPage === 1 ? 'text-gray-300 border-gray-200' : 'text-gray-600 border-gray-300'}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Simplified pagination for desktop */}
                  <div className="hidden sm:flex items-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show current page, first, last, and adjacent pages
                        return page === 1 || page === totalPages ||
                          Math.abs(page - currentPage) <= 1;
                      })
                      .map((page, i, arr) => {
                        // Add ellipsis
                        const showEllipsisBefore = i > 0 && arr[i - 1] !== page - 1;
                        const showEllipsisAfter = i < arr.length - 1 && arr[i + 1] !== page + 1;

                        return (
                          <div key={page} className="flex items-center">
                            {showEllipsisBefore && (
                              <span className="px-2 text-gray-400">...</span>
                            )}

                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`w-8 h-8 flex items-center justify-center rounded-lg ${currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                              {page}
                            </button>

                            {showEllipsisAfter && (
                              <span className="px-2 text-gray-400">...</span>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  {/* Mobile pagination indicator */}
                  <div className="sm:hidden text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${currentPage === totalPages ? 'text-gray-300 border-gray-200' : 'text-gray-600 border-gray-300'}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}