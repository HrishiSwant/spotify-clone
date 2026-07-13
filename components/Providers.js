'use client';
import { SessionProvider } from 'next-auth/react';
import { PlayerProvider } from '@/context/PlayerContext';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </SessionProvider>
  );
}
