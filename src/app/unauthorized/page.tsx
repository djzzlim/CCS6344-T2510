"use client";

import { Home, ArrowLeft, ShieldOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Home</Link>
              <a href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">Login</a>
            </div>
          </div>
        </div>
      </header>

      {/* Unauthorized Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-lg w-full px-4">
          <div className="text-center">
            <div className="inline-flex mb-8">
              <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <ShieldOff className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-600 mb-8">
              You don&apos;t have the required permissions to access this page. Please contact your administrator if you believe this is an error.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© 2025 BankApp. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Help Center
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
