import React from 'react';

export function TrackSkeleton() {
  return (
    <div className="flex items-center space-x-3 animate-pulse">
      <div className="w-6 h-4 bg-gray-700 rounded"></div>
      <div className="w-12 h-12 bg-gray-700 rounded"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function ArtistSkeleton() {
  return (
    <div className="flex items-center space-x-3 animate-pulse">
      <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function SpotifyStatsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Time Range Selector Skeleton */}
      <div className="flex justify-center space-x-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-24 h-10 bg-gray-700 rounded-full animate-pulse"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Top Tracks Card Skeleton */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 w-36 bg-gray-700 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <TrackSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Top Artists Card Skeleton */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="h-8 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <ArtistSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 