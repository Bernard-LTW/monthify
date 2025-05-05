'use client';

import SpotifyStats from './spotify-stats';
import { useRouter } from 'next/navigation';
import NowPlaying from './now-playing';
export default function Dashboard() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Call API to clear cookies
      await fetch('/api/auth/signout', { method: 'POST' });
      // Redirect to login page
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome to Monthify</h1>
              <p className="text-xl text-gray-300">
                Your Spotify listening history
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Sign Out
            </button>
          </div>
          <SpotifyStats />
          <NowPlaying />
        </div>
      </main>
    </div>
  );
} 