import { NextResponse } from 'next/server';
import { getSpotifyAccessToken } from '@/lib/spotify/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('time_range') || 'short_term';
    
    // console.log('Fetching top artists with time range:', timeRange);
    
    const accessToken = await getSpotifyAccessToken();
    // console.log('Access token found:', !!accessToken);
    
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${timeRange}`,
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

    const data = await response.json();
    // console.log('Successfully fetched top artists:', {
    //   total: data.items?.length || 0,
    //   hasItems: !!data.items
    // });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in top-artists route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch top artists' },
      { status: 500 }
    );
  }
} 