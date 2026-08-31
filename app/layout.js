import './globals.css';

import Script from 'next/script';
import { Inter } from 'next/font/google';

import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Spotify Clone',
  description: 'Spotify Clone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Script
          src="https://sdk.scdn.co/spotify-player.js"
          strategy="afterInteractive"
        />

        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
