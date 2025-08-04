'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RecentPosts() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);

  const recentPosts = [
    {
      id: 1,
      title: "Calgary Stampede 2025: Everything You Need to Know",
      excerpt: "Get ready for the Greatest Outdoor Show on Earth! From must-see events to insider tips, here's your complete guide to Calgary Stampede 2025.",
      category: "Events",
      image: "/topics.webp",
      author: "Sarah Mitchell",
      authorAvatar: "/author3.webp",
      publishDate: "2 hours ago",
      readTime: "8 mins read",
      tags: ["Stampede", "Events", "Calgary"],
      likes: 42,
      comments: 18,
      featured: true
    },
    {
      id: 2,
      title: "Best Winter Activities in Calgary: Your 2025 Guide",
      excerpt: "From outdoor adventures to cozy indoor experiences, discover the top winter activities that make Calgary shine during the coldest months.",
      category: "Lifestyle",
      image: "/img1.webp",
      author: "Mike Chen",
      authorAvatar: "/author3.webp",
      publishDate: "1 day ago",
      readTime: "12 mins read",
      tags: ["Winter", "Activities", "Tourism"],
      likes: 38,
      comments: 25,
      featured: false
    },
    {
      id: 3,
      title: "Calgary's Food Scene: Hidden Gems You Must Try",
      excerpt: "Local food enthusiasts share their favorite hidden restaurants and cafes that showcase Calgary's diverse and delicious culinary landscape.",
      category: "Food & Dining",
      image: "/google.jpg",
      author: "Emma Rodriguez",
      authorAvatar: "/author3.webp",
      publishDate: "3 days ago",
      readTime: "15 mins read",
      tags: ["Food", "Restaurants", "Local"],
      likes: 56,
      comments: 34,
      featured: false
    },
    {
      id: 4,
      title: "Transit Updates: New CTrain Extensions Coming in 2025",
      excerpt: "Calgary Transit announces major expansions to the CTrain network. Find out how these changes will impact your daily commute and neighborhood.",
      category: "Transportation",
      image: "/image-desktop.jpeg",
      author: "David Kim",
      authorAvatar: "/author3.webp",
      publishDate: "5 days ago",
      readTime: "10 mins read",
      tags: ["Transit", "CTrain", "Infrastructure"],
      likes: 29,
      comments: 16,
      featured: false
    }
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recent Posts
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">
              from Calgary
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay up to date with the latest stories, news, and insights from around our beautiful city
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {recentPosts.map((post) => (
              <article 
                key={post.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                  post.featured ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                {post.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🔥 Featured
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>

                    {/* Title & Excerpt */}
                    <Link href={`/blog/post/${post.id}`} className="block group">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </Link>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Engagement */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={post.authorAvatar}
                          alt={post.author}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                          <p className="text-gray-500 text-xs">{post.publishDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            likedPosts.includes(post.id) 
                              ? 'text-red-500' 
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <svg className="w-5 h-5" fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </button>

                        <Link href={`/blog/post/${post.id}#comments`} className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-sm">{post.comments}</span>
                        </Link>

                        <button
                          onClick={() => toggleBookmark(post.id)}
                          className={`transition-colors ${
                            bookmarkedPosts.includes(post.id) 
                              ? 'text-yellow-500' 
                              : 'text-gray-500 hover:text-yellow-500'
                          }`}
                        >
                          <svg className="w-5 h-5" fill={bookmarkedPosts.includes(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Load More Button */}
            <div className="text-center pt-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                Load More Stories
              </button>
            </div>
          </div>

          {/* Sidebar with Popular Posts */}
          <div className="space-y-6">
            {/* Newsletter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📧 Stay Updated</h3>
              <p className="text-gray-600 mb-4">Get the latest Calgary stories delivered to your inbox</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">✍️ Join the Community</h3>
              <div className="space-y-3">
                <Link 
                  href="/ask"
                  className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
                >
                  Ask a Question
                </Link>
                <Link 
                  href="/blog/insert"
                  className="block w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                >
                  Share Your Story
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📂 Categories</h3>
              <div className="space-y-2">
                {['Events', 'Food & Dining', 'Transportation', 'Lifestyle', 'Weather', 'Community'].map((category, index) => (
                  <Link 
                    key={index}
                    href={`/blog/category/${category.toLowerCase()}`}
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
