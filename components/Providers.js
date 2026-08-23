'use client';

import { SessionProvider } from 'next-auth/react';

import { AuthProvider } from '@/context/AuthContext';
import { PlayerProvider } from '@/context/PlayerContext';
import { QueueProvider } from '@/context/QueueContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AuthProvider>
          <QueueProvider>
            <PlayerProvider>
              {children}
            </PlayerProvider>
          </QueueProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
