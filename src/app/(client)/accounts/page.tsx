'use client';

import React, { useState, useEffect } from 'react';
import { Landmark, Wallet, Plus, Download, MoreHorizontal } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Balance</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                  $
                  {(
                    accounts.reduce((sum, account) => sum + Number(account.Balance), 0) || 0
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
        </div>
      </main>
    </div>
  );
}