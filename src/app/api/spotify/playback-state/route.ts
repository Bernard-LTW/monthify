import { NextResponse } from 'next/server';
import { getSpotifyAccessToken } from '@/lib/spotify/utils';

export async function GET() {
  try {    
    
    // console.log('Fetching Playback State');
    
    const accessToken = await getSpotifyAccessToken();
    // console.log('Access token found:', !!accessToken);
    
    const response = await fetch(
      `https://api.spotify.com/v1/me/player`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to fetch top artists');
    }

    if (response.status === 204) {
      return NextResponse.json({
        isPlaying: false,
        item: null,
      });
    }

    const data = await response.json();
    // console.log('Playback State:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in playback-state route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch playback state' },
      { status: 500 }
    );
  }
} 