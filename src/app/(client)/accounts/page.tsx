'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Plus, Download, MoreHorizontal } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';

export default function AccountsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [accounts, setAccounts] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('session_id');

    if (!storedSessionId) {
      console.error("Session ID not found in localStorage.");
      return;
    }

    setSessionId(storedSessionId);

    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/accounts?session_id=${storedSessionId}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching accounts:", errorData);
          return;
        }

        const data = await response.json();
        console.log("Fetched Accounts:", data);

        if (Array.isArray(data.accounts)) {
          setAccounts(data.accounts);
        } else {
          console.error("Invalid accounts format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const filteredAccounts =
    activeTab === 'all'
      ? accounts
      : accounts.filter((account) => account.AccountType === activeTab);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="flex-1 md:ml-64">
        <Header title="Accounts" setIsMenuOpen={setIsMenuOpen} />
        <div className="p-4 md:p-6">
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

          <div className="mb-6">
            <div className="flex space-x-2 border-b border-gray-200">
              {['all', 'checking', 'savings', 'fixed'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === type
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {type === 'all' ? 'All Accounts' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Balance</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  $
                  {(
                    accounts.reduce((sum, account) => sum + account.Balance, 0) || 0
                  ).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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

          <div className="space-y-4">
            {filteredAccounts.map((account) => (
              <div
                key={account.AccountID}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        account.AccountType === 'credit'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {account.AccountType === 'credit' ? (
                        <CreditCard className="w-6 h-6" />
                      ) : (
                        <Wallet className="w-6 h-6" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">{account.AccountType}</h3>
                      <p className="text-sm text-gray-500">{account.AccountID}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xl font-semibold ${
                        account.AccountType === 'credit'
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      $
                      {Math.abs(account.Balance).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {account.AccountType === 'credit'
                        ? 'Current Balance Due'
                        : 'Available Balance'}
                    </p>
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
