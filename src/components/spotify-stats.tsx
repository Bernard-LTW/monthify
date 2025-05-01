'use client';

import { useEffect, useState } from 'react';

interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  uri: string;
}

interface Artist {
  name: string;
  images: { url: string }[];
  genres: string[];
}

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export default function SpotifyStats() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

  const timeRangeLabels = {
    short_term: 'Last Month',
    medium_term: 'Last 6 Months',
    long_term: 'Last Year'
  };

  useEffect(() => {
    const fetchSpotifyData = async () => {
      setIsLoading(true);
      try {
        // Fetch top tracks
        const tracksRes = await fetch(`/api/spotify/top-tracks?time_range=${timeRange}`);
        const tracksData = await tracksRes.json();
        setTopTracks(tracksData.items);

        // Fetch top artists
        const artistsRes = await fetch(`/api/spotify/top-artists?time_range=${timeRange}`);
        const artistsData = await artistsRes.json();
        setTopArtists(artistsData.items);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setIsLoading(false);
      }
    };

    fetchSpotifyData();
  }, [timeRange]);

  const handleCreatePlaylist = async () => {
    try {
      setIsCreatingPlaylist(true);
      const response = await fetch('/api/spotify/create-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tracks: topTracks,
          timeRange,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.playlistUrl) {
        window.open(data.playlistUrl, '_blank');
      } else {
        throw new Error('Failed to create playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert('Failed to create playlist. Please try again.');
    } finally {
      setIsCreatingPlaylist(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-center space-x-2">
        {Object.entries(timeRangeLabels).map(([range, label]) => (
          <button
            key={range}
            onClick={() => setTimeRange(range as TimeRange)}
            className={`px-4 py-2 rounded-full transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Top Tracks Card */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Top Tracks</h2>
            <button
              onClick={handleCreatePlaylist}
              disabled={isCreatingPlaylist}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isCreatingPlaylist ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add to Playlist</span>
                </>
              )}
            </button>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {topTracks.slice(0, 50).map((track, index) => (
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
            {topArtists.slice(0, 10).map((artist, index) => (
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
    </div>
  );
} 