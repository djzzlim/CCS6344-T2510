"use client";

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Repeat, Users, Globe, Plus } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Transfers() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [transferType, setTransferType] = useState('between');
    const [fromAccount, setFromAccount] = useState('1');
    const [toAccount, setToAccount] = useState('2');
    const [amount, setAmount] = useState('');
    const [transferDate, setTransferDate] = useState('now');
    const [memo, setMemo] = useState('');
    const [recipient, setRecipient] = useState('');
    
    // Contact modal states
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone: '',
        bank: '',
        routingNumber: '',
        accountNumber: ''
    });

    const accounts = [
        { id: '1', name: "Checking Account", number: "****5678", balance: 4256.78 },
        { id: '2', name: "Savings Account", number: "****9012", balance: 12785.45 },
    ];

    const [savedContacts, setSavedContacts] = useState([
        { id: 1, name: "James Smith", bank: "Chase Bank", account: "****4321" },
        { id: 2, name: "Emily Johnson", bank: "Wells Fargo", account: "****7654" },
        { id: 3, name: "Michael Brown", bank: "Bank of America", account: "****9876" },
    ]);

    const recentTransfers = [
        { id: 1, from: "Checking Account", to: "Savings Account", amount: 500, date: "Apr 20, 2025", status: "Completed" },
        { id: 2, from: "Savings Account", to: "Checking Account", amount: 1200, date: "Apr 10, 2025", status: "Completed" },
        { id: 3, from: "Checking Account", to: "James Smith", amount: 75, date: "Apr 5, 2025", status: "Completed" },
        { id: 4, from: "Checking Account", to: "Savings Account", amount: 300, date: "Mar 27, 2025", status: "Completed" },
    ];

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle transfer submission logic here
        alert(`Transfer submitted: $${amount} from ${accounts.find(acc => acc.id === fromAccount)?.name} to ${transferType === 'between' ? accounts.find(acc => acc.id === toAccount)?.name : 'External Account'}`);
    };

    const handleRecipientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setRecipient(value);
        if (value === "new") {
            // Open the modal when "Add New Contact" is selected
            setIsContactModalOpen(true);
            // Reset the recipient dropdown
            setTimeout(() => setRecipient(''), 0);
        }
    };

    const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewContact(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddContact = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        // Create new contact
        const newContactEntry = {
            id: savedContacts.length + 1,
            name: newContact.name,
            bank: newContact.bank,
            account: `****${newContact.accountNumber.slice(-4)}`,
        };
        
        // Add to contacts list
        setSavedContacts([...savedContacts, newContactEntry]);
        
        // Reset form and close modal
        setNewContact({
            name: '',
            email: '',
            phone: '',
            bank: '',
            routingNumber: '',
            accountNumber: ''
        });
        setIsContactModalOpen(false);
        
        // Show confirmation
        alert(`Contact ${newContactEntry.name} has been added successfully!`);
    };

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
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${transferType === 'someone' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        onClick={() => setTransferType('someone')}
                                    >
                                        <div className="flex items-center justify-center">
                                            <Users className="w-4 h-4 mr-2" />
                                            To Someone
                                        </div>
                                    </button>
                                    <button
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${transferType === 'external' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                                        onClick={() => setTransferType('external')}
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
                                                        <option key={account.id} value={account.id} disabled={account.id === fromAccount}>
                                                            {account.name} (${account.balance.toLocaleString()})
                                                        </option>
                                                    ))}
                                                </select>
                                            )}

                                            {transferType === 'someone' && (
                                                <select 
                                                    className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none pr-10"
                                                    value={recipient}
                                                    onChange={handleRecipientChange}
                                                >
                                                    <option value="">Select a contact</option>
                                                    {savedContacts.map(contact => (
                                                        <option key={contact.id} value={contact.id}>
                                                            {contact.name} - {contact.bank} ({contact.account})
                                                        </option>
                                                    ))}
                                                    <option value="new">+ Add New Contact</option>
                                                </select>
                                            )}

                                            {transferType === 'external' && (
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                        placeholder="Bank Name"
                                                    />
                                                    <input
                                                        type="text"
                                                        className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                        placeholder="Routing Number"
                                                    />
                                                    <input
                                                        type="text"
                                                        className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                        placeholder="Account Number"
                                                    />
                                                </div>
                                            )}

                                            {transferType !== 'external' && (
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
                                    </div>

                                    {/* Transfer date */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">When</label>
                                        <div className="flex space-x-3">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="now"
                                                    name="transferDate"
                                                    value="now"
                                                    checked={transferDate === 'now'}
                                                    onChange={() => setTransferDate('now')}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <label htmlFor="now" className="ml-2 text-sm text-gray-700">Now</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="scheduled"
                                                    name="transferDate"
                                                    value="scheduled"
                                                    checked={transferDate === 'scheduled'}
                                                    onChange={() => setTransferDate('scheduled')}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <label htmlFor="scheduled" className="ml-2 text-sm text-gray-700">Schedule</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="recurring"
                                                    name="transferDate"
                                                    value="recurring"
                                                    checked={transferDate === 'recurring'}
                                                    onChange={() => setTransferDate('recurring')}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <label htmlFor="recurring" className="ml-2 text-sm text-gray-700">Recurring</label>
                                            </div>
                                        </div>

                                        {transferDate === 'scheduled' && (
                                            <div className="mt-3">
                                                <input
                                                    type="date"
                                                    className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        )}

                                        {transferDate === 'recurring' && (
                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                <select className="p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none">
                                                    <option>Weekly</option>
                                                    <option>Bi-weekly</option>
                                                    <option>Monthly</option>
                                                    <option>Quarterly</option>
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
                                        disabled={!amount || (transferType === 'between' && fromAccount === toAccount)}
                                    >
                                        Continue
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
                                    {recentTransfers.map(transfer => (
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
                                                <p className="font-medium text-sm">${transfer.amount}</p>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>{transfer.date}</span>
                                                <span>{transfer.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                        View All Transfers
                                    </button>
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
                                        <span>You can save contacts for frequent transfers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Set up recurring transfers for regular expenses</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Contact Dialog using shadcn/ui */}
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Contact</DialogTitle>
                        <DialogDescription>
                            Add a contact&apos;s details to make future transfers easier.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleAddContact}>
                        <div className="grid gap-6 py-4">
                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm text-gray-700">Contact Information</h4>
                                
                                <div className="grid gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Full Name"
                                            value={newContact.name}
                                            onChange={handleContactInputChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email (Optional)</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="email@example.com"
                                            value={newContact.email}
                                            onChange={handleContactInputChange}
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone (Optional)</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="(123) 456-7890"
                                            value={newContact.phone}
                                            onChange={handleContactInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bank Information */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm text-gray-700">Bank Information</h4>
                                
                                <div className="grid gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="bank">Bank Name</Label>
                                        <Input
                                            id="bank"
                                            name="bank"
                                            placeholder="Bank Name"
                                            value={newContact.bank}
                                            onChange={handleContactInputChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="routingNumber">Routing Number</Label>
                                        <Input
                                            id="routingNumber"
                                            name="routingNumber"
                                            placeholder="9 digit number"
                                            value={newContact.routingNumber}
                                            onChange={handleContactInputChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="accountNumber">Account Number</Label>
                                        <Input
                                            id="accountNumber"
                                            name="accountNumber"
                                            placeholder="Account Number"
                                            value={newContact.accountNumber}
                                            onChange={handleContactInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <DialogFooter>
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsContactModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Contact
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}