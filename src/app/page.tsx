'use client';

import Login from '@/components/login';
import Dashboard from '@/components/dashboard';
import { useAuth } from '@/components/auth-provider';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
}
