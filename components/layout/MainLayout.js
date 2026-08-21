'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import Player from '@/components/player/Player';

export default function MainLayout({ children }) {
  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <div className="grid grid-cols-[280px_1fr] h-[calc(100vh-90px)] gap-2 p-2">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="bg-[#121212] rounded-lg overflow-hidden flex flex-col">
          <Header />

          <div className="flex-1 overflow-y-auto px-6 pb-10 pt-4">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Player */}
      <Player />
    </div>
  );
}
