"use client";

import { useState } from 'react';
import { Bell, Menu, Search, User, CreditCard, ArrowDownRight, ArrowUpRight, PieChart, Clock, ChevronDown, Wallet, DollarSign, ShieldCheck, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Payments() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fromAccount, setFromAccount] = useState('1');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('now');
    const [memo, setMemo] = useState('');
    const [selectedBiller, setSelectedBiller] = useState('');

    const accounts = [
        { id: '1', name: "Checking Account", number: "****5678", balance: 4256.78 },
        { id: '2', name: "Savings Account", number: "****9012", balance: 12785.45 },
    ];

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
        { id: 4, to: "Credit Card Company", amount: 320.50, date: "Mar 5, 2025", status: "Completed" },
    ];

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle payment submission logic here
        const biller = billers.find(b => b.id === selectedBiller);
        alert(`Payment submitted: $${amount} from ${accounts.find(acc => acc.id === fromAccount)?.name} to ${biller ? biller.name : 'New Utility'}`);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <PieChart className="w-5 h-5 mr-3" />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <a href="/accounts" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <CreditCard className="w-5 h-5 mr-3" />
                                <span>Accounts</span>
                            </a>
                        </li>
                        <li>
                            <a href="/transfers" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <ArrowUpRight className="w-5 h-5 mr-3" />
                                <span>Transfers</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                                <ArrowDownRight className="w-5 h-5 mr-3" />
                                <span className="font-medium">Payments</span>
                            </a>
                        </li>
                        <li>
                            <a href="/history" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <Clock className="w-5 h-5 mr-3" />
                                <span>History</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">sarah.j@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-white">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <PieChart className="w-5 h-5 mr-3" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <a href="/accounts" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <CreditCard className="w-5 h-5 mr-3" />
                                    <span>Accounts</span>
                                </a>
                            </li>
                            <li>
                                <a href="/transfers" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <ArrowUpRight className="w-5 h-5 mr-3" />
                                    <span>Transfers</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                                    <ArrowDownRight className="w-5 h-5 mr-3" />
                                    <span className="font-medium">Payments</span>
                                </a>
                            </li>
                            <li>
                                <a href="/history" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <Clock className="w-5 h-5 mr-3" />
                                    <span>History</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            {/* Main content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="md:hidden mr-4 text-gray-500"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-semibold md:hidden">BankApp</h1>
                            <h2 className="text-xl font-semibold hidden md:block">Payments</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-500">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="text-gray-500 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 md:hidden">
                                <User className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </header>

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

                                {/* Payment form */}
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
                                                {accounts.map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.name} (${account.balance.toLocaleString()})
                                                    </option>
                                                ))}
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
                                                    <option value="new">+ Add New Utility</option>
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

                                                {selectedBiller === 'new' && (
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                            placeholder="Utility Provider Name"
                                                        />
                                                        <input
                                                            type="text"
                                                            className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                            placeholder="Account Number"
                                                        />
                                                        <input
                                                            type="text"
                                                            className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                            placeholder="Utility Provider Address"
                                                        />
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
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="recurring"
                                                    name="paymentDate"
                                                    value="recurring"
                                                    checked={paymentDate === 'recurring'}
                                                    onChange={() => setPaymentDate('recurring')}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <label htmlFor="recurring" className="ml-2 text-sm text-gray-700">Recurring</label>
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

                                        {paymentDate === 'recurring' && (
                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                <select className="p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none">
                                                    <option>Monthly</option>
                                                    <option>Bi-monthly</option>
                                                    <option>Quarterly</option>
                                                    <option>Annually</option>
                                                </select>
                                                <input
                                                    type="date"
                                                    className="p-3 bg-gray-50 border border-gray-300 rounded-lg"
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
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        disabled={!amount || !selectedBiller}
                                    >
                                        Continue
                                    </button>
                                </form>
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
                                    <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                        View All Payments
                                    </button>
                                </div>
                            </div>

                            {/* Upcoming bills */}
                            <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-800">Upcoming Bills</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {billers.slice(0, 3).map(biller => (
                                        <div key={biller.id} className="p-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                                        <Calendar className="w-4 h-4" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="font-medium text-sm">{biller.name}</p>
                                                    </div>
                                                </div>
                                                <p className="font-medium text-sm">${biller.lastAmount}</p>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>Due {biller.dueDate}</span>
                                                <button className="text-blue-600 font-medium">Pay Now</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                        View All Bills
                                    </button>
                                </div>
                            </div>

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