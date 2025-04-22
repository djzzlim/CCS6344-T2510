"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Lock, Shield, Smartphone, Users, CreditCard, PiggyBank, Building, Menu, X } from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  const features = [
    { 
      icon: <CreditCard className="w-10 h-10 text-blue-600" />, 
      title: "Modern Banking",
      description: "Access your accounts anytime, anywhere with our secure online platform."
    },
    { 
      icon: <Shield className="w-10 h-10 text-blue-600" />, 
      title: "Advanced Security",
      description: "Rest easy with our state-of-the-art encryption and fraud monitoring systems."
    },
    { 
      icon: <Smartphone className="w-10 h-10 text-blue-600" />, 
      title: "Mobile Banking",
      description: "Manage your finances on the go with our feature-rich mobile application."
    },
    { 
      icon: <PiggyBank className="w-10 h-10 text-blue-600" />, 
      title: "Smart Savings",
      description: "Reach your financial goals faster with our competitive savings options."
    }
  ];

  const toggleDropdown = (index: number) => {
    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }
  };

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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <div className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-blue-600" 
                  onClick={() => toggleDropdown(0)}
                >
                  <span>Personal Banking</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === 0 && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Checking Accounts</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Savings Accounts</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Credit Cards</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Loans</a>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-blue-600" 
                  onClick={() => toggleDropdown(1)}
                >
                  <span>Business Banking</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === 1 && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business Checking</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business Loans</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Merchant Services</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Treasury Management</a>
                    </div>
                  </div>
                )}
              </div>
              <a href="#" className="text-gray-700 hover:text-blue-600">About Us</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">Login</a>
              <a href="/auth/register" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Register
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="pt-2 pb-4 space-y-1 px-4">
              <div className="py-2 border-b border-gray-200">
                <button className="w-full flex items-center justify-between text-gray-700" onClick={() => toggleDropdown(0)}>
                  <span>Personal Banking</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === 0 && (
                  <div className="mt-2 pl-4 space-y-2">
                    <a href="#" className="block text-sm text-gray-700">Checking Accounts</a>
                    <a href="#" className="block text-sm text-gray-700">Savings Accounts</a>
                    <a href="#" className="block text-sm text-gray-700">Credit Cards</a>
                    <a href="#" className="block text-sm text-gray-700">Loans</a>
                  </div>
                )}
              </div>
              <div className="py-2 border-b border-gray-200">
                <button className="w-full flex items-center justify-between text-gray-700" onClick={() => toggleDropdown(1)}>
                  <span>Business Banking</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === 1 && (
                  <div className="mt-2 pl-4 space-y-2">
                    <a href="#" className="block text-sm text-gray-700">Business Checking</a>
                    <a href="#" className="block text-sm text-gray-700">Business Loans</a>
                    <a href="#" className="block text-sm text-gray-700">Merchant Services</a>
                    <a href="#" className="block text-sm text-gray-700">Treasury Management</a>
                  </div>
                )}
              </div>
              <a href="#" className="block py-2 text-gray-700 border-b border-gray-200">About Us</a>
              <a href="#" className="block py-2 text-gray-700 border-b border-gray-200">Contact</a>
              <div className="pt-4 flex flex-col space-y-3">
                <a href="/auth/login" className="text-blue-600 font-medium">Login</a>
                <a href="/auth/register" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Banking Made Simple</h2>
              <p className="text-lg md:text-xl mb-6 text-blue-100">Experience the future of banking with our secure, intuitive, and feature-rich platform.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="/auth/register" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-blue-50">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="/auth/login" className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-md text-base font-medium text-white hover:bg-blue-600">
                  <Lock className="mr-2 w-5 h-5" />
                  Login to Account
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <Image src="dashboard_preview.png" alt="Banking Interface Preview" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose BankApp?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized service to provide you with the best banking experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
                <p className="text-blue-100 mb-6">Open an account in minutes and start enjoying our comprehensive banking services right away.</p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <a href="/auth/register" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-blue-50">
                    Open an Account
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-md text-base font-medium text-white hover:bg-blue-800">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="hidden md:block relative">
                <Image src="https://i2.wp.com/omoto.io/academy/wp-content/uploads/2017/11/bank-1-e1523369101984.jpg?ssl=1" alt="Happy banking customer" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">John D.</h4>
                  <p className="text-sm text-gray-500">Personal Banking Customer</p>
                </div>
              </div>
              <p className="text-gray-600">&quot;The mobile app is incredibly intuitive. I can manage all my accounts, transfer funds, and pay bills in just a few taps.&quot;</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600">&quot;Their business banking solutions have streamlined our financial operations. The customer service is exceptional when we need assistance.&quot;</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-500">Personal Banking Customer</p>
                </div>
              </div>
              <p className="text-gray-600">&quot;The security features give me peace of mind. I appreciate how they&apos;ve integrated modern technology while maintaining user privacy.&quot;</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BankApp</h3>
              <p className="text-gray-400">Secure, modern banking for everyone.</p>
              <div className="mt-4 flex space-x-4">
                {/* Social Media Icons */}
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Checking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Savings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Credit Cards</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Loans</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mortgages</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mobile App</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Financial Education</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Branch Locator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Investor Relations</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between">
              <p className="text-gray-400">© 2025 BankApp. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}