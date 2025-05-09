"use client";

import React from 'react';
import { useState } from 'react';
import { CreditCard, Wallet, Plus, Download, MoreHorizontal, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';

export default function Accounts() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const accounts = [
    {
      id: 1, name: "Fixed Deposit", number: "****5678", balance: 4256.78, type: "checking",
      details: { interestRate: "3.5", lastInterestPaid: "Apr 01, 2025", nextInterestDate: "May 01, 2025" }
    },
    {
      id: 2, name: "Savings Account", number: "****9012", balance: 12785.45, type: "savings",
      details: { interestRate: "1.5", lastInterestPaid: "Apr 01, 2025", nextInterestDate: "May 01, 2025" }
    },
  ];

  const filteredAccounts = activeTab === 'all' ? accounts : accounts.filter(account => account.type === activeTab);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <Header title="Accounts" setIsMenuOpen={setIsMenuOpen} />

        {/* Accounts content */}
        <div className="p-4 md:p-6">
          {/* Page header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Your Accounts</h1>
              <p className="text-gray-600">Manage all your accounts in one place</p>
            </div>
            <Link
              href="/add-account"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Link>
          </div>

          {/* Account filter tabs */}
          <div className="mb-6">
            <div className="flex space-x-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                All Accounts
              </button>
              <button
                onClick={() => setActiveTab('checking')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'checking' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Fixed Deposits
              </button>
              <button
                onClick={() => setActiveTab('savings')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'savings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Savings
              </button>
              {/* <button
                onClick={() => setActiveTab('credit')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'credit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Credit Cards
              </button> */}
            </div>
          </div>

          {/* Total balance card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Balance</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  ${accounts.reduce((sum, account) => sum + (account.type !== 'credit' ? account.balance : 0), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Account list */}
          <div className="space-y-4">
            {filteredAccounts.map(account => (
              <div key={account.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${account.type === 'credit' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                      {account.type === 'credit' ?
                        <CreditCard className="w-6 h-6" /> :
                        <Wallet className="w-6 h-6" />
                      }
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">{account.name}</h3>
                      <p className="text-sm text-gray-500">{account.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-semibold ${account.type === 'credit' ? "text-red-600" : "text-green-600"}`}>
                      ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {account.type === 'credit' ? "Current Balance Due" : "Available Balance"}
                    </p>
                  </div>
                </div>

                {/* Account details section - conditionally rendered based on account type */}
                {account.details && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      {/* {account.type === 'credit' && (
                        <>
                          <div>
                            <p className="text-xs text-gray-500">Credit Limit</p>
                            <p className="text-sm font-medium">${account.details?.limit?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Available Credit</p>
                            <p className="text-sm font-medium">${account.details?.availableCredit?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Payment Due Date</p>
                            <p className="text-sm font-medium">{account.details.dueDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Minimum Payment</p>
                            <p className="text-sm font-medium">${account.details.minPayment}</p>
                          </div>
                        </>
                      )} */}
                      {(account.type === 'savings' || account.type === 'checking') && account.details.interestRate && (
                        <>
                          <div>
                            <p className="text-xs text-gray-500">Interest Rate</p>
                            <p className="text-sm font-medium">{account.details.interestRate}% APY</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Last Interest Paid</p>
                            <p className="text-sm font-medium">{account.details.lastInterestPaid}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Next Interest Payment</p>
                            <p className="text-sm font-medium">{account.details.nextInterestDate}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="px-4 py-3 bg-white border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <Link href={`/accounts/detail?id=${account.id}&view=details`} className="text-sm text-blue-600 font-medium">View Details</Link>
                      <Link href={`/accounts/detail?id=${account.id}&view=transactions`} className="text-sm text-blue-600 font-medium">Transactions</Link>
                      <Link href={`/accounts/detail?id=${account.id}&view=statements`} className="text-sm text-blue-600 font-medium">Statements</Link>
                    </div>
                    <button className="flex items-center text-gray-500">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}