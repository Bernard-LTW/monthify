import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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
    // Exchange the code for an access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || '',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
        code_verifier: localStorage.get('code_verifier') || '',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokens.error_description || 'Failed to get access token');
    }

    // Create the response with redirect
    const response = NextResponse.redirect(new URL('/?auth=success', request.url));

    // Set cookies in the response
    response.cookies.set('spotify_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokens.expires_in, // Spotify tokens typically expire in 1 hour
    });

    if (tokens.refresh_token) {
      response.cookies.set('spotify_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // Refresh tokens typically don't expire, but we'll set a long expiration
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error: unknown) {
    console.error('Spotify callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.redirect(
      new URL(`/error?message=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
