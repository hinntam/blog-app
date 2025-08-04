"use client";
import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  createdAt: string;
  id?: string;
  category?: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  timestamp: string;
  source: string;
}

export default function AskCalgaryPage() {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'questions'>('news');
  const [category, setCategory] = useState('general');

  // Sample news data for Calgary
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Calgary Transit Updates: New Bus Routes Starting This Month',
      summary: 'Several new bus routes will be introduced to improve connectivity across Calgary neighborhoods.',
      category: 'Transportation',
      timestamp: '2 hours ago',
      source: 'Calgary Transit'
    },
    {
      id: '2',
      title: 'Weather Alert: Snow Expected This Weekend',
      summary: 'Environment Canada issues winter weather advisory for Calgary and surrounding areas.',
      category: 'Weather',
      timestamp: '4 hours ago',
      source: 'Environment Canada'
    },
    {
      id: '3',
      title: 'Stampede 2025: Early Bird Tickets Now Available',
      summary: 'Get your Calgary Stampede tickets at discounted prices. Event runs July 4-13, 2025.',
      category: 'Events',
      timestamp: '1 day ago',
      source: 'Calgary Stampede'
    },
    {
      id: '4',
      title: 'City Council Approves New Community Center in SE Calgary',
      summary: 'Construction to begin this spring for a new recreational facility in the Southeast.',
      category: 'Community',
      timestamp: '2 days ago',
      source: 'City of Calgary'
    }
  ]);

  const categories = ['general', 'transportation', 'housing', 'events', 'services', 'weather'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, category }),
      });
      
      if (res.ok) {
        const newQuestion = await res.json();
        setQuestions([newQuestion, ...questions]);
        setQuestion('');
        setActiveTab('questions');
      }
    } catch (error) {
      console.error('Failed to post question:', error);
    }
    
    setLoading(false);
  };

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          setQuestions(data);
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Ask Calgary</h1>
          <p className="text-gray-600 text-center">Your local community hub for news and questions</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'news'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📰 Local News
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'questions'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ❓ Community Q&A
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'news' ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Latest Calgary News</h2>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-500">{item.timestamp}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.summary}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Source: {item.source}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Read more →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Community Questions</h2>
                <div className="space-y-4">
                  {questions.length === 0 ? (
                    <div className="bg-white rounded-lg p-8 text-center shadow-sm border">
                      <p className="text-gray-500 mb-4">No questions yet. Be the first to ask!</p>
                      <button
                        onClick={() => setActiveTab('questions')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Post a question below →
                      </button>
                    </div>
                  ) : (
                    questions.map((q, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          {q.category && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full capitalize">
                              {q.category}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-lg text-gray-900 mb-3">{q.question}</p>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            💬 Reply
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                            👍 Helpful
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Question Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Ask a Question</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Question
                  </label>
                  <textarea
                    className="w-full border rounded-lg p-3 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="What would you like to know about Calgary?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                  disabled={loading}
                >
                  {loading ? 'Posting...' : '📝 Post Question'}
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                  🏛️ City of Calgary Website
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                  🚌 Calgary Transit
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                  🌡️ Weather Forecast
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                  🎪 Calgary Stampede
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                  📞 Emergency Services
                </a>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition"
                  >
                    #{cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
