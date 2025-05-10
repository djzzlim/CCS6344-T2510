"use client";

import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CustomerDetailsProps {
    title: string;
    selectedCustomer: any; // You can replace 'any' with a proper Customer type later
    setSelectedCustomer: (customer: any | null) => void;
    isLoading: boolean;
    error: string | null;
}

export default function CustomerDetails({
    title,
    selectedCustomer,
    setSelectedCustomer,
    isLoading,
    error,
}: CustomerDetailsProps) {
    const [activeTab, setActiveTab] = useState('details');
    const router = useRouter();

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';

        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }).format(date);
        } catch (err) {
            return dateString; // Return the original string if parsing fails
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">Loading customer details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedCustomer(null)}
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to {title}
                </button>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export Profile
                    </button>
                    <Link href={`/edit-customer/${selectedCustomer.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Edit Profile
                    </Link>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl text-blue-800 font-semibold">
                            {selectedCustomer?.name
                                ? selectedCustomer.name.split(' ').map(n => n[0]).join('')
                                : 'N/A'}
                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {selectedCustomer?.name ?? 'No customer selected'}
                            </h2>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Account Manager</p>
                        <p className="font-medium">
                            {selectedCustomer?.accountManager ?? 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Last Contact</p>
                        <p className="font-medium">
                            {selectedCustomer?.lastContact ?? 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab navigation */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    <button
                        className={`px-1 py-4 text-sm font-medium border-b-2 ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Customer Details
                    </button>
                    <button
                        className={`px-1 py-4 text-sm font-medium border-b-2 ${activeTab === 'accounts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('accounts')}
                    >
                        Accounts
                    </button>
                    <button
                        className={`px-1 py-4 text-sm font-medium border-b-2 ${activeTab === 'transactions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Transaction History
                    </button>
                </nav>
            </div>

            {/* Details Tab */}
            {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium">{selectedCustomer.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-medium">{selectedCustomer.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="font-medium">{selectedCustomer.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium">{selectedCustomer.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Account Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Customer ID</p>
                                    <p className="font-medium">{selectedCustomer.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Account Open Date</p>
                                    <p className="font-medium">{selectedCustomer.accountOpenDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Accounts Tab */}
            {activeTab === 'accounts' && (
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Account Summary</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {selectedCustomer.accounts && selectedCustomer.accounts.length > 0 ? (
                                selectedCustomer.accounts.map((account, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm text-gray-500">Account Number</p>
                                                <p className="font-medium">{account.number}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${account.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                account.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                                                    account.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                                                        'bg-blue-100 text-blue-800'
                                                }`}>
                                                {account.type}
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500">Balance</p>
                                            <p className="text-xl font-semibold">${account.balance.toLocaleString()}</p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Open Date</p>
                                            <p className="font-medium">{account.openDate}</p>
                                        </div>
                                        <div className="mt-3">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                                onClick={() => router.push(`/accounts/${account.accountId}`)}
                                            >
                                                View Account Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-4 text-gray-500">
                                    No accounts found for this customer
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Transaction History</h3>
                        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                            <Download className="w-4 h-4 mr-1" />
                            Export Transactions
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {selectedCustomer.transactionHistory && selectedCustomer.transactionHistory.length > 0 ? (
                                    selectedCustomer.transactionHistory.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(transaction.date)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                                                    ${Math.abs(transaction.amount).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{transaction.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize
                                                        ${transaction.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        transaction.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {transaction.status}
                                                </span>

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => router.push(`/transactions/${transaction.id}`)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No transactions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}