'use client';

<<<<<<< HEAD
import React from 'react';
import { useState } from 'react';
import { CreditCard, Wallet, Plus, Download, MoreHorizontal, ChevronRight } from 'lucide-react';
=======
import React, { useState, useEffect } from 'react';
import { Landmark, Wallet, Plus, Download, MoreHorizontal } from 'lucide-react';
>>>>>>> 2b26401825755bc875d2e8b6f46f1dbb5163020f
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

<<<<<<< HEAD
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
=======
export default function AccountsPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Improved function to get the session ID from cookies in Next.js
    const getSessionId = () => {
      try {
        // Next.js specific cookie handling can be tricky
        // The cookie is set as httpOnly which means JavaScript can't directly access it
        // But we can still check document.cookie for its existence

        // Method 1: Try to check for cookie existence via document.cookie
        const cookieString = document.cookie;
        console.log('Cookie string:', cookieString);

        // You might need to just fetch data and let the browser handle cookies
        // Since httpOnly cookies are sent with requests but not accessible via JS

        // The session_id in your API route is set up correctly as httpOnly
        // We should rely on the browser to send it automatically with fetch
        // But return a placeholder value to prevent redirect

        return "session_exists"; // Placeholder to continue with fetch
      } catch (error) {
        console.error('Error accessing cookies:', error);
        return null;
      }
    };

    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // For httpOnly cookies, we don't need to manually extract the session
        // The browser will automatically send cookies with requests to the same domain
        const sessionId = getSessionId();

        if (!sessionId) {
          console.error('No session detected');
          setError('Authentication failed. Please log in again.');
          router.push('/auth/login'); // Redirect to login page
          return;
        }

        // Let browser automatically include the httpOnly cookie
        const response = await fetch('/api/accounts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // The browser will automatically include cookies
          credentials: 'include' // Important! This tells fetch to include cookies
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching accounts:', errorData);

          if (response.status === 401 || response.status === 403) {
            router.push('/auth/login'); // Redirect to login on auth errors
            return;
          }

          throw new Error(errorData.message || 'Failed to fetch accounts');
        }

        const data = await response.json();
        console.log('Fetched Accounts:', data);

        if (Array.isArray(data.accounts)) {
          setAccounts(data.accounts);

          // Set user name if available
          if (data.user) {
            const fullName = [data.user.FirstName, data.user.LastName]
              .filter(Boolean)
              .join(' ');
            setUserName(fullName || data.user.Email || '');
          }
        } else {
          throw new Error('Invalid accounts format received from server');
        }
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        setError(error.message || 'An error occurred while fetching your accounts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [router]);

  const filteredAccounts =
    activeTab === 'all'
      ? accounts
      : accounts.filter((account) => account.AccountType.toLowerCase() === activeTab);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Accounts" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex justify-center items-center h-64">
            <p className="text-gray-600">Loading your accounts...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Accounts" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6">
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm bg-red-100 px-3 py-1 rounded hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
>>>>>>> 2b26401825755bc875d2e8b6f46f1dbb5163020f

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="flex-1 md:ml-64">
        <Header title="Accounts" setIsMenuOpen={setIsMenuOpen} />
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {userName ? `${userName}'s Accounts` : 'Your Accounts'}
              </h1>
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
<<<<<<< HEAD
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
=======
              {['all', 'checking', 'savings'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === type
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {type === 'all' ? 'All Accounts' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
>>>>>>> 2b26401825755bc875d2e8b6f46f1dbb5163020f
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Balance</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-1">
<<<<<<< HEAD
                  ${accounts.reduce((sum, account) => sum + (account.type !== 'credit' ? account.balance : 0), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
=======
                  $
                  {(
                    accounts.reduce((sum, account) => sum + Number(account.Balance), 0) || 0
                  ).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
>>>>>>> 2b26401825755bc875d2e8b6f46f1dbb5163020f
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

<<<<<<< HEAD
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
=======
          {filteredAccounts.length > 0 ? (
            <div className="space-y-4">
              {filteredAccounts.map((account) => {
                const isChecking = account.AccountType.toLowerCase() === 'checking';
                return (
                  <div
                    key={account.AccountID}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isChecking
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          {isChecking ? (
                            <Landmark className="w-6 h-6" />
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
                            isChecking
                              ? 'text-blue-600'
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
                          {isChecking
                            ? 'Available Balance'
                            : 'Available Balance'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <p className="text-gray-500">No accounts found for this filter</p>
            </div>
          )}
>>>>>>> 2b26401825755bc875d2e8b6f46f1dbb5163020f
        </div>
      </main>
    </div>
  );
}