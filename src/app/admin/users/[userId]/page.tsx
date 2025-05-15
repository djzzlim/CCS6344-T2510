"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import Sidebar from '@/components/admin-sidebar';
import Header from '@/components/admin-header';

interface User {
  UserID: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Role: string;
  ContactNumber: string | null;
  DateOfBirth: string | null;
  AddressLine1: string | null;
  AddressLine2: string | null;
  City: string | null;
  State: string | null;
  ZipCode: string | null;
  AccountOpenDate: string;
  accounts: {
    AccountID: string;
    AccountType: string;
    Balance: number;
    Status: string;
  }[];
}

export default function EditUserPage({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const userId = use(Promise.resolve(params.userId));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    contactNumber: '',
    dateOfBirth: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`, {
        credentials: 'include'
      });

      if (response.status === 401) {
        console.error('Authentication error: user is not authorized');
        setError('Authentication failed. Please log in again.');
        router.push('/auth/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      setUser(data.user);
      
      // Format date for the date input
      let formattedDate = '';
      if (data.user.DateOfBirth) {
        const date = new Date(data.user.DateOfBirth);
        formattedDate = date.toISOString().split('T')[0];
      }

      setFormData({
        email: data.user.Email,
        firstName: data.user.FirstName,
        lastName: data.user.LastName,
        role: data.user.Role,
        contactNumber: data.user.ContactNumber || '',
        dateOfBirth: formattedDate,
        addressLine1: data.user.AddressLine1 || '',
        addressLine2: data.user.AddressLine2 || '',
        city: data.user.City || '',
        state: data.user.State || '',
        zipCode: data.user.ZipCode || ''
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to load user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          contactNumber: formData.contactNumber || null,
          dateOfBirth: formData.dateOfBirth || null,
          addressLine1: formData.addressLine1 || null,
          addressLine2: formData.addressLine2 || null,
          city: formData.city || null,
          state: formData.state || null,
          zipCode: formData.zipCode || null
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      router.push('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Edit User" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center h-screen">
            <p className="text-gray-600">Loading user data...</p>
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
          <Header title="Edit User" setIsMenuOpen={setIsMenuOpen} />
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

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-1 md:ml-64">
          <Header title="Edit User" setIsMenuOpen={setIsMenuOpen} />
          <div className="p-4 md:p-6 flex items-center justify-center h-screen">
            <p className="text-red-500">User not found</p>
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
          title="Edit User" 
          setIsMenuOpen={setIsMenuOpen} 
        />

        {/* Page content */}
        <div className="p-4 md:p-6">
          <div className="mb-6">
            <Link href="/admin/users" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Users
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">Edit User: {user.FirstName} {user.LastName}</h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Information */}
                <div className="col-span-1 md:col-span-2">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Account Information</h2>
                  <div className="h-0.5 bg-gray-200 mb-4"></div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Officer">Officer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Personal Information */}
                <div className="col-span-1 md:col-span-2 mt-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h2>
                  <div className="h-0.5 bg-gray-200 mb-4"></div>
                </div>

                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Address Information */}
                <div className="col-span-1 md:col-span-2 mt-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Address Information</h2>
                  <div className="h-0.5 bg-gray-200 mb-4"></div>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* User Accounts Information */}
                {user.accounts.length > 0 && (
                  <>
                    <div className="col-span-1 md:col-span-2 mt-4">
                      <h2 className="text-lg font-medium text-gray-900 mb-2">User Accounts</h2>
                      <div className="h-0.5 bg-gray-200 mb-4"></div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Account ID
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
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {user.accounts.map((account) => (
                              <tr key={account.AccountID}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {account.AccountID}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {account.AccountType}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  ${account.Balance.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    account.Status === 'Active' ? 'bg-green-100 text-green-800' :
                                    account.Status === 'Suspended' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {account.Status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <Link
                  href="/admin/users"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 