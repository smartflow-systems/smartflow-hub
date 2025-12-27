import { NextRequest, NextResponse } from 'next/server';
import { queryAI } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const result = await queryAI(messages);
  return NextResponse.json(result);
}
