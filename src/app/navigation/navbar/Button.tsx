'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUserAuth } from '../../_utils/auth-context';

const Button = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, firebaseSignOut } = useUserAuth();

  const handleSignOut = async () => {
    await firebaseSignOut();
    setIsUserMenuOpen(false);
  };

  if (user) {
    // User is authenticated - show user menu
    return (
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User'}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {(user.displayName || user.email).charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-white font-medium hidden md:block">
            {user.displayName || 'User'}
          </span>
          <svg className={`w-4 h-4 text-white transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* User Dropdown Menu */}
        {isUserMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {(user.displayName || user.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {user.displayName || 'Calgary User'}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <Link
                href="/profile"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-gray-700 group-hover:text-blue-600">Profile</span>
              </Link>

              <Link
                href="/ask"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700 group-hover:text-blue-600">My Questions</span>
              </Link>

              <Link
                href="/admin/users"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-gray-700 group-hover:text-blue-600">Admin Panel</span>
                <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">New</span>
              </Link>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 group"
                >
                  <svg className="w-5 h-5 text-gray-400 mr-3 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-gray-700 group-hover:text-red-600">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Sign In Button */}
        <Link 
          href="/login"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Sign In
        </Link>

        {/* Get Started Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Get Started
            <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              <div className="p-2">
                <Link
                  href="/ask"
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <span className="text-xl">💬</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      Ask Calgary
                    </div>
                    <div className="text-sm text-gray-500">
                      Get answers from locals
                    </div>
                  </div>
                </Link>

                <Link
                  href="/blog/insert"
                  className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 group"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <span className="text-xl">✍️</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-green-600">
                      Share Your Story
                    </div>
                    <div className="text-sm text-gray-500">
                      Write for the community
                    </div>
                  </div>
                </Link>

                <Link
                  href="/blog"
                  className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200 group"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                    <span className="text-xl">📖</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-purple-600">
                      Browse Stories
                    </div>
                    <div className="text-sm text-gray-500">
                      Discover Calgary content
                    </div>
                  </div>
                </Link>

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Link
                    href="/blog/about"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    📍 About Calgary
                  </Link>
                  <Link
                    href="/blog/contact"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    📧 Contact Us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for closing dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Button;