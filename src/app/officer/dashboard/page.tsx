"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, ArrowLeft, XCircle } from 'lucide-react';
import Header from '@/components/officer-header';
import Sidebar from '@/components/officer-sidebar';

// Type definitions based on your Prisma schema
type Customer = {
  CustomerID: string;
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
  CustomerID: string | null;
  Status: string | null;
  Balance: number | null;
  AccountType: string | null;
  MonthlyFee: number | null;
  DailyATMLimit: number | null;
  DailyPurchaseLimit: number | null;
  OverdraftProtection: boolean | null;
  customer: Customer | null;
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
  createdAt: Date;
  description?: string;
  customer: {
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
  };
  toAccount?: {
    id: string;
    number: string;
  };
};

export default function OfficerDashboard() {
  const [activeTab, setActiveTab] = useState<'pending' | 'recent'>('pending');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        const transformedTransactions = data.map((transfer: Transfer) => {
          const customer = transfer.fromAccount?.customer || transfer.toAccount?.customer;
          
          return {
            id: transfer.TransferID,
            type: 'transfer',
            status: transfer.Status?.toLowerCase() || 'pending',
            amount: transfer.Amount || 0,
            createdAt: transfer.CreatedAt || new Date(),
            description: transfer.Description,
            customer: {
              id: customer?.CustomerID || '',
              name: `${customer?.FirstName || ''} ${customer?.LastName || ''}`.trim(),
              email: customer?.Email || '',
              phone: customer?.ContactNumber || undefined,
              address: [
                customer?.AddressLine1,
                customer?.AddressLine2,
                customer?.City,
                customer?.State,
                customer?.ZipCode
              ].filter(Boolean).join(', '),
              accountOpenDate: customer?.AccountOpenDate || undefined,
              accounts: [
                {
                  id: transfer.fromAccount?.AccountID || '',
                  number: transfer.fromAccount?.AccountID || '',
                  type: transfer.fromAccount?.AccountType || '',
                  balance: transfer.fromAccount?.Balance || 0
                },
                ...(transfer.toAccount ? [{
                  id: transfer.toAccount.AccountID,
                  number: transfer.toAccount.AccountID,
                  type: transfer.toAccount.AccountType || '',
                  balance: transfer.toAccount.Balance || 0
                }] : [])
              ]
            },
            fromAccount: transfer.fromAccount ? {
              id: transfer.fromAccount.AccountID,
              number: transfer.fromAccount.AccountID
            } : undefined,
            toAccount: transfer.toAccount ? {
              id: transfer.toAccount.AccountID,
              number: transfer.toAccount.AccountID
            } : undefined
          };
        });

        setTransactions(transformedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

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
        const updatedTransaction = await response.json();
        setTransactions(transactions.map(t =>
          t.id === updatedTransaction.TransferID ? {
            ...t,
            status: 'approved',
            toAccount: updatedTransaction.toAccount ? {
              id: updatedTransaction.toAccount.AccountID,
              number: updatedTransaction.toAccount.AccountID
            } : undefined,
            fromAccount: updatedTransaction.fromAccount ? {
              id: updatedTransaction.fromAccount.AccountID,
              number: updatedTransaction.fromAccount.AccountID
            } : undefined
          } : t
        ));
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
        const updatedTransaction = await response.json();
        setTransactions(transactions.map(t =>
          t.id === updatedTransaction.TransferID ? {
            ...t,
            status: 'rejected',
            toAccount: updatedTransaction.toAccount ? {
              id: updatedTransaction.toAccount.AccountID,
              number: updatedTransaction.toAccount.AccountID
            } : undefined,
            fromAccount: updatedTransaction.fromAccount ? {
              id: updatedTransaction.fromAccount.AccountID,
              number: updatedTransaction.fromAccount.AccountID
            } : undefined
          } : t
        ));
        setSelectedTransaction(null);
      } else {
        throw new Error('Failed to reject transaction');
      }
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      alert('Failed to reject transaction');
    }
  };

  const handleViewCustomer = (customerId: string) => {
    setShowCustomerDetails(true);
  };

  const filteredTransactions = (activeTab === 'pending' ? pendingTransactions : recentTransactions)
    .filter(transaction => {
      const searchMatch = (
        transaction.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const statusMatch = filterStatus === 'all' || transaction.status === filterStatus;

      return searchMatch && statusMatch;
    });

    const formatDate = (dateString: string | Date | undefined | null) => {
      if (!dateString) return 'N/A';
    
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      if (isNaN(date.getTime())) return 'Invalid date';
    
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
    
      return date.toLocaleDateString('en-US', options);
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
        <Header title="Transaction Queue" setIsMenuOpen={setIsMenuOpen} />

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

        <div className="flex-1 overflow-auto p-4">
          {!selectedTransaction && !showCustomerDetails ? (
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
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
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
                              {transaction.customer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-900">{transaction.customer.name}</div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(transaction.createdAt)}</td>
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
          ) : selectedTransaction ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedTransaction(null)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Transactions
                </button>
                <div className="flex space-x-3">
                  {selectedTransaction.status === 'pending' && (
                    <>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleReject(selectedTransaction.id)}
                      >
                        Reject
                      </button>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        onClick={() => handleApprove(selectedTransaction.id)}
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Transaction Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p className="font-medium">{selectedTransaction.id}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Transaction Type</p>
                      <p className="font-medium capitalize">{selectedTransaction.type}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-lg">${selectedTransaction.amount.toLocaleString()}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(selectedTransaction.createdAt)}</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedTransaction.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}`}>
                        {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                      </span>
                    </div>

                    {selectedTransaction.toAccount && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Destination Account</p>
                        <p className="font-medium">
                          {selectedTransaction.toAccount.number.substring(selectedTransaction.toAccount.number.length - 4).padStart(selectedTransaction.toAccount.number.length, '*')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{selectedTransaction.customer.name}</p>
                      <p className="text-sm text-gray-500">ID: {selectedTransaction.customer.id}</p>
                      <p className="text-sm text-gray-500">
                        Account: {selectedTransaction.fromAccount?.number.substring(
                          selectedTransaction.fromAccount.number.length - 4
                        ).padStart(selectedTransaction.fromAccount.number.length, '*')}
                      </p>
                    </div>
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleViewCustomer(selectedTransaction.customer.id)}
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : showCustomerDetails && selectedTransaction && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setShowCustomerDetails(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Transaction
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Profile: {selectedTransaction.customer.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Customer ID</p>
                        <p className="font-medium">{selectedTransaction.customer.id}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedTransaction.customer.email}</p>
                      </div>
                      {selectedTransaction.customer.phone && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{selectedTransaction.customer.phone}</p>
                        </div>
                      )}
                      {selectedTransaction.customer.address && (
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{selectedTransaction.customer.address}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Risk & Compliance</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedTransaction.customer.accountOpenDate && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-500">Account Open Date</p>
                          <p className="font-medium">{formatDate(selectedTransaction.customer.accountOpenDate)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Account Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTransaction.customer.accounts.map((account, index) => (
                        <div key={index} className="border border-gray-200 rounded p-3">
                          <p className="font-medium capitalize">{account.type}</p>
                          <p className="text-sm text-gray-500">
                            {account.number.substring(account.number.length - 4).padStart(account.number.length, '*')}
                          </p>
                          <p className="font-medium text-lg mt-2">${account.balance.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}