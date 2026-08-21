import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function youtube(endpoint) {
  const response = await fetch(
    `${BASE_URL}${endpoint}&key=${process.env.YOUTUBE_API_KEY}`,
    {
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        message:
          data.error?.message || 'YouTube API Error',
      },
      {
        status: response.status,
      }
    );
  }

  return NextResponse.json(data);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const action = searchParams.get('action');

  switch (action) {
    case 'search': {
      const q = searchParams.get('q') || '';

      return youtube(
        `/search?part=snippet&type=video&maxResults=20&q=${encodeURIComponent(
          q
        )}`
      );
    }

    case 'video': {
      const id = searchParams.get('id');

      return youtube(
        `/videos?part=snippet,contentDetails&id=${id}`
      );
    }

    case 'playlist': {
      const id = searchParams.get('id');

      return youtube(
        `/playlistItems?part=snippet&maxResults=50&playlistId=${id}`
      );
    }

    default:
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid action',
        },
        {
          status: 400,
        }
      );
  }
}
