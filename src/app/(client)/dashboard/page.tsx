"use client";

import { useState } from 'react';
import { CreditCard, Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';

// Types
interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface Account {
  id: number;
  name: string;
  number: string;
  balance: number;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample data
  const transactions: Transaction[] = [
    { id: 1, name: "Coffee Shop", category: "Food & Drink", amount: -4.50, date: "Today" },
    { id: 2, name: "Salary Deposit", category: "Income", amount: 2750.00, date: "Yesterday" },
    { id: 3, name: "Grocery Store", category: "Shopping", amount: -65.25, date: "Yesterday" },
    { id: 4, name: "Netflix Subscription", category: "Entertainment", amount: -14.99, date: "Apr 18" },
    { id: 5, name: "Transfer to Savings", category: "Transfer", amount: -500.00, date: "Apr 17" },
  ];

  const accounts: Account[] = [
    { id: 1, name: "Checking Account", number: "****5678", balance: 4256.78 },
    { id: 2, name: "Savings Account", number: "****9012", balance: 12785.45 },
  ];

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
    const isCreditCard = account.id === 1;
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{account.name}</h3>
            <p className="text-sm text-gray-500">{account.number}</p>
          </div>
          {isCreditCard ? <CreditCard className="w-6 h-6 text-blue-600" /> : <Wallet className="w-6 h-6 text-blue-600" />}
        </div>
        <div className="mt-2">
          <p className={`text-xl font-semibold ${isCreditCard ? "text-red-600" : "text-green-600"}`}>
            ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isCreditCard ? "Current Balance Due" : "Available Balance"}
          </p>
        </div>
        <div className="mt-4">
          <a href="#" className="text-sm text-blue-600 font-medium">View Details</a>
        </div>
      </div>
    );
  };

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
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Sarah!</h1>
            <p className="text-gray-600">Here&apos;s your financial overview for April 22, 2025</p>
          </div>

          {/* Account summary cards */}
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {accounts.map(account => (
              <AccountItem key={account.id} account={account} />
            ))}
          </div>

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
            <div className="divide-y divide-gray-200">
              {transactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
