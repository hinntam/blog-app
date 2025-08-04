'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AskCalgarySection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: "🗞️",
      title: "Local News",
      description: "Stay updated with the latest Calgary news and announcements",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "❓",
      title: "Ask Questions",
      description: "Get answers from fellow Calgarians about anything local",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "🤝",
      title: "Community Help",
      description: "Connect with neighbors and find local recommendations",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const recentQuestions = [
    "Best family restaurants in Kensington?",
    "Snow removal services recommendations?",
    "Where to find the best Calgary Stampede tickets?",
    "Transit updates for downtown construction?"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 -left-10 w-32 h-32 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-green-100 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ask Calgary
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">
              Community Hub
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your go-to destination for local news, community questions, and connecting with fellow Calgarians. 
            Get the information you need and share your knowledge with others.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 ${
                hoveredCard === index ? 'ring-2 ring-blue-400' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl mb-6 transform transition-transform duration-300 ${
                hoveredCard === index ? 'rotate-12 scale-110' : ''
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 rounded-2xl transition-opacity duration-300 ${
                hoveredCard === index ? 'opacity-5' : ''
              }`}></div>
            </div>
          ))}
        </div>

        {/* Main CTA Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - CTA */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Connect with Calgary?
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join thousands of Calgarians sharing knowledge, asking questions, and staying informed 
                about what matters most in our city.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/ask" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-2">🚀</span>
                  Explore Ask Calgary
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:text-gray-900 transition-all duration-300 hover:shadow-lg">
                  <span className="mr-2">📖</span>
                  Browse Questions
                </button>
              </div>
            </div>

            {/* Right side - Recent Questions Preview */}
            <div className="lg:pl-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">💬</span>
                Recent Questions
              </h4>
              <div className="space-y-4">
                {recentQuestions.map((question, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0 group-hover:bg-blue-600 transition-colors"></div>
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/ask" 
                className="inline-flex items-center mt-6 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
              >
                View all questions
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "2.5K+", label: "Questions Asked" },
            { number: "850+", label: "Active Members" },
            { number: "24/7", label: "Community Support" },
            { number: "100%", label: "Local Focus" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 right-10 animate-bounce hidden lg:block">
          <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-1/4 left-10 animate-bounce delay-1000 hidden lg:block">
          <div className="w-4 h-4 bg-pink-400 rounded-full opacity-60"></div>
        </div>
      </div>
    </section>
  );
}
