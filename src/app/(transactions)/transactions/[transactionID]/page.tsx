"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import Sidebar from '@/components/officer-sidebar';
import Header from '@/components/officer-header';

// Type definitions
type Account = {
  id: string;
  number: string;
  balance?: number;
};

type User = {
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

type Transaction = {
  id: string;
  type: 'transfer' | 'payment';
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  updatedAt: Date | string;
  createdAt: Date | string;
  description?: string;
  user: User;
  fromAccount?: Account;
  toAccount?: Account;
};

export default function TransactionPage({ params }: { params: Promise<{ transactionID: string }> }) {
  const { transactionID } = use(params);

  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/transactions/${transactionID}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaction details');
        }
        const data = await response.json();
        setTransaction(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching transaction details:', err);
        setError('Failed to load transaction details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (transactionID) {
      fetchTransaction();
    }
  }, [transactionID]);

  const handleBack = () => {
    router.push('/officer/customers');
  };

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

  const renderTransactionContent = () => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">Loading transaction details...</p>
        </div>
      );
    }

    if (error || !transaction) {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-red-500">{error || 'Transaction not found'}</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center text-blue-600 hover:text-blue-800"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Customer List
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Transaction Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-medium">{transaction.id}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Transaction Type</p>
                <p className="font-medium capitalize">{transaction.type}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium text-lg">${transaction.amount.toLocaleString()}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Created On</p>
                <p className="font-medium">{formatDate(transaction.createdAt)}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{formatDate(transaction.updatedAt)}</p>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    transaction.status === 'approved' || 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>
                  {transaction.status === 'pending' ?
                    <Clock className="w-3 h-3 mr-1 mt-0.5" /> :
                    transaction.status === 'approved' || 'completed' ?
                      <CheckCircle className="w-3 h-3 mr-1 mt-0.5" /> :
                      <XCircle className="w-3 h-3 mr-1 mt-0.5" />
                  }
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>

              {transaction.toAccount && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Destination Account</p>
                  <p className="font-medium">
                    {transaction.toAccount.number.substring(transaction.toAccount.number.length - 4)
                      .padStart(transaction.toAccount.number.length, '*')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <Header
          title="Transaction Details"
          setIsMenuOpen={setIsMenuOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4">
          {renderTransactionContent()}
        </div>
      </div>
    </div>
  );
}