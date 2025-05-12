"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Wallet, DollarSign, ShieldCheck, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';

export default function Payments() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fromAccount, setFromAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('now');
    const [memo, setMemo] = useState('');
    const [selectedBiller, setSelectedBiller] = useState('');
    
    // State for accounts data
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch accounts data on component mount
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/accounts');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Format accounts data for display
                const formattedAccounts = data.accounts.map(account => ({
                    id: account.AccountID,
                    name: `${account.AccountType}`,
                    number: `****${account.AccountID.toString().slice(-4)}`,
                    balance: account.Balance,
                    status: account.Status
                }));
                
                setAccounts(formattedAccounts);
                setUser(data.user);
                
                // Set default selected account if accounts exist
                if (formattedAccounts.length > 0) {
                    setFromAccount(formattedAccounts[0].id.toString());
                }
                
            } catch (err) {
                console.error("Failed to fetch accounts:", err);
                setError("Failed to load account data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const billers = [
        { id: '1', name: "City Utilities", accountNumber: "8765432", lastAmount: 124.56, dueDate: "Apr 28, 2025" },
        { id: '2', name: "Mortgage Company", accountNumber: "1122334", lastAmount: 1450.00, dueDate: "May 1, 2025" },
        { id: '3', name: "Cell Phone Provider", accountNumber: "9988776", lastAmount: 85.99, dueDate: "May 5, 2025" },
        { id: '4', name: "Internet Service", accountNumber: "5544332", lastAmount: 69.95, dueDate: "Apr 30, 2025" },
    ];

    const recentPayments = [
        { id: 1, to: "City Utilities", amount: 124.56, date: "Mar 28, 2025", status: "Completed" },
        { id: 2, to: "Mortgage Company", amount: 1450.00, date: "Mar 15, 2025", status: "Completed" },
        { id: 3, to: "Cell Phone Provider", amount: 85.99, date: "Mar 10, 2025", status: "Completed" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission logic here
        const biller = billers.find(b => b.id === selectedBiller);
        const selectedAccount = accounts.find(acc => acc.id.toString() === fromAccount);
        alert(`Payment submitted: $${amount} from ${selectedAccount ? selectedAccount.name : 'Unknown'} to ${biller ? biller.name : 'New Utility'}`);
    };

    // Format currency display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Main content */}
            <main className="flex-1 md:ml-64">
                {/* Header */}
                <Header title="Payments" setIsMenuOpen={setIsMenuOpen} />

                {/* Payments content */}
                <div className="p-4 md:p-6">
                    {/* Page header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Pay Utility Bills</h1>
                        <p className="text-gray-600">Pay your utility bills quickly and securely</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Payment form */}
                        <div className="w-full md:w-2/3">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                {/* Payment form header */}
                                <div className="flex items-center mb-6">
                                    <Wallet className="w-5 h-5 text-blue-600 mr-2" />
                                    <h2 className="text-lg font-medium">Utility Bill Payment</h2>
                                </div>

                                {/* Loading state */}
                                {loading && (
                                    <div className="flex justify-center items-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    </div>
                                )}

                                {/* Error state */}
                                {error && (
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
                                        <div className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Payment form */}
                                {!loading && !error && (
                                    <form onSubmit={handleSubmit}>
                                        {/* From account */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pay From</label>
                                            <div className="relative">
                                                <select
                                                    className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none pr-10"
                                                    value={fromAccount}
                                                    onChange={(e) => setFromAccount(e.target.value)}
                                                >
                                                    {accounts.length === 0 ? (
                                                        <option value="">No accounts available</option>
                                                    ) : (
                                                        accounts.map(account => (
                                                            <option key={account.id} value={account.id}>
                                                                {account.name} {account.number} ({formatCurrency(account.balance)})
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* To utility */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Utility</label>
                                            <div className="relative">
                                                <div className="relative">
                                                    <select
                                                        className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none pr-10"
                                                        value={selectedBiller}
                                                        onChange={(e) => setSelectedBiller(e.target.value)}
                                                    >
                                                        <option value="">Select a utility provider</option>
                                                        {billers.map(biller => (
                                                            <option key={biller.id} value={biller.id}>
                                                                {biller.name} - Account #{biller.accountNumber}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* Chevron Icon fixed position */}
                                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                                    </div>
                                                </div>

                                                {/* Conditional Content Below */}
                                                <div className="mt-4 space-y-4">
                                                    {selectedBiller && selectedBiller !== 'new' && (
                                                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <p className="text-sm font-medium text-blue-800">
                                                                        {billers.find(b => b.id === selectedBiller)?.name}
                                                                    </p>
                                                                    <p className="text-xs text-blue-600">
                                                                        Due: {billers.find(b => b.id === selectedBiller)?.dueDate}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-blue-800">
                                                                        Last Payment: ${billers.find(b => b.id === selectedBiller)?.lastAmount}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <span className="text-gray-500">$</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="block w-full p-3 pl-8 bg-gray-50 border border-gray-300 rounded-lg"
                                                    placeholder="0.00"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {/* Payment date */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
                                            <div className="flex space-x-3">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="now"
                                                        name="paymentDate"
                                                        value="now"
                                                        checked={paymentDate === 'now'}
                                                        onChange={() => setPaymentDate('now')}
                                                        className="w-4 h-4 text-blue-600"
                                                    />
                                                    <label htmlFor="now" className="ml-2 text-sm text-gray-700">Today</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="scheduled"
                                                        name="paymentDate"
                                                        value="scheduled"
                                                        checked={paymentDate === 'scheduled'}
                                                        onChange={() => setPaymentDate('scheduled')}
                                                        className="w-4 h-4 text-blue-600"
                                                    />
                                                    <label htmlFor="scheduled" className="ml-2 text-sm text-gray-700">Schedule</label>
                                                </div>
                                            </div>

                                            {paymentDate === 'scheduled' && (
                                                <div className="mt-3">
                                                    <input
                                                        type="date"
                                                        className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                        min={new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Memo */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Memo (Optional)</label>
                                            <input
                                                type="text"
                                                className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                placeholder="Add a note"
                                                value={memo}
                                                onChange={(e) => setMemo(e.target.value)}
                                            />
                                        </div>

                                        {/* Submit button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                            disabled={!amount || !selectedBiller || !fromAccount || accounts.length === 0}
                                        >
                                            Continue
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Recent payments */}
                        <div className="w-full md:w-1/3">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-800">Recent Payments</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {recentPayments.map(payment => (
                                        <div key={payment.id} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                        <DollarSign className="w-4 h-4" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="font-medium text-sm">{payment.to}</p>
                                                        <p className="text-xs text-gray-500">{payment.date}</p>
                                                    </div>
                                                </div>
                                                <p className="font-medium text-sm">${payment.amount}</p>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-500">From Checking</span>
                                                <span className="text-green-600">{payment.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <Link href="/history" className="block w-full">
                                        <div className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium text-center">
                                            View All Payments
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* User info section when available */}
                            {user && (
                                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                                    <div className="flex items-start">
                                        <div className="ml-1">
                                            <h3 className="font-medium text-blue-800">Hello, {user.FirstName}</h3>
                                            <p className="text-sm text-blue-700 mt-1">
                                                You have {accounts.length} account{accounts.length !== 1 ? 's' : ''} available for payments.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security tip */}
                            <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-100">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-1">
                                        <ShieldCheck className="w-4 h-4" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-medium text-green-800">Security Tip</h3>
                                        <p className="text-sm text-green-700 mt-1">
                                            BankApp will never ask for your password or security codes through email or phone calls. Always verify the utility provider before sending payments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}