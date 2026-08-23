import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Player from '@/components/player/Player';

export default function MainLayout({
  children,
}) {
  return (
    <div className="flex h-screen bg-black text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Header />

        <main className="flex-1 overflow-y-auto pb-[90px]">
          {children}
        </main>

      </div>

      <Player />

    </div>
  );
}
