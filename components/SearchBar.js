'use client';
import Link from 'next/link';
import { Home, Search, Library, Heart, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!session?.accessToken) return;
    fetch('/api/spotify?action=myPlaylists')
      .then(r => r.json())
      .then(d => setPlaylists(d.items || []))
      .catch(() => {});
  }, [session]);

  return (
    <aside className="hidden md:flex w-64 bg-black flex-col p-2 gap-2">
      <div className="bg-neutral-900 rounded-lg p-4 space-y-4">
        <Link href="/" className="flex items-center gap-4 text-neutral-400 hover:text-white">
          <Home size={24} /> <span className="font-bold">Home</span>
        </Link>
        <Link href="/search" className="flex items-center gap-4 text-neutral-400 hover:text-white">
          <Search size={24} /> <span className="font-bold">Search</span>
        </Link>
      </div>
      <div className="bg-neutral-900 rounded-lg p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between text-neutral-400 hover:text-white mb-4">
          <Link href="/library" className="flex items-center gap-4">
            <Library size={24} /> <span className="font-bold">Your Library</span>
          </Link>
          <Plus size={20} className="cursor-pointer" />
        </div>
        <ul className="space-y-2">
          {playlists.map(p => (
            <li key={p.id}>
              <Link
                href={`/playlist/${p.id}`}
                className="flex gap-3 items-center hover:bg-neutral-800 p-2 rounded"
              >
                {p.images?.[0] && (
                  <img src={p.images[0].url} alt={p.name} className="w-10 h-10 rounded" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm">{p.name}</p>
                  <p className="truncate text-xs text-neutral-400">
                    {p.owner?.display_name}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
