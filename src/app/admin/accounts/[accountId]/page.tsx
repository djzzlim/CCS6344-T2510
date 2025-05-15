"use client";

import { useState, useEffect, use } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/admin-sidebar';
import Header from '@/components/admin-header';

interface Account {
  AccountID: string;
  UserID: string;
  Balance: number;
  AccountType: string;
  Status: string;
  user: {
    UserID: string;
    Email: string;
    FirstName: string;
    LastName: string;
  };
}

interface PageProps {
  params: Promise<{ accountId: string }>;
}

export default function EditAccountPage({ params }: PageProps) {
  const router = useRouter();
  const { accountId } = use(params);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  
  // Form state
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchAccount();
  }, [accountId]);

  const fetchAccount = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/admin/accounts/${accountId}`, {
        credentials: 'include'
      });

      if (response.status === 404) {
        setError('Account not found');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch account details');
      }

      const data = await response.json();
      setAccount(data.account);
      
      // Initialize form state with account data
      setAccountType(data.account.AccountType);
      setBalance(data.account.Balance.toString());
      setStatus(data.account.Status);
    } catch (error) {
      console.error('Error fetching account:', error);
      setError('Failed to load account details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate balance is a valid number
    const numBalance = parseFloat(balance);
    if (isNaN(numBalance) || numBalance < 0) {
      setError('Please enter a valid balance');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      
      const response = await fetch(`/api/admin/accounts/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: accountId,
          balance: numBalance,
          status
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update account');
      }

      const data = await response.json();
      setSuccessMessage('Account updated successfully!');
      
      // Navigate back to accounts list after a short delay
      setTimeout(() => {
        router.push('/admin/accounts');
      }, 2000);
    } catch (error: any) {
      console.error('Error updating account:', error);
      setError(error.message || 'Failed to update account. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Edit Account" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center h-screen">
            <p className="text-gray-600">Loading account data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !account) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Edit Account" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6">
            <div className="mb-6">
              <Link
                href="/admin/accounts"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Accounts
              </Link>
            </div>
            <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-red-500">{error}</div>
              <div className="mt-4">
                <button
                  onClick={() => router.push('/admin/accounts')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Return to Accounts
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <Header title={`Edit Account ${accountId}`} setIsMenuOpen={setIsMenuOpen} />

        {/* Page content */}
        <div className="p-4 md:p-6">
          <div className="mb-6">
            <Link
              href="/admin/accounts"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Accounts
            </Link>
          </div>

          <div className="bg-white shadow sm:rounded-lg p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Account: {accountId}</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}

            {account && (
              <>
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <h2 className="text-sm font-medium text-gray-700 mb-2">Account Owner</h2>
                  <p className="text-gray-900">
                    {account.user.FirstName} {account.user.LastName}
                  </p>
                  <p className="text-gray-500 text-sm">{account.user.Email}</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Account Type - Read only */}
                  <div className="mb-6">
                    <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <input
                      type="text"
                      id="accountType"
                      value={accountType}
                      className="w-full border-gray-300 rounded-md shadow-sm bg-gray-50"
                      disabled
                    />
                  </div>

                  {/* Account Balance */}
                  <div className="mb-6">
                    <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">
                      Balance ($)
                    </label>
                    <input
                      type="number"
                      id="balance"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSaving}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  {/* Account Status */}
                  <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSaving}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 