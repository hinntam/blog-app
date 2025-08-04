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

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const body = await request.json();
    const { uid, email, displayName } = body;

    if (!uid || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: uid and email are required' },
        { status: 400 }
      );
    }

    // Generate user_id from Firebase UID (convert to integer)
    const user_id = parseInt(uid.replace(/[^0-9]/g, '').slice(0, 9)) || Math.floor(Math.random() * 1000000000);
    const username = displayName || email.split('@')[0]; // Use display name or email prefix

    // Check if user already exists
    const existingUser = await query(
      'SELECT * FROM user_blog WHERE user_id = $1 OR email = $2',
      [user_id, email]
    );

    if (existingUser.rows.length > 0) {
      // User exists, return success message
      return NextResponse.json({
        success: true,
        message: 'Welcome back! User already exists in database.',
        user: existingUser.rows[0],
        isNewUser: false
      });
    }

    // Create new user in your user_blog table
    const newUser = await query(
      `INSERT INTO user_blog (user_id, username, email, created_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       RETURNING *`,
      [user_id, username, email]
    );

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! Welcome to Calgary Hub! Your profile has been saved to the database.',
      user: newUser.rows[0],
      isNewUser: true
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to register user. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const email = searchParams.get('email');

    if (!user_id && !email) {
      return NextResponse.json(
        { error: 'Either user_id or email parameter is required' },
        { status: 400 }
      );
    }

    let user;
    if (user_id) {
      const result = await query('SELECT * FROM user_blog WHERE user_id = $1', [parseInt(user_id)]);
      user = result.rows[0];
    } else if (email) {
      const result = await query('SELECT * FROM user_blog WHERE email = $1', [email]);
      user = result.rows[0];
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user information' },
      { status: 500 }
    );
  }
}
