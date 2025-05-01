import { NextResponse } from 'next/server';
import { getSpotifyAccessToken } from '@/lib/spotify/utils';
import { Track } from '@/lib/spotify/types';

export async function POST(request: Request) {
  try {
    const { tracks, timeRange } = await request.json();
    const accessToken = await getSpotifyAccessToken();

    // First, get the user's profile to get their ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    // Create a new playlist
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Top Tracks - ${timeRange === 'short_term' ? 'Last Month' : timeRange === 'medium_term' ? 'Last 6 Months' : 'Last Year'}`,
          description: 'Created by Monthify on ' + new Date().toLocaleDateString(),
          public: false,
        }),
      }
    );

    if (!playlistResponse.ok) {
      throw new Error('Failed to create playlist');
    }

    const playlistData = await playlistResponse.json();

    // Add tracks to the playlist
    const trackUris = tracks.map((track: Track) => track.uri);
    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );

    if (!addTracksResponse.ok) {
      throw new Error('Failed to add tracks to playlist');
    }

    return NextResponse.json({
      success: true,
      playlistUrl: playlistData.external_urls.spotify,
    });
  } catch (error) {
    console.error('Error creating playlist:', error);
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
} 