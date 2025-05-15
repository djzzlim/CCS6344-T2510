"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Wallet, DollarSign, ShieldCheck, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';

// TypeScript interfaces for type safety
interface Account {
  AccountID: string;
  AccountType: string;
  Balance: number;
  Status: string;
}

interface Utility {
  UtilityID: string;
  AccountName: string;
  AccountNumber: string;
}

interface RecentPayment {
  id: string;
  to: string;
  amount: number;
  date: string;
  status: string;
  accountName: string;
}

export default function Payments() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fromAccount, setFromAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [memo, setMemo] = useState('');
    const [selectedBiller, setSelectedBiller] = useState('');
    
    // State for accounts, utilities, and payments data
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [utilities, setUtilities] = useState<Utility[]>([]);
    const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState('');

    // Fetch payment details on component mount
    const fetchPaymentDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/payments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error fetching payment details:', errorData);

                if (response.status === 401 || response.status === 403) {
                    router.push('/auth/login');
                    return;
                }

                throw new Error(errorData.message || 'Failed to fetch payment details');
            }

            const data = await response.json();
            console.log('Fetched Payment Details:', data);

            // Set accounts, utilities, and recent payments
            setAccounts(data.accounts);
            setUtilities(data.utilities);
            setRecentPayments(data.recentPayments);

            // Set default account if accounts exist
            if (data.accounts && data.accounts.length > 0) {
                setFromAccount(data.accounts[0].AccountID);
            }

            // Set user name if available
            if (data.user && data.user.FirstName) {
                setUserName(data.user.FirstName);
            }
        } catch (error) {
            console.error('Failed to fetch payment details:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentDetails();
    }, [router]);

    // Handle payment submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    fromAccountId: fromAccount,
                    utilityId: selectedBiller,
                    amount: parseFloat(amount),
                    paymentDate: new Date(),
                    memo: memo
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment submission failed');
            }

            const result = await response.json();
            alert(`Payment successful! Payment ID: ${result.paymentId}`);
            
            // Refresh payment details to update recent payments
            await fetchPaymentDetails();
            
            // Reset form after successful submission
            setAmount('');
            setSelectedBiller('');
            setMemo('');
        } catch (error) {
            console.error('Payment submission error:', error);
            alert(error instanceof Error ? error.message : 'An unexpected error occurred');
        }
    };

    // Format currency display
    const formatCurrency = (amount: number | string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(Number(amount));
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
                                                            <option key={account.AccountID} value={account.AccountID}>
                                                                {account.AccountType} ({formatCurrency(account.Balance)})
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
                                                <select
                                                    className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none pr-10"
                                                    value={selectedBiller}
                                                    onChange={(e) => setSelectedBiller(e.target.value)}
                                                >
                                                    <option value="">Select a utility provider</option>
                                                    {utilities.map(utility => (
                                                        <option key={utility.UtilityID} value={utility.UtilityID}>
                                                            {utility.AccountName} - Acct #{utility.AccountNumber}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Chevron Icon fixed position */}
                                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                                    <ChevronDown className="w-5 h-5 text-gray-500" />
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
                                                    onChange={(e) => {
                                                        // Allow only numbers and decimal point
                                                        const value = e.target.value.replace(/[^0-9.]/g, '');
                                                        setAmount(value);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <input
                                                type="text"
                                                className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                placeholder="Add a description"
                                                value={memo}
                                                onChange={(e) => setMemo(e.target.value)}
                                                required
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
                                    {recentPayments.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        No recent payments found
                                    </div>
                                ) : (
                                    recentPayments.slice(0, 3).map(payment => {
                                        // Format date similar to transfers component
                                        const formatRelativeDate = (dateString: string) => {
                                            const date = new Date(dateString);
                                            const now = new Date();
                                            const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

                                            if (diffDays === 0) return 'Today';
                                            if (diffDays === 1) return 'Yesterday';
                                            if (diffDays < 7) return `${diffDays} days ago`;
                                            
                                            return date.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            });
                                        };

                                        return (
                                            <div key={payment.id} className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                            <DollarSign className="w-4 h-4" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="font-medium text-sm">{payment.to}</p>
                                                            <p className="text-xs text-gray-500">{formatRelativeDate(payment.date)}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-medium text-sm">{formatCurrency(payment.amount)}</p>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <span>{payment.accountName}</span>
                                                    <span className="text-green-600">{payment.status}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
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
                            {userName && (
                                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                                    <div className="flex items-start">
                                        <div className="ml-1">
                                            <h3 className="font-medium text-blue-800">Hello, {userName}</h3>
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