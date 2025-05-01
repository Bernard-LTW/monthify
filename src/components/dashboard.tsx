'use client';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to Monthify</h1>
          <p className="text-xl mb-8 text-gray-300">
            Your monthly playlists will appear here
          </p>
          {/* We'll add playlist content here later */}
        </div>
      </main>
    </div>
  );
} 