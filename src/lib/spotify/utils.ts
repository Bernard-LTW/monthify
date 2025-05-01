import { cookies } from 'next/headers';

export async function getSpotifyAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('spotify_access_token');
  
  if (!accessToken) {
    throw new Error('No access token found');
  }
  
  return accessToken.value;
} 