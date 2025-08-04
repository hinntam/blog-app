import { Pool } from 'pg';

// Create a connection pool using your existing environment variables
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to NeonDB PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;

// Helper function to execute queries
export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Helper function to create your specific table structure
export async function initializeDatabase() {
  try {
    // Check if user_blog table exists and get its structure
    const tableCheck = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'user_blog' 
      ORDER BY ordinal_position;
    `);

    if (tableCheck.rows.length === 0) {
      // Create the user_blog table with your exact schema if it doesn't exist
      await query(`
        CREATE TABLE IF NOT EXISTS user_blog (
          user_id INT NOT NULL PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL,
          date DATE DEFAULT CURRENT_DATE
        )
      `);
      console.log('Created user_blog table with date column');
    } else {
      console.log('Existing user_blog table structure:', tableCheck.rows);
      
      // Check if we have a date column for the posts query compatibility
      const hasDateColumn = tableCheck.rows.some(row => row.column_name === 'date');
      const hasCreatedAtColumn = tableCheck.rows.some(row => row.column_name === 'created_at');
      
      if (hasDateColumn) {
        console.log('Found date column in user_blog table');
      } else if (hasCreatedAtColumn) {
        console.log('Found created_at column in user_blog table');
      }
    }

    // Create posts table for blog posts
    await query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        image_url TEXT,
        author_id INT,
        category VARCHAR(100),
        tags TEXT[],
        status VARCHAR(20) DEFAULT 'published',
        featured BOOLEAN DEFAULT false,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Only add foreign key if user_blog table exists
    if (tableCheck.rows.length > 0) {
      try {
        await query(`
          ALTER TABLE posts 
          ADD CONSTRAINT fk_posts_author 
          FOREIGN KEY (author_id) REFERENCES user_blog(user_id) ON DELETE SET NULL
        `);
      } catch {
        console.log('Foreign key constraint may already exist or user_blog structure differs');
      }
    }

    // Create indexes for better performance - only for existing columns
    try {
      await query(`CREATE INDEX IF NOT EXISTS idx_user_blog_email ON user_blog(email);`);
      await query(`CREATE INDEX IF NOT EXISTS idx_user_blog_username ON user_blog(username);`);
      console.log('Created user_blog indexes successfully');
    } catch {
      console.log('Note: Some user_blog indexes may not be created due to column differences');
    }
    
    try {
      await query(`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);`);
      await query(`CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);`);
      await query(`CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);`);
      await query(`CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);`);
      console.log('Created posts indexes successfully');
    } catch (postsIndexError) {
      console.log('Note: Some posts indexes may not be created:', postsIndexError instanceof Error ? postsIndexError.message : 'Unknown error');
    }

    console.log('Database tables user_blog and posts initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
