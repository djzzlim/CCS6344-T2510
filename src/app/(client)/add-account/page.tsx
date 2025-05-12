//add-account page
"use client";

import { useState } from 'react';
import { CreditCard, Wallet, ArrowLeft, PlusCircle, Check, Loader2 } from 'lucide-react';
import Sidebar from '@/components/client-sidebar';
import Header from '@/components/client-header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddAccount() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    accountType: '',
    accountId: ''
  });

  // Generate random account ID for the UI preview
  const generateAccountId = () => {
    const prefix = accountType === 'Checking' ? 'CHK' : 'SAV';
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
    return `${prefix}-${randomDigits}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  
    try {
      // Call our API endpoint
      const response = await fetch('/api/add-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountType: formData.accountType
        }),
        credentials: 'include', // Important for including cookies in the request
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account');
      }
  
      // Success - show message and redirect after short delay
      setSuccessMessage(`Account added successfully! Account ID: ${data.account.id}`);
  
      // Wait 2 seconds then redirect
      setTimeout(() => {
        router.push('/accounts');
      }, 2000);
    } catch (err) {
      console.error('Error creating account:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  };
  
  const accountTypes = [
    { id: 'Checking', name: 'Checking Account', icon: <CreditCard className="w-6 h-6" /> },
    { id: 'Savings', name: 'Savings Account', icon: <Wallet className="w-6 h-6" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <Header setIsMenuOpen={setIsMenuOpen} />

        {/* Add Account content */}
        <div className="p-4 md:p-6">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <Link href="/accounts" className="mr-4 p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Add New Account</h1>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="max-w-md mx-auto mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 flex items-center">
              <Check className="w-5 h-5 mr-2" />
              <p>{successMessage}</p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="max-w-md mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Only show form if not in success state */}
          {!successMessage && (
            <>
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      1
                    </div>
                    <span className="text-xs mt-1 text-gray-600">Account Type</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      2
                    </div>
                    <span className="text-xs mt-1 text-gray-600">Terms</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      3
                    </div>
                    <span className="text-xs mt-1 text-gray-600">Summary</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      4
                    </div>
                    <span className="text-xs mt-1 text-gray-600">Confirm</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Choose Account Type */}
              {step === 1 && (
                <div className="max-w-md mx-auto">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Account Type</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {accountTypes.map((type) => (
                      <button
                        key={type.id}
                        className={`p-4 rounded-lg border ${accountType === type.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'} flex items-center justify-between shadow-sm hover:shadow transition-shadow`}
                        onClick={() => {
                          setAccountType(type.id);
                          setFormData(prev => ({ ...prev, accountType: type.id }));
                          setStep(2);
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accountType === type.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                            {type.icon}
                          </div>
                          <span className="ml-3 font-medium">{type.name}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border ${accountType === type.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'} flex items-center justify-center`}>
                          {accountType === type.id && <div className="w-3 h-3 rounded-full bg-white"></div>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Terms and Conditions */}
              {step === 2 && (
                <div className="max-w-md mx-auto">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Terms and Conditions</h2>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="mb-4 h-64 overflow-y-auto bg-gray-50 p-4 rounded border border-gray-200 text-sm">
                      <h3 className="font-semibold mb-2">Account Terms of Service</h3>
                      <p className="mb-2">Last updated: May 9, 2025</p>
                      
                      <h4 className="font-medium mt-4 mb-1">1. Overview</h4>
                      <p className="mb-2">These Terms of Service govern your use of our banking services and the account you&apos;re creating. By accepting these terms, you agree to be bound by these conditions.</p>
                      
                      <h4 className="font-medium mt-4 mb-1">2. Account Use</h4>
                      <p className="mb-2">Your account is intended for personal use only. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.</p>
                      
                      <h4 className="font-medium mt-4 mb-1">3. Fees and Charges</h4>
                      <p className="mb-2">Details regarding fees and charges associated with your account are provided in our Fee Schedule, available on our website.</p>
                      
                      <h4 className="font-medium mt-4 mb-1">4. Privacy Policy</h4>
                      <p className="mb-2">By creating this account, you agree to our Privacy Policy, which outlines how we collect, use, and share your personal information.</p>
                      
                      <h4 className="font-medium mt-4 mb-1">5. Electronic Statements</h4>
                      <p className="mb-2">By accepting these terms, you consent to receiving electronic statements and notices related to your account.</p>
                      
                      <h4 className="font-medium mt-4 mb-1">6. Termination</h4>
                      <p className="mb-2">We reserve the right to suspend or terminate your account at any time if we suspect unauthorized or fraudulent activity.</p>
                    </div>
                    
                    <div className="mb-6 mt-4">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={termsAccepted}
                          onChange={() => setTermsAccepted(!termsAccepted)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">I have read and agree to the Terms and Conditions</span>
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (termsAccepted) {
                            setStep(3);
                          } else {
                            alert('Please accept the Terms and Conditions to continue.');
                          }
                        }}
                        className={`px-4 py-2 rounded-md text-white ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Account Summary */}
              {step === 3 && (
                <div className="max-w-md mx-auto">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Summary</h2>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-3`}>
                        {accountType === 'Checking' && <CreditCard className="w-5 h-5" />}
                        {accountType === 'Savings' && <Wallet className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {accountType === 'Checking' ? 'Checking Account' : 'Savings Account'}
                        </h3>
                        <p className="text-sm text-gray-500">Linked to your user profile</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-6">
                      You&apos;re creating a new {accountType === 'Checking' ? 'Checking' : 'Savings'} account. 
                      A unique account ID will be generated when you proceed.
                    </p>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          // Generate account ID here before showing confirmation
                          const newAccountId = generateAccountId();
                          setFormData(prev => ({ ...prev, accountId: newAccountId }));
                          setStep(4);
                        }}
                        className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="max-w-md mx-auto">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Account Details</h2>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                    <div className="mb-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        {accountType === 'Checking' && <CreditCard className="w-5 h-5" />}
                        {accountType === 'Savings' && <Wallet className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {accountType === 'Checking' ? 'Checking Account' : 'Savings Account'}
                        </h3>
                        <p className="text-sm text-gray-500">Linked to your user profile</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Account Type:</span>
                        <span className="text-sm font-medium">
                          {accountType === 'Checking' && 'Checking Account'} 
                          {accountType === 'Savings' && 'Savings Account'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Account ID:</span>
                        <span className="text-sm font-medium">{formData.accountId}</span>
                        <span className="text-xs text-gray-400">(Preview only)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Initial Balance:</span>
                        <span className="text-sm font-medium">$0.00</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center text-green-600 mb-4">
                        <Check className="w-5 h-5 mr-2" />
                        <p className="text-sm">Terms and conditions have been accepted</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Account
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}