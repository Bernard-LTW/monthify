import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  // console.log('All cookies:', allCookies);
  
  const accessToken = cookieStore.get('spotify_access_token');
  // console.log('Access token cookie:', accessToken);
  
  return NextResponse.json({
    isAuthenticated: !!accessToken,
    debug: {
      allCookies: allCookies.map(c => c.name)
    }
  });
} 