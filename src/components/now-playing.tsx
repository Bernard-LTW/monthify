import { useEffect, useState } from "react";
import Image from "next/image";
import { SpotifyCurrentlyPlaying } from "@/lib/spotify/types";

// Add animation keyframes
const animationStyles = `
@keyframes playing {
    0%, 100% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
}

@keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}

@keyframes slideDown {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
`;

export default function NowPlaying() {
    const [playbackState, setPlaybackState] = useState<SpotifyCurrentlyPlaying | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await fetch('/api/spotify/playback-state');
                if (!response.ok) {
                    throw new Error('Failed to fetch playback state');
                }
                const data = await response.json();
                setPlaybackState(data);
                
                // Update visibility based on playback state
                const hasContent = data?.is_playing && data?.item;
                if (hasContent) {
                    setShouldShow(true);
                    // Wait for image to load before sliding up
                    if (data.item.album.images[0]?.url) {
                        const img = new window.Image();
                        img.onload = () => {
                            setIsVisible(true);
                        };
                        img.src = data.item.album.images[0].url;
                    } else {
                        setIsVisible(true);
                    }
                } else {
                    setIsVisible(false);
                    // Delay hiding the component to allow for slide-out animation
                    setTimeout(() => {
                        setShouldShow(false);
                    }, 300);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch playback state');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNowPlaying();
        // Refresh every 5 seconds
        const interval = setInterval(fetchNowPlaying, 5000);
        return () => clearInterval(interval);
    }, []);

    const renderSkeleton = () => (
        <div className="flex items-center space-x-3">
            <div className="w-15 h-15 relative">
                <div className="w-full h-full bg-gray-700 rounded-md animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-700 rounded w-3/4 animate-[pulse_2s_ease-in-out_infinite]"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mt-2 animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
            return renderSkeleton();
        }

        if (error) {
            return <p className="text-red-400">Error: {error}</p>;
        }

        if (!playbackState?.is_playing || !playbackState.item) {
            return renderSkeleton();
        }

        const { item } = playbackState;
        const albumImage = item.album.images[0]?.url;

        return (
            <>
                <div className="flex items-center space-x-3">
                    <div className="w-15 h-15 relative">
                        {albumImage && (
                            <Image
                                src={albumImage}
                                alt={`${item.name} album art`}
                                fill
                                className="rounded-md object-cover"
                                priority
                            />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate hover:underline cursor-pointer">
                            {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">
                            {item.artists.map(artist => artist.name).join(', ')}
                        </p>
                    </div>
                </div>
                {playbackState.is_playing && (
                    <div className="flex items-center space-x-1">
                        <div className="w-1 h-3 rounded-full bg-green-500 animate-[playing_1s_ease-in-out_infinite]"></div>
                        <div className="w-1 h-3 rounded-full bg-green-500 animate-[playing_1s_ease-in-out_infinite_0.2s]"></div>
                        <div className="w-1 h-3 rounded-full bg-green-500 animate-[playing_1s_ease-in-out_infinite_0.4s]"></div>
                    </div>
                )}
            </>
        );
    };

    if (!shouldShow) return null;

    return (
        <>
            <style>{animationStyles}</style>
            <div 
                className={`fixed bottom-0 left-0 right-0 flex items-center justify-between py-3 px-7 bg-[#121212] border-t border-gray-800 transition-all duration-300 ease-in-out rounded-t-xl shadow-lg`}
                style={{ 
                    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    animation: isVisible ? 'slideUp 0.3s ease-out' : 'none'
                }}
            >
                {renderContent()}
            </div>
        </>
    );
}