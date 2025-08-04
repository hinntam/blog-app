
import { NextRequest, NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/app/lib/database';

// Initialize database on first load
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    const offset = (page - 1) * limit;

    // Build the WHERE clause based on filters
    let whereClause = "WHERE p.status = 'published'";
    const queryParams: unknown[] = [limit, offset];
    let paramIndex = 2;

    if (category && category !== 'all') {
      paramIndex++;
      whereClause += ` AND p.category = $${paramIndex}`;
      queryParams.push(category);
    }

    if (search) {
      paramIndex++;
      whereClause += ` AND (p.title ILIKE $${paramIndex} OR p.content ILIKE $${paramIndex} OR p.excerpt ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
    }

    // Get posts with pagination
    const postsQuery = `
      SELECT 
        p.id,
        p.title,
        p.excerpt,
        p.image_url,
        p.category,
        p.tags,
        p.featured,
        p.views,
        p.created_at,
        u.username as author_name
      FROM posts p
      LEFT JOIN user_blog u ON p.author_id = u.user_id
      ${whereClause}
      ORDER BY p.featured DESC, p.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const posts = await query(postsQuery, queryParams);

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM posts p
      ${whereClause.replace('LIMIT $1 OFFSET $2', '')}
    `;
    
    const countParams = queryParams.slice(2); // Remove limit and offset
    const countResult = await query(countQuery, countParams);
    const totalPosts = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalPosts / limit);

    // Get categories for filter
    const categoriesResult = await query(`
      SELECT DISTINCT category, COUNT(*) as count
      FROM posts 
      WHERE status = 'published'
      GROUP BY category
      ORDER BY count DESC
    `);

    return NextResponse.json({
      success: true,
      posts: posts.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasMore: page < totalPages,
        limit
      },
      categories: categoriesResult.rows
    });

  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts from database' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const body = await request.json();
    const { title, content, excerpt, imageUrl, authorId, category, tags, featured } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, and authorId are required' },
        { status: 400 }
      );
    }

    // Create new post
    const newPost = await query(
      `INSERT INTO posts (title, content, excerpt, image_url, author_id, category, tags, featured, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [title, content, excerpt || null, imageUrl || null, authorId, category || 'General', tags || [], featured || false]
    );

    return NextResponse.json({
      success: true,
      message: 'Post created successfully!',
      post: newPost.rows[0]
    });

  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post. Please try again.' },
      { status: 500 }
    );
  }
}


