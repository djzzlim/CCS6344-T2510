"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import Header from '@/components/officer-header';
import Sidebar from '@/components/officer-sidebar';
import CustomerDetails from '@/components/customer-details';
import TransactionDetails from '@/components/transaction-details'; // Import the new component

// Type definitions based on your Prisma schema
type user = {
  userID: string;
  FirstName: string | null;
  LastName: string | null;
  Email: string;
  ContactNumber: string | null;
  DateOfBirth: Date | null;
  AddressLine1: string | null;
  AddressLine2: string | null;
  City: string | null;
  State: string | null;
  ZipCode: string | null;
  AccountOpenDate: Date | null;
};

type Account = {
  AccountID: string;
  userID: string | null;
  Status: string | null;
  Balance: number | null;
  AccountType: string | null;
  user: user | null;
};

type Transfer = {
  TransferID: string;
  ToAccountID: string | null;
  FromAccountID: string | null;
  Amount: number | null;
  Description: string | null;
  CreatedAt: Date | null;
  UpdatedAt: Date | null;
  Status: string | null;
  TransferType: string | null;
  fromAccount: Account | null;
  toAccount: Account | null;
};

type Transaction = {
  id: string;
  type: 'transfer' | 'payment';
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  updatedAt: Date;
  createdAt: Date;
  description?: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    accountOpenDate?: Date;
    accounts: {
      id: string;
      number: string;
      type: string;
      balance: number;
    }[];
  };
  fromAccount?: {
    id: string;
    number: string;
    balance?: number;
  };
  toAccount?: {
    id: string;
    number: string;
  };
};

// Define the customer type based on the CustomerDetails props
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  accountOpenDate: string;
  accountManager?: string;
  lastContact?: string;
  accounts?: {
    accountId: string;
    number: string;
    type: string;
    status: string;
    balance: number;
    openDate: string;
  }[];
  transactionHistory?: {
    id: string;
    date: string;
    amount: number;
    type: string;
    status: string;
  }[];
};

export default function OfficerDashboard() {
  const [activeTab, setActiveTab] = useState<'pending' | 'recent'>('pending');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerError, setCustomerError] = useState<string | null>(null);

  // Moved fetchTransactions outside useEffect to make it accessible to handlers
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/transactions');

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API data:", data);

      // Transform the data to match the Transaction type
      // Fixed transformation function with correct property access
      const transformedTransactions = data.map((transfer: Transfer) => {
        const user = transfer.fromAccount?.user || transfer.toAccount?.user;

        // Fix: Properly access and convert Balance to number
        const fromAccountBalance = transfer.fromAccount?.Balance ?
          Number(transfer.fromAccount.Balance) : 0;

        const toAccountBalance = transfer.toAccount?.Balance ?
          Number(transfer.toAccount.Balance) : 0;

        return {
          id: transfer.TransferID,
          type: 'transfer',
          status: transfer.Status?.toLowerCase() || 'pending',
          amount: transfer.Amount ? Number(transfer.Amount) : 0,
          createdAt: transfer.CreatedAt || new Date(),
          updatedAt: transfer.UpdatedAt || '',
          description: transfer.Description,
          user: {
            id: user?.userID || '',
            name: `${user?.FirstName || ''} ${user?.LastName || ''}`.trim(),
            email: user?.Email || '',
            phone: user?.ContactNumber || undefined,
            address: [
              user?.AddressLine1,
              user?.AddressLine2,
              user?.City,
              user?.State,
              user?.ZipCode
            ].filter(Boolean).join(', '),
            accountOpenDate: user?.AccountOpenDate || undefined,
            accounts: [
              {
                id: transfer.fromAccount?.AccountID || '',
                number: transfer.fromAccount?.AccountID || '',
                type: transfer.fromAccount?.AccountType || '',
                // Fix: Properly set the balance using the converted value
                balance: fromAccountBalance
              },
              ...(transfer.toAccount ? [{
                id: transfer.toAccount.AccountID || '',
                number: transfer.toAccount.AccountID || '',
                type: transfer.toAccount.AccountType || '',
                // Fix: Properly set the balance using the converted value
                balance: toAccountBalance
              }] : [])
            ].filter(account => account.id !== '') // Filter out empty accounts
          },
          fromAccount: transfer.fromAccount ? {
            id: transfer.fromAccount.userID || '',
            number: transfer.fromAccount.AccountID || '',
            balance: fromAccountBalance
          } : undefined,
          toAccount: transfer.toAccount ? {
            id: transfer.toAccount.userID || '',
            number: transfer.toAccount.AccountID || '',
            balance: toAccountBalance
          } : undefined
        };
      });

      console.log("Transformed transactions:", transformedTransactions);
      setTransactions(transformedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const pendingTransactions = transactions
    .filter(transaction => transaction.status === 'pending');

  const recentTransactions = transactions
    .filter(transaction => transaction.status !== 'pending');

  const handleApprove = async (transactionId: string) => {
    try {
      const response = await fetch(`/api/transactions/${transactionId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Simply fetch all transactions again to refresh the data
        await fetchTransactions();
        // Clear the selected transaction
        setSelectedTransaction(null);
      } else {
        throw new Error('Failed to approve transaction');
      }
    } catch (error) {
      console.error('Error approving transaction:', error);
      alert('Failed to approve transaction');
    }
  };

  const handleReject = async (transactionId: string) => {
    try {
      const response = await fetch(`/api/transactions/${transactionId}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Simply fetch all transactions again to refresh the data
        await fetchTransactions();
        // Clear the selected transaction
        setSelectedTransaction(null);
      } else {
        throw new Error('Failed to reject transaction');
      }
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      alert('Failed to reject transaction');
    }
  };

  const handleViewCustomer = () => {
    // Set loading state while fetching customer details
    setCustomerLoading(true);
    setCustomerError(null);
    
    // If we already have the transaction data, convert it to the Customer format
    if (selectedTransaction) {
      const transaction = selectedTransaction;
      const customer: Customer = {
        id: transaction.user.id,
        name: transaction.user.name,
        email: transaction.user.email,
        phone: transaction.user.phone || 'N/A',
        address: transaction.user.address || 'N/A',
        accountOpenDate: transaction.user.accountOpenDate ? 
          formatDate(transaction.user.accountOpenDate, true) : 'N/A',
        accounts: transaction.user.accounts.map(account => ({
          accountId: account.id,
          number: account.number,
          type: account.type,
          status: 'Active', // Assuming active status for accounts
          balance: account.balance,
          openDate: formatDate(transaction.user.accountOpenDate, true)
        })),
        // Adding a sample transaction history based on current transaction
        transactionHistory: [
          {
            id: transaction.id,
            date: formatDate(transaction.createdAt),
            amount: transaction.amount,
            type: transaction.type,
            status: transaction.status
          }
        ]
      };
      
      setSelectedCustomer(customer);
      setShowCustomerDetails(true);
      setCustomerLoading(false);
    } else {
      // If we don't have all the data, we would normally fetch it from the API
      // For now, just set an error since we don't have an actual API endpoint to call
      setCustomerError("Could not load complete customer details");
      setCustomerLoading(false);
    }
  };

  const filteredTransactions = (activeTab === 'pending' ? pendingTransactions : recentTransactions)
    .filter(transaction => {
      const searchMatch = (
        transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const statusMatch = filterStatus === 'all' || transaction.status === filterStatus;

      return searchMatch && statusMatch;
    });

  const formatDate = (dateString: string | Date | undefined | null, longFormat: boolean = false) => {
    if (!dateString) return 'N/A';

    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return 'Invalid date';

    if (longFormat) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return date.toLocaleDateString('en-US', options);
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return date.toLocaleDateString('en-US', options);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
          <Header title="Transaction Queue" setIsMenuOpen={setIsMenuOpen} />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <Header title={showCustomerDetails ? "Customer Profile" : "Transaction Queue"} setIsMenuOpen={setIsMenuOpen} />

        {!showCustomerDetails && (
          <div className="bg-white shadow-sm">
            <div className="px-4 flex">
              <button
                className={`px-4 py-2 font-medium text-sm border-b-2 ${activeTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Approval
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm border-b-2 ${activeTab === 'recent' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
                onClick={() => setActiveTab('recent')}
              >
                Recent Activity
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4">
          {showCustomerDetails && selectedCustomer ? (
            <CustomerDetails 
              title='Transaction Queue'
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={() => {
                setShowCustomerDetails(false);
                setSelectedCustomer(null);
              }}
              isLoading={customerLoading}
              error={customerError}
            />
          ) : !selectedTransaction ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                      className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <select
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">user</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-semibold">
                              {transaction.user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-900">{transaction.user.name}</div>
                              <div className="text-sm text-gray-500">
                                {transaction.fromAccount?.number.substring(transaction.fromAccount.number.length - 4).padStart(transaction.fromAccount.number.length, '*')}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{transaction.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(transaction.updatedAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              transaction.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'}`}>
                            {transaction.status === 'pending' ?
                              <Clock className="w-3 h-3 mr-1 mt-0.5" /> :
                              transaction.status === 'approved' ?
                                <CheckCircle className="w-3 h-3 mr-1 mt-0.5" /> :
                                <XCircle className="w-3 h-3 mr-1 mt-0.5" />
                            }
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : selectedTransaction && (
            <TransactionDetails
              transaction={selectedTransaction}
              onBack={() => setSelectedTransaction(null)}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewCustomer={handleViewCustomer}
            />
          )}
        </div>
      </div>
    </div>
  );
}