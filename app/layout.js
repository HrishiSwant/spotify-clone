import './globals.css';
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Player from '@/components/Player';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Spotify Clone',
  description: 'A Spotify replica built with Next.js'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <div className="flex h-screen flex-col">
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-900 to-black">
                <Header />
                <div className="p-6">{children}</div>
              </main>
            </div>
            <Player />
          </div>
        </Providers>
      </body>
    </html>
  );
}
