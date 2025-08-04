'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const slides = [
    {
      title: "Discover Calgary",
      subtitle: "Your Local Community Hub",
      description: "Stay connected with the latest news, events, and stories from around Calgary. Join our vibrant community of locals sharing experiences and knowledge.",
      image: "/topics.webp",
      cta: "Explore Stories"
    },
    {
      title: "Ask Calgary",
      subtitle: "Get Answers from Locals",
      description: "Have questions about Calgary? From finding the best restaurants to navigating city services, our community is here to help you discover everything our city has to offer.",
      image: "/img1.webp",
      cta: "Ask a Question"
    },
    {
      title: "Share Your Story",
      subtitle: "Connect with Your Community",
      description: "Share your Calgary experiences, recommendations, and insights. Help fellow Calgarians discover hidden gems and navigate life in our beautiful city.",
      image: "/author3.webp",
      cta: "Start Writing"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => setIsTyping(true), 100);
    }, 2000);
    return () => clearTimeout(typingTimer);
  }, [currentSlide]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-1/3 w-48 h-48 bg-cyan-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Animated Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium">Live from Calgary</span>
            </div>

            {/* Main Heading with Typing Effect */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                  {slides[currentSlide].title}
                </span>
                <span className={`inline-block w-1 h-12 ml-2 bg-blue-400 ${isTyping ? 'animate-pulse' : ''}`}></span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
                {slides[currentSlide].subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/blog" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <span className="mr-2">🚀</span>
                {slides[currentSlide].cta}
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/ask" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="mr-2">💬</span>
                Ask Calgary
              </Link>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Stay Connected</h3>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">Get weekly updates about Calgary news and events</p>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              ))}
              
              {/* Image Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">{slides[currentSlide].title}</h3>
                <p className="text-sm opacity-90">{slides[currentSlide].subtitle}</p>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-blue-400">2.5K+</div>
                <div className="text-xs opacity-80">Active Readers</div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-purple-400">150+</div>
                <div className="text-xs opacity-80">Stories Shared</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm opacity-70">Scroll down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
