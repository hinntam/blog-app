import { NextRequest, NextResponse } from 'next/server';

interface Question {
  question: string;
  createdAt: string;
  category?: string;
  id?: string;
}

// Placeholder: Replace with real DB logic
const questions: Question[] = [];

export async function GET() {
  return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
  const { question, category } = await req.json();
  if (!question || typeof question !== 'string') {
    return NextResponse.json({ error: 'Invalid question' }, { status: 400 });
  }
  const newQuestion: Question = { 
    question, 
    category: category || 'general',
    createdAt: new Date().toISOString(),
    id: Date.now().toString()
  };
  questions.unshift(newQuestion);
  return NextResponse.json(newQuestion);
}
