'use client';

import Link from "next/link";
import { JSX, useState } from "react";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuSections = [
    {
      title: "Navigation",
      icon: "🧭",
      items: [
        { name: "Home", href: "/", icon: "🏠", description: "Back to homepage" },
        { name: "All Posts", href: "/blog/posts", icon: "📖", description: "Browse stories" },
        { name: "Ask Calgary", href: "/ask", icon: "❓", description: "Community Q&A", badge: "Popular" }
      ]
    },
    {
      title: "Community",
      icon: "👥",
      items: [
        { name: "Popular Posts", href: "/blog/popular", icon: "🔥", description: "Most read" },
        { name: "Recent Stories", href: "/blog/recent", icon: "📰", description: "Latest updates" },
        { name: "Local Events", href: "/events", icon: "🎉", description: "What's happening" }
      ]
    },
    {
      title: "Categories",
      icon: "📂",
      items: [
        { name: "Food & Dining", href: "/blog/category/food", icon: "🍽️", description: "YYC food scene" },
        { name: "Events", href: "/blog/category/events", icon: "🎪", description: "Calgary events" },
        { name: "Transportation", href: "/blog/category/transport", icon: "🚌", description: "Transit info" },
        { name: "Weather", href: "/blog/category/weather", icon: "🌤️", description: "Calgary weather" }
      ]
    },
    {
      title: "Connect",
      icon: "🤝",
      items: [
        { name: "About Calgary", href: "/blog/about", icon: "ℹ️", description: "Learn about us" },
        { name: "Contact", href: "/blog/contact", icon: "📧", description: "Get in touch" },
        { name: "Share Story", href: "/blog/insert", icon: "✍️", description: "Write for us" }
      ]
    }
  ];

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  const handleLinkClick = () => {
    toggle();
    setExpandedSection(null);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggle}
      />
      
      {/* Sidebar */}
      <div
        className={`absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">YYC</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Calgary Hub</h2>
              <p className="text-blue-300 text-sm">Community Menu</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className="p-2 text-white hover:text-blue-300 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Calgary stories..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-1">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    expandedSection === section.title ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded Section */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSection === section.title ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
                    >
                      <span className="mr-3 text-base">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium truncate">{item.name}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                          {item.description}
                        </p>
                      </div>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/ask"
            onClick={handleLinkClick}
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center font-medium"
          >
            <span className="mr-2">💬</span>
            Ask Calgary
          </Link>
          
          <div className="flex space-x-2">
            <Link
              href="/blog/insert"
              onClick={handleLinkClick}
              className="flex-1 bg-white/10 text-white py-2 px-3 rounded-lg hover:bg-white/20 transition-all duration-200 text-center text-sm font-medium"
            >
              ✍️ Write
            </Link>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="flex-1 bg-white/10 text-white py-2 px-3 rounded-lg hover:bg-white/20 transition-all duration-200 text-center text-sm font-medium"
            >
              👤 Sign In
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017.017z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;