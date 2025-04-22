// app/admin/dashboard/page.tsx
"use client";

import { useState } from 'react';
import {
    Users,
    CreditCard,
    DollarSign,
    AlertCircle,
    Clock,
    Activity,
    ChevronRight,
    BellRing,
    Search,
    LogOut,
    Settings,
    User
} from 'lucide-react';

export default function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for the dashboard
    const stats = [
        { title: "Active Users", value: "12,493", icon: <Users className="w-6 h-6 text-blue-500" />, change: "+12%" },
        { title: "New Accounts", value: "294", icon: <CreditCard className="w-6 h-6 text-green-500" />, change: "+18%" },
        { title: "Transaction Volume", value: "$1.2M", icon: <DollarSign className="w-6 h-6 text-purple-500" />, change: "+5%" },
        { title: "Pending Approvals", value: "18", icon: <Clock className="w-6 h-6 text-orange-500" />, change: "-3%" }
    ];

    const alerts = [
        { id: 1, type: "warning", message: "Unusual login activity detected from IP 192.168.1.43", time: "10 minutes ago" },
        { id: 2, type: "info", message: "System update scheduled for April 25, 2025 at 02:00 UTC", time: "1 hour ago" },
        { id: 3, type: "error", message: "Payment processing service reported intermittent issues", time: "3 hours ago" }
    ];

    const recentUsers = [
        { id: 1, name: "Jennifer Wilson", email: "jwilson@example.com", status: "active", joinDate: "Apr 20, 2025" },
        { id: 2, name: "Marcus Chen", email: "mchen@example.com", status: "active", joinDate: "Apr 19, 2025" },
        { id: 3, name: "Sophia Rodriguez", email: "srodriguez@example.com", status: "pending", joinDate: "Apr 18, 2025" },
        { id: 4, name: "Liam Johnson", email: "ljohnson@example.com", status: "active", joinDate: "Apr 18, 2025" }
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 border-b">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">BankApp Admin</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <button className="text-gray-500 hover:text-gray-700">
                                <BellRing className="h-6 w-6" />
                            </button>

                            <div className="border-l pl-4 flex items-center h-10 gap-x-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="font-medium">Admin User</span>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <Settings className="h-5 w-5" />
                                </button>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="flex space-x-6 py-4">
                        <a href="/admin/dashboard" className="text-blue-600 border-b-2 border-blue-600 pb-4 font-medium">Dashboard</a>
                        <a href="/admin/users" className="text-gray-600 hover:text-gray-800">Users</a>
                        <a href="/admin/transactions" className="text-gray-600 hover:text-gray-800">Transactions</a>
                        <a href="/admin/accounts" className="text-gray-600 hover:text-gray-800">Accounts</a>
                        <a href="/admin/reports" className="text-gray-600 hover:text-gray-800">Reports</a>
                        <a href="/admin/settings" className="text-gray-600 hover:text-gray-800">Settings</a>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                    <p className="mt-1 text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your bank today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <Activity className="w-4 h-4 text-gray-500 mr-1" />
                                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change} from last week
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Users */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Join Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.joinDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <a href={`/admin/users/${user.id}`} className="text-blue-600 hover:text-blue-800">
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200">
                            <a href="/admin/users" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                View all users
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">System Alerts</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="flex">
                                    <div className={`flex-shrink-0 mr-3 mt-1 ${alert.type === 'warning' ? 'text-yellow-500' :
                                            alert.type === 'error' ? 'text-red-500' : 'text-blue-500'
                                        }`}>
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-800">{alert.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200">
                            <a href="/admin/alerts" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                View all alerts
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}