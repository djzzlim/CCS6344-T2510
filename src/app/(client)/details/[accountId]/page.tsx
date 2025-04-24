"use client";

import { useState, useEffect } from 'react';
import { CreditCard, Wallet, ArrowLeft, Download, Filter, Search, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AccountDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountId = parseInt(searchParams.get('id') || '1');
  const initialView = searchParams.get('view') || 'details';
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState(initialView);
  const [dateRange, setDateRange] = useState('30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Update the URL when view changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('view', currentView);
    // router.push(`/accounts/detail?${params.toString()}`);
  }, [currentView, router, searchParams]);

  // Mock account data
  const accounts = [
    { id: 1, name: "Checking Account", number: "****5678", balance: 4256.78, type: "checking" },
    { id: 2, name: "Savings Account", number: "****9012", balance: 12785.45, type: "savings" },
    { id: 3, name: "Credit Card", number: "****3456", balance: -1243.56, type: "credit", 
      details: { limit: 5000, availableCredit: 3756.44, dueDate: "May 15, 2025", minPayment: 35 } },
    { id: 4, name: "High-Yield Savings", number: "****7890", balance: 8450.32, type: "savings", 
      details: { interestRate: "3.5% APY", lastInterestPaid: "Apr 01, 2025", nextInterestDate: "May 01, 2025" } }
  ];

  // Mock transaction data
  const transactions = [
    { id: 1, date: "Apr 22, 2025", description: "Amazon", amount: -56.78, category: "Shopping", pending: false },
    { id: 2, date: "Apr 21, 2025", description: "Payroll Deposit", amount: 1500.00, category: "Income", pending: false },
    { id: 3, date: "Apr 20, 2025", description: "Starbucks", amount: -5.67, category: "Food & Dining", pending: false },
    { id: 4, date: "Apr 20, 2025", description: "Gas Station", amount: -45.23, category: "Transportation", pending: false },
    { id: 5, date: "Apr 19, 2025", description: "Monthly Rent", amount: -1600.00, category: "Housing", pending: false },
    { id: 6, date: "Apr 18, 2025", description: "Whole Foods", amount: -89.45, category: "Groceries", pending: false },
    { id: 7, date: "Apr 17, 2025", description: "ATM Withdrawal", amount: -100.00, category: "Cash & ATM", pending: false },
    { id: 8, date: "Apr 16, 2025", description: "Netflix", amount: -15.99, category: "Entertainment", pending: false },
    { id: 9, date: "Apr 15, 2025", description: "Internet Bill", amount: -79.99, category: "Utilities", pending: false },
    { id: 10, date: "Apr 15, 2025", description: "Interest Payment", amount: 12.34, category: "Interest", pending: false },
  ];

  // Mock statements data
  const statements = [
    { id: 1, period: "Mar 01 - Mar 31, 2025", balance: 4359.87, availableOn: "Apr 01, 2025" },
    { id: 2, period: "Feb 01 - Feb 28, 2025", balance: 3982.45, availableOn: "Mar 01, 2025" },
    { id: 3, period: "Jan 01 - Jan 31, 2025", balance: 4128.91, availableOn: "Feb 01, 2025" },
    { id: 4, period: "Dec 01 - Dec 31, 2024", balance: 3876.32, availableOn: "Jan 01, 2025" },
    { id: 5, period: "Nov 01 - Nov 30, 2024", balance: 4023.18, availableOn: "Dec 01, 2024" },
    { id: 6, period: "Oct 01 - Oct 31, 2024", balance: 3951.76, availableOn: "Nov 01, 2024" },
  ];

  const account = accounts.find(acc => acc.id === accountId) || accounts[0];
  const filteredTransactions = transactions.filter(trans => 
    trans.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <Header title={account.name} setIsMenuOpen={setIsMenuOpen} />

        {/* Account content */}
        <div className="p-4 md:p-6">
          {/* Page header with back button */}
          <div className="flex items-center mb-6">
            <Link href="/accounts" className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back to Accounts</span>
            </Link>
          </div>

          {/* Account summary card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  account.type === 'credit' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {account.type === 'credit' ? 
                    <CreditCard className="w-6 h-6" /> : 
                    <Wallet className="w-6 h-6" />
                  }
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{account.name}</h2>
                  <p className="text-gray-500">{account.number}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${account.type === 'credit' ? "text-red-600" : "text-green-600"}`}>
                  ${Math.abs(account.balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </p>
                <p className="text-sm text-gray-500">
                  {account.type === 'credit' ? "Current Balance Due" : "Available Balance"}
                </p>
              </div>
            </div>
          </div>

          {/* View selector tabs */}
          <div className="mb-6">
            <div className="flex space-x-2 border-b border-gray-200">
              <button 
                onClick={() => setCurrentView('details')}
                className={`px-4 py-2 text-sm font-medium ${currentView === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Account Details
              </button>
              <button 
                onClick={() => setCurrentView('transactions')}
                className={`px-4 py-2 text-sm font-medium ${currentView === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Transactions
              </button>
              <button 
                onClick={() => setCurrentView('statements')}
                className={`px-4 py-2 text-sm font-medium ${currentView === 'statements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Statements
              </button>
            </div>
          </div>

          {/* Conditional content based on current view */}
          {currentView === 'details' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Account Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Number</p>
                    <p className="font-medium">{account.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Type</p>
                    <p className="font-medium capitalize">{account.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                    <p className={`font-medium ${account.type === 'credit' ? "text-red-600" : "text-green-600"}`}>
                      ${Math.abs(account.balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Routing Number</p>
                    <p className="font-medium">121000358</p>
                  </div>
                  
                  {account.type === 'credit' && account.details && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Credit Limit</p>
                        <p className="font-medium">${account.details?.limit?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Available Credit</p>
                        <p className="font-medium">${account.details?.availableCredit?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Payment Due Date</p>
                        <p className="font-medium">{account.details.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Minimum Payment</p>
                        <p className="font-medium">${account.details.minPayment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                        <p className="font-medium">18.99% APR</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Payment Address</p>
                        <p className="font-medium">PO Box 12345, Finance City, CA 94000</p>
                      </div>
                    </>
                  )}
                  
                  {account.type === 'savings' && account.details && account.details.interestRate && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                        <p className="font-medium">{account.details.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Last Interest Paid</p>
                        <p className="font-medium">{account.details.lastInterestPaid}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Next Interest Payment</p>
                        <p className="font-medium">{account.details.nextInterestDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Account Opened</p>
                        <p className="font-medium">January 15, 2024</p>
                      </div>
                    </>
                  )}
                  
                  {account.type === 'checking' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Monthly Fee</p>
                        <p className="font-medium">$0.00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Overdraft Protection</p>
                        <p className="font-medium">Enabled</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Daily ATM Limit</p>
                        <p className="font-medium">$500.00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Daily Purchase Limit</p>
                        <p className="font-medium">$2,500.00</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentView === 'transactions' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Transactions toolbar */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search transactions"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <select
                        className="bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-lg appearance-none"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                      >
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
                        <option value="custom">Custom range</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <button 
                      className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      <span>Filter</span>
                      {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>
                    <button className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg">
                      <Download className="h-4 w-4 mr-1" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
                
                {/* Filter panel */}
                {showFilters && (
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                      <select className="bg-white w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">All Types</option>
                        <option value="debit">Debits</option>
                        <option value="credit">Credits</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select className="bg-white w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">All Categories</option>
                        <option value="income">Income</option>
                        <option value="shopping">Shopping</option>
                        <option value="food">Food & Dining</option>
                        <option value="housing">Housing</option>
                        <option value="utilities">Utilities</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
                      <div className="flex space-x-2">
                        <input type="text" placeholder="Min" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        <input type="text" placeholder="Max" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Transactions list */}
              <div>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <div 
                      key={transaction.id} 
                      className={`p-4 flex justify-between items-center ${
                        index !== filteredTransactions.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <p className={`font-medium ${transaction.pending ? 'text-gray-400' : 'text-gray-800'}`}>
                          {transaction.description}
                          {transaction.pending && <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Pending</span>}
                        </p>
                        <div className="flex items-center">
                          <p className="text-sm text-gray-500 mr-3">{transaction.date}</p>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {transaction.category}
                          </span>
                        </div>
                      </div>
                      <p className={`font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No transactions found matching your search criteria.</p>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-500">Showing 1-10 of 43 transactions</p>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 bg-white">Previous</button>
                  <button className="px-3 py-1 border border-blue-600 rounded bg-blue-600 text-white">1</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 bg-white">2</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 bg-white">3</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 bg-white">Next</button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'statements' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 mb-4">
                <h3 className="text-lg font-medium">Monthly Statements</h3>
                <p className="text-gray-500">View and download your account statements</p>
              </div>
              
              {/* Statements list */}
              <div className="border-t border-gray-200">
                {statements.map((statement, index) => (
                  <div 
                    key={statement.id} 
                    className={`p-4 flex flex-col md:flex-row md:justify-between md:items-center ${
                      index !== statements.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">Statement for {statement.period}</p>
                        <p className="text-sm text-gray-500">Available on {statement.availableOn}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end">
                      <div className="text-right mr-6">
                        <p className="text-sm text-gray-500">Ending Balance</p>
                        <p className="font-medium">
                          ${statement.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm font-medium flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm font-medium">CSV</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}