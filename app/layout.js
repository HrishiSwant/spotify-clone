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
      <head>
        {/* MUST exist before Spotify SDK loads - fixes AnthemError */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onSpotifyWebPlaybackSDKReady = function() {
                window.dispatchEvent(new CustomEvent('spotify-sdk-ready'));
              };
            `,
          }}
        />
      </head>
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
