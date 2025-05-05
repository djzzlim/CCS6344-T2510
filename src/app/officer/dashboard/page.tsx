"use client";

import { useState } from 'react';
import { Shield, User, CheckCircle, Clock, Search, ArrowLeft, XCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/officer-header';
import Sidebar from '@/components/officer-sidebar';

export default function OfficerDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock data for pending approval transactions
  const pendingTransactions = [
    { 
      id: 'TRX-78952', 
      customerName: 'Michael Thompson', 
      customerId: 'CUS-45621',
      accountNumber: '****7845',
      amount: 9750.00, 
      type: 'Wire Transfer', 
      initiatedDate: 'Today 10:23 AM',
      status: 'pending',
      riskScore: 'medium',
      notes: 'Customer stated funds are for property down payment.',
      destination: 'First National Bank - #45781236'
    },
    { 
      id: 'TRX-78953', 
      customerName: 'Jennifer Wilson', 
      customerId: 'CUS-32145',
      accountNumber: '****3298',
      amount: 15200.00, 
      type: 'ACH Transfer', 
      initiatedDate: 'Today 09:17 AM',
      status: 'pending',
      riskScore: 'high',
      notes: 'First transaction of this size for this account.',
      destination: 'United Investment Group - #78459621'
    },
    { 
      id: 'TRX-78939', 
      customerName: 'Robert Garcia', 
      customerId: 'CUS-78942',
      accountNumber: '****4571',
      amount: 8200.00, 
      type: 'External Transfer', 
      initiatedDate: 'Yesterday 04:45 PM',
      status: 'pending',
      riskScore: 'low',
      notes: 'Regular monthly transfer to investment account.',
      destination: 'Vanguard Brokerage - #12457896'
    },
  ];

  // Mock data for recent approvals/rejections
  const recentTransactions = [
    { 
      id: 'TRX-78925', 
      customerName: 'Elizabeth Martinez', 
      customerId: 'CUS-78521',
      accountNumber: '****1245',
      amount: 12450.00, 
      type: 'Wire Transfer', 
      date: 'Today 08:45 AM',
      status: 'approved',
      approvedBy: 'Jane Smith',
      notes: 'Customer provided invoice documentation.'
    },
    { 
      id: 'TRX-78913', 
      customerName: 'Andrew Johnson', 
      customerId: 'CUS-12458',
      accountNumber: '****7896',
      amount: 7500.00, 
      type: 'ACH Transfer', 
      date: 'Yesterday 03:30 PM',
      status: 'rejected',
      approvedBy: 'John Davis',
      notes: 'Suspicious activity pattern detected. Customer contacted for verification.'
    },
    { 
      id: 'TRX-78905', 
      customerName: 'Sarah Williams', 
      customerId: 'CUS-45698',
      accountNumber: '****4521',
      amount: 11200.00, 
      type: 'External Transfer', 
      date: 'Yesterday 02:15 PM',
      status: 'approved',
      approvedBy: 'Jane Smith',
      notes: 'Regular business expense pattern.'
    },
  ];

  // Mock customer data
  const customerData = {
    'CUS-45621': {
      id: 'CUS-45621',
      name: 'Michael Thompson',
      email: 'michael.thompson@example.com',
      phone: '(555) 123-4567',
      address: '123 Oak Street, Springfield, IL 62704',
      accountOpenDate: 'March 15, 2018',
      kycStatus: 'Verified',
      riskRating: 'Low',
      transactionHistory: [
        { id: 'TRX-75482', date: 'Apr 20, 2025', amount: 5000.00, type: 'Wire Transfer', status: 'Completed' },
        { id: 'TRX-72145', date: 'Mar 15, 2025', amount: 7500.00, type: 'Wire Transfer', status: 'Completed' },
        { id: 'TRX-69874', date: 'Feb 28, 2025', amount: 3200.00, type: 'ACH Transfer', status: 'Completed' },
      ],
      accounts: [
        { number: '****7845', type: 'Checking', balance: 24500.00 },
        { number: '****9654', type: 'Savings', balance: 45600.00 }
      ],
      notes: 'Premium customer. Works as senior engineer at TechCorp.'
    },
    'CUS-32145': {
      id: 'CUS-32145',
      name: 'Jennifer Wilson',
      email: 'jennifer.wilson@example.com',
      phone: '(555) 987-6543',
      address: '456 Maple Avenue, Riverside, CA 92501',
      accountOpenDate: 'January 7, 2020',
      kycStatus: 'Pending Additional Verification',
      riskRating: 'Medium',
      transactionHistory: [
        { id: 'TRX-76985', date: 'Apr 18, 2025', amount: 2000.00, type: 'ACH Transfer', status: 'Completed' },
        { id: 'TRX-73654', date: 'Apr 10, 2025', amount: 1500.00, type: 'External Transfer', status: 'Completed' },
        { id: 'TRX-70215', date: 'Mar 25, 2025', amount: 3000.00, type: 'Wire Transfer', status: 'Completed' },
      ],
      accounts: [
        { number: '****3298', type: 'Checking', balance: 18750.00 },
        { number: '****4521', type: 'Investment', balance: 32400.00 }
      ],
      notes: 'New business account. Customer owns Wilson Consulting LLC.'
    },
    'CUS-78942': {
      id: 'CUS-78942',
      name: 'Robert Garcia',
      email: 'robert.garcia@example.com',
      phone: '(555) 456-7890',
      address: '789 Pine Street, Portland, OR 97205',
      accountOpenDate: 'October 12, 2015',
      kycStatus: 'Verified',
      riskRating: 'Low',
      transactionHistory: [
        { id: 'TRX-77456', date: 'Apr 15, 2025', amount: 8200.00, type: 'External Transfer', status: 'Completed' },
        { id: 'TRX-74123', date: 'Mar 15, 2025', amount: 8200.00, type: 'External Transfer', status: 'Completed' },
        { id: 'TRX-70987', date: 'Feb 15, 2025', amount: 8200.00, type: 'External Transfer', status: 'Completed' },
      ],
      accounts: [
        { number: '****4571', type: 'Checking', balance: 15800.00 },
        { number: '****6542', type: 'Savings', balance: 67500.00 }
      ],
      notes: 'Long-term customer. Monthly investment transfers to retirement account.'
    }
  };

  const handleApprove = (transactionId) => {
    // Logic to approve transaction would go here
    alert(`Transaction ${transactionId} approved`);
    setSelectedTransaction(null);
  };

  const handleReject = (transactionId) => {
    // Logic to reject transaction would go here
    alert(`Transaction ${transactionId} rejected`);
    setSelectedTransaction(null);
  };

  const handleViewCustomer = (customerId) => {
    setShowCustomerDetails(true);
  };

  const filteredTransactions = (activeTab === 'pending' ? pendingTransactions : recentTransactions)
    .filter(transaction => {
      // Filter by search term
      const searchMatch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status
      const statusMatch = filterStatus === 'all' || transaction.status === filterStatus;
      
      return searchMatch && statusMatch;
    });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <Header title="Transaction Queue" setIsMenuOpen={setIsMenuOpen} />

        {/* Tab navigation */}
        <div className="bg-white shadow-sm">
          <div className="px-4 flex">
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 ${activeTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approval
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 ${activeTab === 'recent' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('recent')}
            >
              Recent Activity
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4">
          {!selectedTransaction && !showCustomerDetails ? (
            <div className="bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-semibold">
                              {transaction.customerName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-900">{transaction.customerName}</div>
                              <div className="text-sm text-gray-500">{transaction.accountNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${transaction.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.initiatedDate || transaction.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              transaction.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {transaction.status === 'pending' ? 
                              <Clock className="w-3 h-3 mr-1 mt-0.5" /> : 
                              transaction.status === 'approved' ? 
                              <CheckCircle className="w-3 h-3 mr-1 mt-0.5" /> : 
                              <XCircle className="w-3 h-3 mr-1 mt-0.5" />
                            }
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No transactions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : selectedTransaction ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <button 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedTransaction(null)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Transactions
                </button>
                <div className="flex space-x-3">
                  {selectedTransaction.status === 'pending' && (
                    <>
                      <button 
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleReject(selectedTransaction.id)}
                      >
                        Reject
                      </button>
                      <button 
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        onClick={() => handleApprove(selectedTransaction.id)}
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Transaction Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p className="font-medium">{selectedTransaction.id}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Transaction Type</p>
                      <p className="font-medium">{selectedTransaction.type}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-lg">${selectedTransaction.amount.toLocaleString()}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{selectedTransaction.initiatedDate || selectedTransaction.date}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          selectedTransaction.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                      </span>
                    </div>
                    {selectedTransaction.riskScore && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Risk Score</p>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${selectedTransaction.riskScore === 'low' ? 'bg-green-100 text-green-800' : 
                            selectedTransaction.riskScore === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {selectedTransaction.riskScore.charAt(0).toUpperCase() + selectedTransaction.riskScore.slice(1)}
                        </span>
                      </div>
                    )}
                    {selectedTransaction.destination && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-medium">{selectedTransaction.destination}</p>
                      </div>
                    )}
                    {selectedTransaction.approvedBy && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Reviewed By</p>
                        <p className="font-medium">{selectedTransaction.approvedBy}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{selectedTransaction.customerName}</p>
                      <p className="text-sm text-gray-500">ID: {selectedTransaction.customerId}</p>
                      <p className="text-sm text-gray-500">Account: {selectedTransaction.accountNumber}</p>
                    </div>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleViewCustomer(selectedTransaction.customerId)}
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{selectedTransaction.notes}</p>
                </div>
              </div>
            </div>
          ) : showCustomerDetails && selectedTransaction && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <button 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setShowCustomerDetails(false)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Transaction
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Profile: {customerData[selectedTransaction.customerId].name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Customer ID</p>
                        <p className="font-medium">{customerData[selectedTransaction.customerId].id}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{customerData[selectedTransaction.customerId].email}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{customerData[selectedTransaction.customerId].phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{customerData[selectedTransaction.customerId].address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Risk & Compliance</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Account Open Date</p>
                        <p className="font-medium">{customerData[selectedTransaction.customerId].accountOpenDate}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">KYC Status</p>
                        <p className="font-medium">{customerData[selectedTransaction.customerId].kycStatus}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Risk Rating</p>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${customerData[selectedTransaction.customerId].riskRating === 'Low' ? 'bg-green-100 text-green-800' : 
                            customerData[selectedTransaction.customerId].riskRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {customerData[selectedTransaction.customerId].riskRating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Account Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customerData[selectedTransaction.customerId].accounts.map((account, index) => (
                        <div key={index} className="border border-gray-200 rounded p-3">
                          <p className="font-medium">{account.type}</p>
                          <p className="text-sm text-gray-500">{account.number}</p>
                          <p className="font-medium text-lg mt-2">${account.balance.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Transaction History</h3>
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                          <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerData[selectedTransaction.customerId].transactionHistory.map((transaction, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-600">{transaction.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">${transaction.amount.toLocaleString()}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Officer Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm mb-4">{customerData[selectedTransaction.customerId].notes}</p>
                    <div>
                      <textarea 
                        className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Add additional notes about this customer..."
                      ></textarea>
                      <div className="mt-2 flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Save Notes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}