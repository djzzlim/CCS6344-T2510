"use client";

import { useState } from 'react';
import { Bell, Menu, Search, User, CreditCard, Wallet, ArrowDownRight, ArrowUpRight, PieChart, Clock, DollarSign } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const transactions = [
    { id: 1, name: "Coffee Shop", category: "Food & Drink", amount: -4.50, date: "Today" },
    { id: 2, name: "Salary Deposit", category: "Income", amount: 2750.00, date: "Yesterday" },
    { id: 3, name: "Grocery Store", category: "Shopping", amount: -65.25, date: "Yesterday" },
    { id: 4, name: "Netflix Subscription", category: "Entertainment", amount: -14.99, date: "Apr 18" },
    { id: 5, name: "Transfer to Savings", category: "Transfer", amount: -500.00, date: "Apr 17" },
  ];

  const accounts = [
    { id: 1, name: "Checking Account", number: "****5678", balance: 4256.78 },
    { id: 2, name: "Savings Account", number: "****9012", balance: 12785.45 },
    { id: 3, name: "Credit Card", number: "****3456", balance: -1243.56 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                <PieChart className="w-5 h-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <CreditCard className="w-5 h-5 mr-3" />
                <span>Accounts</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <ArrowUpRight className="w-5 h-5 mr-3" />
                <span>Transfers</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <ArrowDownRight className="w-5 h-5 mr-3" />
                <span>Payments</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Clock className="w-5 h-5 mr-3" />
                <span>History</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-gray-500">sarah.j@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                  <PieChart className="w-5 h-5 mr-3" />
                  <span className="font-medium">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <CreditCard className="w-5 h-5 mr-3" />
                  <span>Accounts</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <ArrowUpRight className="w-5 h-5 mr-3" />
                  <span>Transfers</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <ArrowDownRight className="w-5 h-5 mr-3" />
                  <span>Payments</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>History</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden mr-4 text-gray-500"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold md:hidden">BankApp</h1>
              <h2 className="text-xl font-semibold hidden md:block">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-500 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 md:hidden">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

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
              <div key={account.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.number}</p>
                  </div>
                  {account.id === 3 ? <CreditCard className="w-6 h-6 text-blue-600" /> : <Wallet className="w-6 h-6 text-blue-600" />}
                </div>
                <div className="mt-2">
                  <p className={`text-xl font-semibold ${account.id === 3 ? "text-red-600" : "text-green-600"}`}>
                    ${Math.abs(account.balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {account.id === 3 ? "Current Balance Due" : "Available Balance"}
                  </p>
                </div>
                <div className="mt-4">
                  <a href="#" className="text-sm text-blue-600 font-medium">View Details</a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Transfer</span>
            </button>
            <button className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Pay Bills</span>
            </button>
            <button className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Card Settings</span>
            </button>
            <button className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Investment</span>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              <a href="#" className="text-sm text-blue-600 font-medium">View All</a>
            </div>
            <div className="divide-y divide-gray-200">
              {transactions.map(transaction => (
                <div key={transaction.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.amount > 0 ? 
                        <ArrowDownRight className="w-5 h-5" /> : 
                        <ArrowUpRight className="w-5 h-5" />
                      }
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                Load More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}