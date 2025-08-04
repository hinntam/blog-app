import React from 'react';
import Link from 'next/link';

interface PostProps {
  id: string;
  title: string;
  excerpt?: string;
  content?: string; // Full HTML content for detail view
  image_url?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  views?: number;
  created_at?: string;
  author_name?: string;
  date?: string; // Backward compatibility
  author?: string; // Backward compatibility
  showFullContent?: boolean; // Option to show full content or excerpt
}

// Safe HTML renderer with basic sanitization
const SafeHTML: React.FC<{ content: string; className?: string }> = ({ content, className = "" }) => {
  // Basic sanitization - remove script tags and potentially dangerous attributes
  const sanitizedContent = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');

  return (
    <div 
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

const Post: React.FC<PostProps> = ({ 
  id, 
  title, 
  excerpt, 
  content,
  category, 
  tags, 
  featured, 
  views, 
  created_at, 
  author_name,
  date, // Backward compatibility
  author, // Backward compatibility
  showFullContent = false
}) => {
  // Use new props or fall back to old ones for backward compatibility
  const displayDate = created_at || date;
  const displayAuthor = author_name || author;
  const displayContent = content || excerpt;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Check if content contains HTML tags
  const hasHtmlTags = displayContent && /<[^>]*>/g.test(displayContent);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-blue-300">📄</div>
        </div>
        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full border">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/post/${id}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Content/Excerpt */}
        <div className="mb-4">
          {displayContent && (
            <>
              {hasHtmlTags && showFullContent ? (
                <SafeHTML 
                  content={displayContent} 
                  className="text-gray-700 leading-relaxed" 
                />
              ) : hasHtmlTags ? (
                <SafeHTML 
                  content={displayContent.length > 150 ? `${displayContent.substring(0, 150)}...` : displayContent} 
                  className="text-gray-600 text-sm leading-relaxed" 
                />
              ) : (
                <div className="text-gray-600 text-sm leading-relaxed">
                  {displayContent.length > 120 ? `${displayContent.substring(0, 120)}...` : displayContent}
                </div>
              )}
            </>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {displayDate && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {formatDate(displayDate)}
              </span>
            )}
            {views && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {views}
              </span>
            )}
          </div>
          <div className="text-right">
            {displayAuthor && (
              <div className="font-medium text-gray-700">{displayAuthor}</div>
            )}
          </div>
        </div>

        {/* Read More Link */}
        {!showFullContent && (
          <div className="mt-4">
            <Link 
              href={`/blog/post/${id}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              Read More
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

