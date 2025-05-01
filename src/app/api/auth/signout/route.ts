import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear Spotify cookies
  response.cookies.set({
    name: 'spotify_access_token',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  response.cookies.set({
    name: 'spotify_refresh_token',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  return response;
} 