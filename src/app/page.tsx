'use client';

import Login from '@/components/login';
import Dashboard from '@/components/dashboard';
import { useAuth } from '@/components/auth-provider';

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Show login button even if loading
  return <Login />;
}
