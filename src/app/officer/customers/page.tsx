"use client";

import { useState, useEffect } from 'react';
import Sidebar from '@/components/officer-sidebar';
import Header from '@/components/officer-header';
import CustomerDetails from '@/components/customer-details';

export default function CustomerDatabase() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch customers based on search term
    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/customers?search=${debouncedSearchTerm}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setCustomers(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching customers:', err);
                setError('Failed to load customer data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomers();
    }, [debouncedSearchTerm]);

    // Fetch customer details when selected
    useEffect(() => {
        if (selectedCustomer?.id) {
            const fetchCustomerDetails = async () => {
                try {
                    const response = await fetch(`/api/customers/${selectedCustomer.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch customer details');
                    }
                    const data = await response.json();
                    setSelectedCustomer(data);
                } catch (err) {
                    console.error('Error fetching customer details:', err);
                    setError('Failed to load customer details. Please try again later.');
                }
            };

            fetchCustomerDetails();
        }
    }, [selectedCustomer?.id]);

    // Handler for selecting a customer
    const handleSelectCustomer = (customer) => {
        setSelectedCustomer({ id: customer.id }); // Only pass the ID initially
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
                {/* Header */}
                <Header
                    title="Customers"
                    setIsMenuOpen={setIsMenuOpen}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {/* Main content area */}
                <div className="flex-1 overflow-auto p-4">
                    {isLoading && !selectedCustomer ? (
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-600">Loading customers...</p>
                        </div>
                    ) : error && !selectedCustomer ? (
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : !selectedCustomer ? (
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
                                    {customers.length > 0 ? (
                                        customers.map((customer) => (
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
                                                        onClick={() => handleSelectCustomer(customer)}
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
                        <CustomerDetails 
                            title='Customer List'
                            selectedCustomer={selectedCustomer} 
                            setSelectedCustomer={setSelectedCustomer}
                            isLoading={isLoading}
                            error={error}
                        />
                    )}
                </div>
            </div>
        </div>
    )
};