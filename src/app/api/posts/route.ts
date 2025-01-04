
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM posts`;
    
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const content = searchParams.get('content');
  const date = searchParams.get('date');
  const author = searchParams.get('author');


  try {
    
    // SQL query to insert a new post
    await sql`INSERT INTO posts (author, title, content, date) VALUES (${author}, ${title}, ${content}, ${date});`;
    return NextResponse.json({ message: 'Post successfully inserted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    // SQL query to delete a post
    await sql`DELETE FROM posts WHERE id = ${id};`;
    return NextResponse.json({ message: 'Post successfully deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const content = searchParams.get('content');
  const date = searchParams.get('date');
  const author = searchParams.get('author');

  try {
    // SQL query to update a post
    await sql`UPDATE posts SET title = ${title}, content = ${content}, date = ${date}, author = ${author} WHERE id = ${id};`;
    return NextResponse.json({ message: 'Post successfully updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


