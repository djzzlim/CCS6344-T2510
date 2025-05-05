"use client";

import { useState } from 'react';
import { Search, PlusCircle, FileText, Eye, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/officer-sidebar';

export default function CustomerDatabase() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock customer data
    const customers = [
        {
            id: 'CUS-45621',
            name: 'Michael Thompson',
            email: 'michael.thompson@example.com',
            phone: '(555) 123-4567',
            address: '123 Oak Street, Springfield, IL 62704',
            accountOpenDate: 'March 15, 2018',
            accountManager: 'Sarah Johnson',
            lastContact: 'Apr 25, 2025',
            transactionHistory: [
                { id: 'TRX-75482', date: 'Apr 20, 2025', amount: 5000.00, type: 'Wire Transfer', status: 'Completed' },
                { id: 'TRX-72145', date: 'Mar 15, 2025', amount: 7500.00, type: 'Wire Transfer', status: 'Completed' },
                { id: 'TRX-69874', date: 'Feb 28, 2025', amount: 3200.00, type: 'ACH Transfer', status: 'Completed' },
            ],
            accounts: [
                { number: '****7845', type: 'Checking', balance: 24500.00, openDate: 'Mar 15, 2018' },
                { number: '****9654', type: 'Savings', balance: 45600.00, openDate: 'Apr 22, 2018' }
            ],
        },
        {
            id: 'CUS-32145',
            name: 'Jennifer Wilson',
            email: 'jennifer.wilson@example.com',
            phone: '(555) 987-6543',
            address: '456 Maple Avenue, Riverside, CA 92501',
            accountOpenDate: 'January 7, 2020',
            accountManager: 'David Chen',
            lastContact: 'Apr 18, 2025',
            transactionHistory: [
                { id: 'TRX-76985', date: 'Apr 18, 2025', amount: 2000.00, type: 'ACH Transfer', status: 'Completed' },
                { id: 'TRX-73654', date: 'Apr 10, 2025', amount: 1500.00, type: 'External Transfer', status: 'Completed' },
                { id: 'TRX-70215', date: 'Mar 25, 2025', amount: 3000.00, type: 'Wire Transfer', status: 'Completed' },
            ],
            accounts: [
                { number: '****3298', type: 'Checking', balance: 18750.00, openDate: 'Jan 7, 2020' },
                { number: '****4521', type: 'Business', balance: 32400.00, openDate: 'Jan 15, 2020' }
            ],
        },
        {
            id: 'CUS-78942',
            name: 'Robert Garcia',
            email: 'robert.garcia@example.com',
            phone: '(555) 456-7890',
            address: '789 Pine Street, Portland, OR 97205',
            accountOpenDate: 'October 12, 2015',
            accountManager: 'Lisa Park',
            lastContact: 'Apr 15, 2025',
            transactionHistory: [
                { id: 'TRX-77456', date: 'Apr 15, 2025', amount: 8200.00, type: 'External Transfer', status: 'Completed' },
                { id: 'TRX-74123', date: 'Mar 15, 2025', amount: 8200.00, type: 'External Transfer', status: 'Completed' },
                { id: 'TRX-70987', date: 'Feb 15, 2025', amount: 8200.00, type: 'External Transfer', status: 'Completed' },
            ],
            accounts: [
                { number: '****4571', type: 'Checking', balance: 15800.00, openDate: 'Oct 12, 2015' },
                { number: '****6542', type: 'Savings', balance: 67500.00, openDate: 'Oct 12, 2015' }
            ],
        },
        {
            id: 'CUS-56789',
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@example.com',
            phone: '(555) 234-5678',
            address: '321 Birch Road, Chicago, IL 60601',
            accountOpenDate: 'May 3, 2022',
            accountManager: 'James Wilson',
            lastContact: 'Apr 30, 2025',
            transactionHistory: [
                { id: 'TRX-78912', date: 'Apr 28, 2025', amount: 1200.00, type: 'Direct Deposit', status: 'Completed' },
                { id: 'TRX-75634', date: 'Apr 14, 2025', amount: 1200.00, type: 'Direct Deposit', status: 'Completed' },
                { id: 'TRX-72398', date: 'Mar 31, 2025', amount: 1200.00, type: 'Direct Deposit', status: 'Completed' },
            ],
            accounts: [
                { number: '****2345', type: 'Checking', balance: 3450.00, openDate: 'May 3, 2022' },
                { number: '****3456', type: 'Savings', balance: 12500.00, openDate: 'May 3, 2022' }
            ],
        },
        {
            id: 'CUS-67890',
            name: 'David Kim',
            email: 'david.kim@example.com',
            phone: '(555) 345-6789',
            address: '567 Cedar Lane, Seattle, WA 98101',
            accountOpenDate: 'August 17, 2021',
            accountManager: 'Michelle Taylor',
            lastContact: 'May 1, 2025',
            transactionHistory: [
                { id: 'TRX-79023', date: 'Apr 30, 2025', amount: 25000.00, type: 'International Wire', status: 'Pending Review' },
                { id: 'TRX-76542', date: 'Apr 15, 2025', amount: 18000.00, type: 'International Wire', status: 'Completed' },
                { id: 'TRX-73210', date: 'Mar 22, 2025', amount: 22000.00, type: 'International Wire', status: 'Completed' },
            ],
            accounts: [
                { number: '****5678', type: 'Checking', balance: 45000.00, openDate: 'Aug 17, 2021' },
                { number: '****6789', type: 'Investment', balance: 230000.00, openDate: 'Sep 5, 2021' }
            ],
        }
    ];

    const filteredCustomers = customers.filter(customer => {
        // Filter by search term
        const searchMatch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());


        return searchMatch;
    });

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="px-4 py-3 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Customer Database</h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <Link href="/add-customer" className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm hover:bg-blue-700">
                                <PlusCircle className="h-4 w-4 mr-1" />
                                New Customer
                            </Link>
                        </div>
                    </div>

                </header>

                {/* Main content area */}
                <div className="flex-1 overflow-auto p-4">
                    {!selectedCustomer ? (
                        <div className="bg-white rounded-lg shadow">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Open Date</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-semibold">
                                                            {customer.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div className="ml-2">
                                                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                            <div className="text-sm text-gray-500">{customer.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.accountOpenDate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900"
                                                        onClick={() => setSelectedCustomer(customer)}
                                                    >
                                                        View Profile
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">No customers found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                    onClick={() => setSelectedCustomer(null)}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back to Customer List
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
                                            {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="ml-4">
                                            <h2 className="text-2xl font-semibold text-gray-800">{selectedCustomer.name}</h2>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Account Manager</p>
                                        <p className="font-medium">{selectedCustomer.accountManager}</p>
                                        <p className="text-sm text-gray-500 mt-1">Last Contact</p>
                                        <p className="font-medium">{selectedCustomer.lastContact}</p>
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
                                            {selectedCustomer.accounts.map((account, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Account Number</p>
                                                            <p className="font-medium">{account.number}</p>
                                                        </div>
                                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
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
                                                </div>
                                            ))}
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
                                                {selectedCustomer.transactionHistory.map((transaction) => (
                                                    <tr key={transaction.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.amount.toLocaleString()}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                                    transaction.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-gray-100 text-gray-800'}`}>
                                                                {transaction.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                                <Eye className="w-4 h-4 inline mr-1" />
                                                                View
                                                            </button>
                                                            <button className="text-gray-600 hover:text-gray-900">
                                                                <FileText className="w-4 h-4 inline mr-1" />
                                                                Report
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}