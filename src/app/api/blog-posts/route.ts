import { NextRequest, NextResponse } from 'next/server';
import { connectToDB, getPosts } from '@/app/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    
    const offset = (page - 1) * limit;

    // Connect to your existing database and get posts
    await connectToDB();
    const allPosts = await getPosts();

    if (!allPosts || allPosts.length === 0) {
      return NextResponse.json({
        success: true,
        posts: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalPosts: 0,
          hasMore: false,
          limit
        },
        categories: []
      });
    }

    // Filter posts based on search query
    let filteredPosts = allPosts;
    if (search) {
      filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply pagination
    const totalPosts = filteredPosts.length;
    const paginatedPosts = filteredPosts.slice(offset, offset + limit);
    const totalPages = Math.ceil(totalPosts / limit);
    const hasMore = page < totalPages;

    // Generate categories based on content analysis
    const categories = [
      { category: 'Technology', count: allPosts.filter(p => 
        p.title.toLowerCase().includes('window') || 
        p.title.toLowerCase().includes('aws') ||
        p.title.toLowerCase().includes('sql') ||
        p.content.toLowerCase().includes('tech')
      ).length },
      { category: 'Security', count: allPosts.filter(p => 
        p.title.toLowerCase().includes('security') || 
        p.title.toLowerCase().includes('injection') ||
        p.content.toLowerCase().includes('security')
      ).length },
      { category: 'Development', count: allPosts.filter(p => 
        p.title.toLowerCase().includes('react') || 
        p.title.toLowerCase().includes('api') ||
        p.content.toLowerCase().includes('development')
      ).length },
      { category: 'Tutorial', count: allPosts.filter(p => 
        p.title.toLowerCase().includes('how to') || 
        p.title.toLowerCase().includes('install') ||
        p.content.toLowerCase().includes('step')
      ).length }
    ].filter(cat => cat.count > 0);

    // Format the data to match expected structure
    const formattedPosts = paginatedPosts.map(post => {
      // Create excerpt from HTML content
      const textContent = post.content.replace(/<[^>]*>/g, ''); // Strip HTML tags
      const excerpt = textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent;
      
      // Determine category based on content
      let category = 'General';
      if (post.title.toLowerCase().includes('security') || post.title.toLowerCase().includes('injection')) {
        category = 'Security';
      } else if (post.title.toLowerCase().includes('window') || post.title.toLowerCase().includes('aws') || post.title.toLowerCase().includes('sql')) {
        category = 'Technology';
      } else if (post.title.toLowerCase().includes('react') || post.title.toLowerCase().includes('api')) {
        category = 'Development';
      } else if (post.title.toLowerCase().includes('how to') || post.title.toLowerCase().includes('install')) {
        category = 'Tutorial';
      }

      return {
        id: post.id,
        title: post.title,
        excerpt: excerpt,
        content: post.content, // Include full HTML content
        image_url: '/placeholder-image.svg',
        category: category,
        tags: [], // You can enhance this based on content analysis
        featured: Math.random() > 0.7, // Random featured status
        views: Math.floor(Math.random() * 200) + 10,
        created_at: post.date,
        author_name: post.author || 'Calgary Hub'
      };
    });

    return NextResponse.json({
      success: true,
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasMore,
        limit
      },
      categories
    });

  } catch (error) {
    console.error('Get blog posts error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog posts',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
