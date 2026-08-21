import './globals.css';

import { Inter } from 'next/font/google';

import { SessionProvider } from 'next-auth/react';

import { AuthProvider } from '@/context/AuthContext';
import { PlayerProvider } from '@/context/PlayerContext';
import { QueueProvider } from '@/context/QueueContext';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Spotify Clone',
  description: 'Spotify Clone',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
