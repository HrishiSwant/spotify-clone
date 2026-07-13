import { NextResponse } from 'next/server';
import { searchYouTube } from '@/lib/youtube';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  if (!q) return NextResponse.json({ error: 'missing query' }, { status: 400 });
  const videoId = await searchYouTube(q);
  return NextResponse.json({ videoId });
}
