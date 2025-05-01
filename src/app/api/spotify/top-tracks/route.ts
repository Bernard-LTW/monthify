import { NextResponse } from 'next/server';
import { getSpotifyAccessToken } from '@/lib/spotify/utils';

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken();
    
    const response = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch top tracks');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top tracks' },
      { status: 500 }
    );
  }
} 