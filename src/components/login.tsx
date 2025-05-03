'use client';

import { SpotifyClient } from '@/lib/spotify/client';
import { spotifyConfig } from '@/lib/spotify/config';

export default function Login() {
    const handleSpotifyLogin = async () => {
        try {
          // Generate random string for state
          const randomString = (length: number) => {
            const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * charset.length);
              result += charset[randomIndex];
            }
            return result;
          };
    
          const state = randomString(16);
          const spotifyClient = SpotifyClient.getInstance(spotifyConfig);
          const authUrl = spotifyClient.getAuthUrl(state);
    
          // Store state in localStorage for verification
          localStorage.setItem('spotify_auth_state', state);
          window.location.href = authUrl;
        } catch (error) {
          console.error('Error initiating Spotify login:', error);
        }
      };
    

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Monthify</h1>
          <p className="text-xl mb-8 text-gray-300">
            Create monthly playlists based on your Spotify listening history
          </p>
          
          <div className="mt-4 p-4 bg-yellow-100/20 border border-yellow-200/30 rounded-lg shadow-lg flex items-start gap-3 text-sm mb-8">
            <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-yellow-200">Important Information</h3>
              <p className="text-gray-300 text-sm mt-1">
                This application is built as a proof of concept and only works with users who are designated in the API key list. If you found this page by chance, it&apos;s probably not the right page for you.
              </p>
            </div>
          </div>

          <button
            onClick={handleSpotifyLogin}
            className="bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 mx-auto transition-colors"
          >
    
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Login with Spotify
          </button>



        </div>
      </main>
    </div>
  );
}