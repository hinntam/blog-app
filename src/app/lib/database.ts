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
    // Create the user_blog table with your exact schema
    await query(`
      CREATE TABLE IF NOT EXISTS user_blog (
        user_id INT NOT NULL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at DATE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await query(`
      CREATE INDEX IF NOT EXISTS idx_user_blog_email ON user_blog(email);
      CREATE INDEX IF NOT EXISTS idx_user_blog_username ON user_blog(username);
    `);

    console.log('Database table user_blog initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
