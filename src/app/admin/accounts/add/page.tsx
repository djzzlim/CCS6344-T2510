"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/admin-sidebar';
import Header from '@/components/admin-header';

interface User {
  UserID: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Role: string;
}

export default function AddAccountPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  
  // Form state
  const [userId, setUserId] = useState('');
  const [accountType, setAccountType] = useState('Checking');
  const [initialBalance, setInitialBalance] = useState('0');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/users', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      setError('Please select a user');
      return;
    }

    if (!accountType) {
      setError('Please select an account type');
      return;
    }

    // Validate balance is a valid number
    const balance = parseFloat(initialBalance);
    if (isNaN(balance) || balance < 0) {
      setError('Please enter a valid initial balance');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          accountType,
          initialBalance: balance
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
      }

      const data = await response.json();
      setSuccessMessage('Account created successfully!');
      
      // Navigate back to accounts list after a short delay
      setTimeout(() => {
        router.push('/admin/accounts');
      }, 2000);
    } catch (error: any) {
      console.error('Error creating account:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <Header title="Add New Account" setIsMenuOpen={setIsMenuOpen} />

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
            <h1 className="text-xl font-semibold text-gray-900 mb-6">Add New Account</h1>
            
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

            <form onSubmit={handleSubmit}>
              {/* User Selection */}
              <div className="mb-6">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Owner
                </label>
                <select
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.UserID} value={user.UserID}>
                      {user.FirstName} {user.LastName} ({user.Email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Type */}
              <div className="mb-6">
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  id="accountType"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                  required
                >
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                  <option value="Investment">Investment</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>

              {/* Initial Balance */}
              <div className="mb-6">
                <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Balance ($)
                </label>
                <input
                  type="number"
                  id="initialBalance"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 