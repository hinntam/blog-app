import { NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/app/lib/database';

// Initialize database on first load
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

export async function GET() {
  try {
    await ensureDbInitialized();

    const result = await query(`
      SELECT user_id, username, email, created_at
      FROM user_blog 
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      users: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Get all users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users from database' },
      { status: 500 }
    );
  }
}
