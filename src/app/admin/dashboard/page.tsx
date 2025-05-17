// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import {
    Users,
    CreditCard,
    DollarSign,
    AlertCircle,
    Clock,
    Activity,
    ChevronRight,
    Plus
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin-sidebar';
import Header from '@/components/admin-header';

interface User {
    UserID: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Role: string;
    Status: string;
    AccountOpenDate: string;
}

interface Account {
    AccountID: string;
    UserID: string;
    AccountType: string;
    Balance: number;
    Status: string;
}

interface AuditLog {
    id: string;
    timestamp: string;
    actor_type: string;
    actor_id: string;
    action: string;
    target_id: string;
    status: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // Fetch users
                const usersResponse = await fetch('/api/admin/users', {
                    credentials: 'include'
                });
                
                // Fetch accounts
                const accountsResponse = await fetch('/api/admin/accounts', {
                    credentials: 'include'
                });
                
                // Fetch recent audit logs
                const auditResponse = await fetch('/api/admin/audit?limit=5', {
                    credentials: 'include'
                });

                // Check for authentication errors
                if (usersResponse.status === 401 || accountsResponse.status === 401 || auditResponse.status === 401) {
                    console.error('Authentication error: user is not authorized');
                    setError('Authentication failed. Please log in again.');
                    router.push('/auth/login');
                    return;
                }

                if (!usersResponse.ok || !accountsResponse.ok || !auditResponse.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const [usersData, accountsData, auditData] = await Promise.all([
                    usersResponse.json(),
                    accountsResponse.json(),
                    auditResponse.json()
                ]);

                setUsers(usersData.users);
                setAccounts(accountsData.accounts);
                setAuditLogs(auditData.logs);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to load dashboard data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = [
        {
            title: "Total Users",
            value: users.length,
            icon: <Users className="w-6 h-6 text-blue-500" />,
            link: "/admin/users"
        },
        {
            title: "Active Accounts",
            value: accounts.filter(acc => acc.Status === 'Active').length,
            icon: <CreditCard className="w-6 h-6 text-green-500" />,
            link: "/admin/accounts"
        },
        {
            title: "Recent Activities",
            value: auditLogs.length,
            icon: <Activity className="w-6 h-6 text-purple-500" />,
            link: "/admin/audit"
        }
    ];

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <main className="flex-1 md:ml-64">
                    <Header setIsMenuOpen={setIsMenuOpen} />
                    <div className="p-4 md:p-6 flex items-center justify-center h-screen">
                        <p className="text-gray-600">Loading dashboard data...</p>
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
                    <Header setIsMenuOpen={setIsMenuOpen} />
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
                <Header setIsMenuOpen={setIsMenuOpen} />

                {/* Dashboard content */}
                <div className="p-4 md:p-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                        <p className="mt-1 text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your bank today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <Link href={stat.link} key={index}>
                                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                            <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded-lg">
                                            {stat.icon}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Users and Accounts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Users */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
                                    <Link href="/admin/users/add" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add User
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.length > 0 ? (
                                            users.slice(0, 5).map((user) => (
                                                <tr key={user.UserID}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-900">
                                                            {user.FirstName} {user.LastName}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {user.Email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            user.Role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                                                            user.Role === 'Officer' ? 'bg-blue-100 text-blue-800' : 
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                            {user.Role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <Link href={`/admin/users/${user.UserID}`} className="text-blue-600 hover:text-blue-900">
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No users found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-800">
                                    View all users
                                </Link>
                            </div>
                        </div>

                        {/* Recent Audit Logs */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
                                    <Link href="/admin/audit" className="text-sm text-blue-600 hover:text-blue-800">
                                        View All
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {auditLogs.length > 0 ? (
                                        auditLogs.map((log) => (
                                            <div key={log.id} className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <Activity className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm text-gray-600">
                                                        {log.action}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(log.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-sm text-gray-500">No recent activities found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}