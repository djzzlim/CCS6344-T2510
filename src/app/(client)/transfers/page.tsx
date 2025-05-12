//transfers page 2

//transfers page
"use client";

import { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, Repeat, Globe } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Transfers() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [transferType, setTransferType] = useState('between');
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [memo, setMemo] = useState('');

    // New state variables for API data
    const [accounts, setAccounts] = useState([]);
    const [recentTransfers, setRecentTransfers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');

    // Format relative date helper function
    const formatRelativeDate = (date) => {
        // Simple implementation - can be expanded with a library like date-fns
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return "Today";
        } else if (diffDays === 1) {
            return "Yesterday";
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            // Format as MMM DD, YYYY
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
    };

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

                    // Set default from and to accounts after loading
                    if (data.accounts.length > 0) {
                        setFromAccount(data.accounts[0].AccountID);

                        if (data.accounts.length > 1) {
                            setToAccount(data.accounts[1].AccountID);
                        }
                    }

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

        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/customer-transaction', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error fetching transactions:', errorData);
                    return;
                }

                const data = await response.json();
                let allTransactions = [];

                // Process transfers
                if (data.transfers && Array.isArray(data.transfers)) {
                    const formattedTransfers = data.transfers.map((transfer) => {
                        // Format date
                        const date = transfer.CreatedAt
                            ? new Date(transfer.CreatedAt)
                            : new Date();

                        // Format relative date
                        const formattedDate = formatRelativeDate(date);

                        return {
                            id: transfer.TransferID || Math.random().toString(36).substring(2, 15),
                            from: transfer.fromAccount?.AccountID || 'Unknown Account',
                            to: transfer.toAccount?.AccountID || 'Unknown Account',
                            amount: transfer.Amount || 0,
                            date: formattedDate,
                            status: transfer.Status || 'Completed'
                        };
                    });

                    allTransactions = [...allTransactions, ...formattedTransfers];
                }

                // Sort by date (newest first) and take the first 5
                const sortedTransactions = allTransactions
                    .sort((a, b) => {
                        // If using the formatted strings might be tricky for sorting
                        // This is a simplified approach - in production you might want to 
                        // sort based on the original date objects
                        return new Date(b.CreatedAt || 0).getTime() - new Date(a.CreatedAt || 0).getTime();
                    })
                    .slice(0, 5);

                setRecentTransfers(sortedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchAccounts();
        fetchTransactions();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (transferType === 'between' && fromAccount === toAccount) {
            alert('Please select different accounts for transfer');
            return;
        }

        try {
            let transferData = {
                fromAccountId: fromAccount,
                amount: parseFloat(amount),
                memo: memo,
                isImmediate: true // Always immediate now
            };

            if (transferType === 'between') {
                transferData.toAccountId = toAccount;
                transferData.transferType = 'Internal';
            } else {
                // For external transfers
                const accountNumberInput = document.querySelector('input[placeholder="Account Number"]');

                if (!accountNumberInput) {
                    alert('External account form elements not found');
                    return;
                }

                transferData.transferType = 'External';
                transferData.accountNumber = accountNumberInput.value;

                // Validate external account details
                if (!transferData.accountNumber) {
                    alert('Please fill in all external account details');
                    return;
                }
            }

            // Submit the transfer
            const response = await fetch('/api/transfers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(transferData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Transfer failed');
            }

            const result = await response.json();
            alert('Transfer successful! Reference: ' + result.transferId);

            // Refresh the recent transfers list
            fetchTransactions();

            // Reset form
            setAmount('');
            setMemo('');
        } catch (error) {
            console.error('Transfer failed:', error);
            alert(`Transfer failed: ${error.message}`);
        }
    };

    // Helper function to fetch transactions - extracted for reuse
    const fetchTransactions = async () => {
        try {
            const response = await fetch('/api/customer-transaction', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error fetching transactions:', errorData);
                return;
            }

            const data = await response.json();
            let allTransactions = [];

            // Process transfers
            if (data.transfers && Array.isArray(data.transfers)) {
                const formattedTransfers = data.transfers.map((transfer) => {
                    // Format date
                    const date = transfer.CreatedAt
                        ? new Date(transfer.CreatedAt)
                        : new Date();

                    // Format relative date
                    const formattedDate = formatRelativeDate(date);

                    return {
                        id: transfer.TransferID || Math.random().toString(36).substring(2, 15),
                        from: transfer.fromAccount?.AccountID || 'Unknown Account',
                        to: transfer.toAccount?.AccountID || 'Unknown Account',
                        amount: transfer.Amount || 0,
                        date: formattedDate,
                        status: transfer.Status || 'Completed'
                    };
                });

                allTransactions = [...allTransactions, ...formattedTransfers];
            }

            // Sort by date (newest first) and take the first 5
            const sortedTransactions = allTransactions
                .sort((a, b) => {
                    // If using the formatted strings might be tricky for sorting
                    // This is a simplified approach - in production you might want to 
                    // sort based on the original date objects
                    return new Date(b.CreatedAt || 0).getTime() - new Date(a.CreatedAt || 0).getTime();
                })
                .slice(0, 5);

            setRecentTransfers(sortedTransactions);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <main className="flex-1 md:ml-64">
                    <Header title="Transfers" setIsMenuOpen={setIsMenuOpen} />
                    <div className="p-4 md:p-6 flex justify-center items-center h-screen">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading your accounts...</p>
                        </div>
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
                    <Header title="Transfers" setIsMenuOpen={setIsMenuOpen} />
                    <div className="p-4 md:p-6">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-800">
                            <h3 className="font-medium">Error</h3>
                            <p>{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 px-4 py-2 bg-red-100 rounded-lg text-sm font-medium"
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

            {/* Main content */}
            <main className="flex-1 md:ml-64">
                {/* Header */}
                <Header title="Transfers" setIsMenuOpen={setIsMenuOpen} />

                {/* Transfers content */}
                <div className="p-4 md:p-6">
                    {/* Page header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Make a Transfer</h1>
                        <p className="text-gray-600">Move money between your accounts or to someone else</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Transfer form */}
                        <div className="w-full md:w-2/3">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                {/* Transfer type selector */}
                                <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
                                    <button
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${transferType === 'between' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        onClick={() => setTransferType('between')}
                                    >
                                        <div className="flex items-center justify-center">
                                            <Repeat className="w-4 h-4 mr-2" />
                                            Between Accounts
                                        </div>
                                    </button>
                                    <button
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${transferType === 'External' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        onClick={() => setTransferType('External')}
                                    >
                                        <div className="flex items-center justify-center">
                                            <Globe className="w-4 h-4 mr-2" />
                                            External Transfer
                                        </div>
                                    </button>
                                </div>

                                {/* Transfer form */}
                                <form onSubmit={handleSubmit}>
                                    {/* From account */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                                        <div className="relative">
                                            <select
                                                className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none pr-10"
                                                value={fromAccount}
                                                onChange={(e) => setFromAccount(e.target.value)}
                                            >
                                                {accounts.map(account => (
                                                    <option key={account.AccountID} value={account.AccountID}>
                                                        {account.AccountType} Account (${parseFloat(account.Balance).toLocaleString()})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* To account - changes based on transfer type */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                        <div className="relative">
                                            {transferType === 'between' && (
                                                <select
                                                    className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none pr-10"
                                                    value={toAccount}
                                                    onChange={(e) => setToAccount(e.target.value)}
                                                >
                                                    {accounts.map(account => (
                                                        <option
                                                            key={account.AccountID}
                                                            value={account.AccountID}
                                                            disabled={account.AccountID === fromAccount}
                                                        >
                                                            {account.AccountType} Account (${parseFloat(account.Balance).toLocaleString()})
                                                        </option>
                                                    ))}
                                                </select>
                                            )}

                                            {transferType === 'External' && (
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                        placeholder="Account Number"
                                                    />
                                                </div>
                                            )}

                                            {transferType !== 'External' && (
                                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                                </div>
                                            )}
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
                                        <p className="text-xs text-gray-500 mt-1">
                                            Transfers under $100 are automatically approved.
                                        </p>
                                    </div>

                                    {/* Memo */}
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
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        disabled={!amount || (transferType === 'between' && fromAccount === toAccount)}
                                    >
                                        Transfer Now
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Recent transfers */}
                        <div className="w-full md:w-1/3">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-800">Recent Transfers</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {recentTransfers.length > 0 ? (
                                        recentTransfers.slice(0, 3).map(transfer => (
                                            <div key={transfer.id} className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="font-medium text-sm">{transfer.from}</p>
                                                            <p className="text-xs text-gray-500">to {transfer.to}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-medium text-sm">${parseFloat(transfer.amount).toFixed(2)}</p>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500">
                                                    <span>{transfer.date}</span>
                                                    <span>{transfer.status}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            No recent transfers found
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <Link href="/history" passHref>
                                        <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                            View All Transfers
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Quick tips */}
                            <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                                <h3 className="font-medium text-blue-800 mb-2">Quick Tips</h3>
                                <ul className="text-sm text-blue-700 space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>External transfers may take 1-3 business days to complete</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Transfers under $100 are processed immediately</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}