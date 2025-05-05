import { NextResponse } from 'next/server';
import { SpotifyClient } from '@/lib/spotify/client';
import { spotifyConfig } from '@/lib/spotify/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/error', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/error?message=No code provided', request.url));
  }

  try {
    const spotifyClient = SpotifyClient.getInstance(spotifyConfig);
    const tokens = await spotifyClient.exchangeCodeForTokens(code);

    // console.log('Received tokens:', { 
    //   hasAccessToken: !!tokens.access_token,
    //   hasRefreshToken: !!tokens.refresh_token,
    //   expiresIn: tokens.expires_in 
    // });

    // Create the response with redirect
    const response = NextResponse.redirect(new URL('/?auth=success', request.url));
    
    // Set cookies using NextResponse
    response.cookies.set({
      name: 'spotify_access_token',
      value: tokens.access_token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: tokens.expires_in,
      path: '/',
      domain: process.env.NEXT_PUBLIC_DOMAIN || undefined
    });

    if (tokens.refresh_token) {
      response.cookies.set({
        name: 'spotify_refresh_token',
        value: tokens.refresh_token,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        domain: process.env.NEXT_PUBLIC_DOMAIN || undefined
      });
    }

    // console.log('Response cookies:', response.cookies.getAll());

    return response;
  } catch (error) {
    console.error('Spotify callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.redirect(
      new URL(`/error?message=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
