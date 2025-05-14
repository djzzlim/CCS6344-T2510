"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin-sidebar';
import Header from '@/components/admin-header';

interface Account {
  AccountID: string;
  UserID: string;
  Status: string;
  Balance: number;
  AccountType: string;
  user: {
    UserID: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Role: string;
  };
}

export default function AccountsPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/accounts', {
        credentials: 'include'
      });

      // Check for authentication errors
      if (response.status === 401) {
        console.error('Authentication error: user is not authorized');
        setError('Authentication failed. Please log in again.');
        router.push('/auth/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const data = await response.json();
      setAccounts(data.accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setError('Failed to load accounts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    try {
      const response = await fetch(`/api/admin/accounts/${accountId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      // Refresh accounts list
      fetchAccounts();
      setShowDeleteModal(false);
      setSelectedAccount(null);
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account');
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const searchLower = searchTerm.toLowerCase();
    return (
      account.AccountID.toLowerCase().includes(searchLower) ||
      account.AccountType.toLowerCase().includes(searchLower) ||
      account.user.Email.toLowerCase().includes(searchLower) ||
      `${account.user.FirstName} ${account.user.LastName}`.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Accounts" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center h-screen">
            <p className="text-gray-600">Loading accounts data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Accounts" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => router.push('/auth/login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Go to Login
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

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <Header 
          title="Accounts" 
          setIsMenuOpen={setIsMenuOpen} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Page content */}
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
            <Link
              href="/admin/accounts/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Account
            </Link>
          </div>

          {/* Accounts table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <tr key={account.AccountID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {account.AccountID}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {account.user.FirstName} {account.user.LastName}
                        </div>
                        <div className="text-sm text-gray-500">{account.user.Email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{account.AccountType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${account.Balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          account.Status === 'Active' ? 'bg-green-100 text-green-800' :
                          account.Status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {account.Status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            href={`/admin/accounts/${account.AccountID}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedAccount(account);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No accounts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAccount && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete account {selectedAccount.AccountID}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedAccount(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAccount(selectedAccount.AccountID)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 