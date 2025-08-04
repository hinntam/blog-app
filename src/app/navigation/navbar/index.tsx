'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: "🏠"
    },
    {
      name: "Blog",
      href: "/blog",
      icon: "📖",
      dropdown: [
        { name: "All Posts", href: "/blog/posts", description: "Browse all stories" },
        { name: "Categories", href: "/blog/categories", description: "Explore by topic" },
        { name: "Popular", href: "/blog/popular", description: "Most read stories" },
        { name: "Recent", href: "/blog/recent", description: "Latest updates" }
      ]
    },
    {
      name: "Ask Calgary",
      href: "/ask",
      icon: "❓",
      badge: "New",
      dropdown: [
        { name: "Browse Questions", href: "/ask", description: "See what people are asking" },
        { name: "Ask Question", href: "/ask#new", description: "Get help from locals" },
        { name: "Popular Topics", href: "/ask/topics", description: "Trending discussions" }
      ]
    },
    {
      name: "Community",
      href: "/community",
      icon: "👥",
      dropdown: [
        { name: "About Calgary", href: "/blog/about", description: "Learn about our city" },
        { name: "Local Events", href: "/events", description: "What's happening" },
        { name: "Contact Us", href: "/blog/contact", description: "Get in touch" }
      ]
    }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-gradient-to-r from-slate-900/95 to-blue-900/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    scrolled
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-white hover:text-blue-300 hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.dropdown && (
                    <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <Link
                          key={dropIndex}
                          href={dropItem.href}
                          className="block px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group/item"
                        >
                          <div className="font-medium text-gray-900 group-hover/item:text-blue-600">
                            {dropItem.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {dropItem.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Button */}
            <button className={`p-2 rounded-lg transition-all duration-200 ${
              scrolled
                ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                : 'text-white hover:text-blue-300 hover:bg-white/10'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notification Button */}
            <button className={`relative p-2 rounded-lg transition-all duration-200 ${
              scrolled
                ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                : 'text-white hover:text-blue-300 hover:bg-white/10'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7a5 5 0 0110 0v10" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Sign In Button */}
            <Button />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
              scrolled
                ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                : 'text-white hover:text-blue-300 hover:bg-white/10'
            }`}
            onClick={toggle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (when scrolled) */}
      {scrolled && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Calgary stories..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;