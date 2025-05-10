"use client";

import { ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';

// Type definitions for the component props
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

type TransactionDetailsProps = {
  transaction: Transaction;
  onBack: () => void;
  onApprove: (transactionId: string) => void;
  onReject: (transactionId: string) => void;
  onViewCustomer: () => void;
};

export default function TransactionDetails({
  transaction,
  onBack,
  onApprove,
  onReject,
  onViewCustomer
}: TransactionDetailsProps) {
  
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Transactions
        </button>
        <div className="flex space-x-3">
          {transaction.status === 'pending' && (
            <>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => onReject(transaction.id)}
              >
                Reject
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => onApprove(transaction.id)}
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

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{transaction.user.name}</p>
              <p className="text-sm text-gray-500">
                Account Balance: ${transaction.fromAccount?.balance?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500">
                Account: {transaction.fromAccount?.number.substring(
                  transaction.fromAccount.number.length - 4
                ).padStart(transaction.fromAccount.number.length, '*')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}