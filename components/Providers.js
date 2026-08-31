'use client';

import { SessionProvider } from 'next-auth/react';

import { AuthProvider } from '@/context/AuthContext';
import { PlayerProvider } from '@/context/PlayerContext';
import { QueueProvider } from '@/context/QueueContext';
import { ThemeProvider } from '@/context/ThemeContext';

import SpotifySDK from '@/components/player/SpotifySDK';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AuthProvider>
          <QueueProvider>
            <PlayerProvider>

              {/* Initialize Spotify Web Playback SDK */}
              <SpotifySDK />

              {children}

            </PlayerProvider>
          </QueueProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
