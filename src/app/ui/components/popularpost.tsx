'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PopularPosts() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const popularPosts = {
    week: [
      {
        id: 1,
        title: "Calgary Stampede 2025: Complete Guide",
        excerpt: "Everything you need to know about the Greatest Outdoor Show on Earth",
        image: "/topics.webp",
        views: "12.5K",
        comments: 89,
        category: "Events",
        trend: "🔥",
        readTime: "8 min"
      },
      {
        id: 2,
        title: "Best Winter Activities in Calgary",
        excerpt: "Top outdoor and indoor winter experiences",
        image: "/img1.webp",
        views: "8.2K",
        comments: 67,
        category: "Lifestyle",
        trend: "📈",
        readTime: "12 min"
      },
      {
        id: 3,
        title: "Hidden Food Gems in Calgary",
        excerpt: "Local restaurants you haven't discovered yet",
        image: "/google.jpg",
        views: "6.8K",
        comments: 45,
        category: "Food",
        trend: "⭐",
        readTime: "15 min"
      },
      {
        id: 4,
        title: "CTrain Network Expansions 2025",
        excerpt: "Major transit updates coming this year",
        image: "/image-desktop.jpeg",
        views: "5.4K",
        comments: 32,
        category: "Transportation",
        trend: "📊",
        readTime: "10 min"
      },
      {
        id: 5,
        title: "Calgary Housing Market Update",
        excerpt: "Latest trends and predictions for 2025",
        image: "/author3.webp",
        views: "4.9K",
        comments: 28,
        category: "Real Estate",
        trend: "📈",
        readTime: "7 min"
      }
    ],
    month: [
      {
        id: 6,
        title: "Ultimate Calgary Moving Guide",
        excerpt: "Everything newcomers need to know",
        image: "/topics.webp",
        views: "45.2K",
        comments: 234,
        category: "Living",
        trend: "🏆",
        readTime: "20 min"
      },
      {
        id: 7,
        title: "Calgary Weather Survival Guide",
        excerpt: "How to thrive in all four seasons",
        image: "/img1.webp",
        views: "38.7K",
        comments: 198,
        category: "Weather",
        trend: "❄️",
        readTime: "12 min"
      },
      {
        id: 8,
        title: "Top 50 Calgary Restaurants 2025",
        excerpt: "The definitive dining guide",
        image: "/google.jpg",
        views: "32.1K",
        comments: 156,
        category: "Food",
        trend: "🍽️",
        readTime: "25 min"
      }
    ],
    year: [
      {
        id: 9,
        title: "Complete Calgary Newcomer's Handbook",
        excerpt: "The ultimate guide to living in Calgary",
        image: "/topics.webp",
        views: "125.8K",
        comments: 892,
        category: "Living",
        trend: "👑",
        readTime: "45 min"
      },
      {
        id: 10,
        title: "Calgary Business Directory 2025",
        excerpt: "Supporting local businesses",
        image: "/author3.webp",
        views: "98.4K",
        comments: 567,
        category: "Business",
        trend: "💼",
        readTime: "30 min"
      }
    ]
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Most Popular
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 ml-2">
              Calgary Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover what the Calgary community is reading and talking about
          </p>

          {/* Time Range Selector */}
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-6 py-2 rounded-lg transition-all duration-300 capitalize font-medium ${
                  timeRange === range
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                This {range}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPosts[timeRange].map((post, index) => (
            <article 
              key={post.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              {/* Ranking Badge */}
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* Trend Badge */}
              <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-lg">
                {post.trend}
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Category overlay */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Link href={`/blog/post/${post.id}`} className="block group">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{post.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Button */}
                <Link 
                  href={`/blog/post/${post.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  Read more
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/blog/popular"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">📈</span>
            View All Popular Posts
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Trending Topics */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔥 Trending Topics in Calgary</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '#CalgaryStampede', '#WinterActivities', '#YYCFood', '#CTrain', 
              '#CalgaryWeather', '#YYCEvents', '#LocalBusiness', '#CalgaryLife',
              '#Housing', '#Transportation', '#Community', '#Tourism'
            ].map((topic, index) => (
              <Link
                key={index}
                href={`/blog/tag/${topic.slice(1)}`}
                className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md font-medium"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}