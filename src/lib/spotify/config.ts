import { SpotifyConfig } from './types';

export const SPOTIFY_SCOPES = [
  'user-read-email',
  'user-read-private',
  'user-top-read',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private'
];

export const spotifyConfig: SpotifyConfig = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
  redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || '',
  scopes: SPOTIFY_SCOPES,
}; 