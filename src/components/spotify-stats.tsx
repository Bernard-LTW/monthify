'use client';

import { useEffect, useState } from 'react';

interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface Artist {
  name: string;
  images: { url: string }[];
  genres: string[];
}

export default function SpotifyStats() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        // Fetch top tracks
        const tracksRes = await fetch('/api/spotify/top-tracks');
        const tracksData = await tracksRes.json();
        setTopTracks(tracksData.items);

        // Fetch top artists
        const artistsRes = await fetch('/api/spotify/top-artists');
        const artistsData = await artistsRes.json();
        setTopArtists(artistsData.items);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setIsLoading(false);
      }
    };

    fetchSpotifyData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Top Tracks Card */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Top Tracks</h2>
        <div className="space-y-4">
          {topTracks.slice(0, 5).map((track, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={track.album.images[2]?.url || track.album.images[0]?.url}
                alt={track.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-white font-medium">{track.name}</p>
                <p className="text-gray-400 text-sm">
                  {track.artists.map(artist => artist.name).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Artists Card */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Top Artists</h2>
        <div className="space-y-4">
          {topArtists.slice(0, 5).map((artist, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={artist.images[2]?.url || artist.images[0]?.url}
                alt={artist.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-white font-medium">{artist.name}</p>
                <p className="text-gray-400 text-sm">
                  {artist.genres.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 