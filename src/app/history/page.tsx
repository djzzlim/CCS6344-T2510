"use client";

import { useState } from 'react';
import { Bell, Menu, Search, User, CreditCard, ArrowDownRight, ArrowUpRight, PieChart, Clock, Filter, Download, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function History() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [transactionType, setTransactionType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const accounts = [
    { id: '1', name: "Checking Account", number: "****5678", balance: 4256.78 },
    { id: '2', name: "Savings Account", number: "****9012", balance: 12785.45 },
  ];

  const transactionHistory = [
    { id: '1', date: 'Apr 20, 2025', description: 'Grocery Store', amount: -86.47, type: 'purchase', account: '1', category: 'Shopping', status: 'Completed' },
    { id: '2', date: 'Apr 18, 2025', description: 'Direct Deposit - Payroll', amount: 2450.00, type: 'deposit', account: '1', category: 'Income', status: 'Completed' },
    { id: '3', date: 'Apr 15, 2025', description: 'City Utilities', amount: -124.56, type: 'payment', account: '1', category: 'Bills', status: 'Completed' },
    { id: '4', date: 'Apr 12, 2025', description: 'ATM Withdrawal', amount: -100.00, type: 'withdrawal', account: '1', category: 'Cash', status: 'Completed' },
    { id: '5', date: 'Apr 10, 2025', description: 'Transfer to Savings', amount: -500.00, type: 'transfer', account: '1', category: 'Transfers', status: 'Completed' },
    { id: '6', date: 'Apr 10, 2025', description: 'Transfer from Checking', amount: 500.00, type: 'transfer', account: '2', category: 'Transfers', status: 'Completed' },
    { id: '7', date: 'Apr 8, 2025', description: 'Online Purchase', amount: -59.99, type: 'purchase', account: '1', category: 'Shopping', status: 'Completed' },
    { id: '8', date: 'Apr 5, 2025', description: 'Interest Payment', amount: 12.45, type: 'interest', account: '2', category: 'Income', status: 'Completed' },
    { id: '9', date: 'Apr 1, 2025', description: 'Mortgage Payment', amount: -1450.00, type: 'payment', account: '1', category: 'Housing', status: 'Completed' },
    { id: '10', date: 'Mar 28, 2025', description: 'Restaurant', amount: -35.82, type: 'purchase', account: '1', category: 'Dining', status: 'Completed' },
    { id: '11', date: 'Mar 25, 2025', description: 'Gas Station', amount: -42.50, type: 'purchase', account: '1', category: 'Transportation', status: 'Completed' },
    { id: '12', date: 'Mar 20, 2025', description: 'Cell Phone Provider', amount: -85.99, type: 'payment', account: '1', category: 'Bills', status: 'Completed' },
  ];

  const filterTransactions = () => {
    return transactionHistory.filter(transaction => {
      // Filter by account
      if (selectedAccount !== 'all' && transaction.account !== selectedAccount) {
        return false;
      }

      // Filter by transaction type
      if (transactionType !== 'all' && transaction.type !== transactionType) {
        return false;
      }

      // Filter by search query
      if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Date range filtering could be added here
      
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Shopping': return '🛍️';
      case 'Income': return '💸';
      case 'Bills': return '📝';
      case 'Cash': return '💰';
      case 'Transfers': return '↔️';
      case 'Housing': return '🏠';
      case 'Dining': return '🍽️';
      case 'Transportation': return '🚗';
      default: return '📋';
    }
  };

  const resetFilters = () => {
    setSelectedAccount('all');
    setDateRange('30');
    setTransactionType('all');
    setSearchQuery('');
  };

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
              <Link href="/" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <PieChart className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <a href="/accounts" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <CreditCard className="w-5 h-5 mr-3" />
                <span>Accounts</span>
              </a>
            </li>
            <li>
              <a href="/transfers" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <ArrowUpRight className="w-5 h-5 mr-3" />
                <span>Transfers</span>
              </a>
            </li>
            <li>
              <a href="/payments" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <ArrowDownRight className="w-5 h-5 mr-3" />
                <span>Payments</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 mr-3" />
                <span className="font-medium">History</span>
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
                <Link href="/" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <PieChart className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <a href="/accounts" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <CreditCard className="w-5 h-5 mr-3" />
                  <span>Accounts</span>
                </a>
              </li>
              <li>
                <a href="/transfers" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <ArrowUpRight className="w-5 h-5 mr-3" />
                  <span>Transfers</span>
                </a>
              </li>
              <li>
                <a href="/payments" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <ArrowDownRight className="w-5 h-5 mr-3" />
                  <span>Payments</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 mr-3" />
                  <span className="font-medium">History</span>
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
              <h2 className="text-xl font-semibold hidden md:block">Transaction History</h2>
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

        {/* History content */}
        <div className="p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
            <p className="text-gray-600">View and manage your past transactions</p>
          </div>

          {/* Filters and search */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
              <div className="w-full md:w-auto relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions"
                  className="pl-10 pr-4 py-2 w-full md:w-64 bg-white border border-gray-300 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap w-full md:w-auto gap-2 items-center">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium"
                >
                  <Filter className="w-4 h-4 mr-2 text-gray-600" />
                  Filter
                </button>
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium">
                  <Download className="w-4 h-4 mr-2 text-gray-600" />
                  Export
                </button>
                <div className="flex items-center space-x-2">
                  <button className="hidden md:flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Last 30 Days</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded filters */}
            {filterOpen && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                    <select
                      className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg"
                      value={selectedAccount}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                    >
                      <option value="all">All Accounts</option>
                      {accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.name} ({account.number})
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
                      <option value="custom">Custom Range</option>
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
                      <option value="deposit">Deposits</option>
                      <option value="purchase">Purchases</option>
                      <option value="payment">Bill Payments</option>
                      <option value="transfer">Transfers</option>
                      <option value="withdrawal">Withdrawals</option>
                      <option value="interest">Interest</option>
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
            {/* Transactions header */}
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
              <div className="col-span-1">Date</div>
              <div className="col-span-2">Description</div>
              <div className="col-span-1">Category</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Amount</div>
            </div>

            {/* Transactions list */}
            <div className="divide-y divide-gray-200">
              {currentTransactions.length > 0 ? (
                currentTransactions.map(transaction => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50">
                    <div className="md:grid md:grid-cols-6 md:gap-4 flex flex-wrap">
                      <div className="col-span-1 text-sm text-gray-600 md:mb-0 mb-1 w-full md:w-auto">
                        {transaction.date}
                      </div>
                      <div className="col-span-2 font-medium md:mb-0 mb-2 flex flex-col">
                        <span>{transaction.description}</span>
                        <span className="text-xs text-gray-500 md:hidden">
                          {transaction.account === '1' ? 'Checking Account' : 'Savings Account'}
                        </span>
                      </div>
                      <div className="col-span-1 text-sm flex items-center md:mb-0 mb-2">
                        <span className="mr-2">{getCategoryIcon(transaction.category)}</span>
                        <span className="text-gray-700">{transaction.category}</span>
                      </div>
                      <div className="col-span-1 md:mb-0 mb-2">
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                          {transaction.status}
                        </span>
                      </div>
                      <div className={`col-span-1 font-medium text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </div>
                    </div>
                    <div className="md:hidden mt-2 pt-2 border-t border-gray-100 flex justify-between">
                      <button className="text-blue-600 text-sm font-medium">View Details</button>
                      {transaction.type === 'payment' && (
                        <button className="text-blue-600 text-sm font-medium">Pay Again</button>
                      )}
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
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
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
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show current page, first, last, and adjacent pages
                      return page === 1 || page === totalPages || 
                             Math.abs(page - currentPage) <= 1;
                    })
                    .map((page, i, arr) => {
                      // Add ellipsis
                      const showEllipsisBefore = i > 0 && arr[i-1] !== page - 1;
                      const showEllipsisAfter = i < arr.length - 1 && arr[i+1] !== page + 1;
                      
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsisBefore && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                              currentPage === page 
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