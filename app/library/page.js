'use client';
import { useEffect, useState } from 'react';
import PlaylistCard from '@/components/PlaylistCard';

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch('/api/spotify?action=myPlaylists')
      .then((r) => r.json())
      .then((d) => setPlaylists(d.items || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Library</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {playlists.map((p) => (
          <PlaylistCard key={p.id} item={p} />
        ))}
      </div>
    </div>
  );
}
