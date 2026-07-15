'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import TrackList from '@/components/TrackList';
import PlaylistCard from '@/components/PlaylistCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setTracks([]);
      setPlaylists([]);
      return;
    }
    const t = setTimeout(() => {
      fetch(`/api/spotify?action=search&q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((d) => {
          setTracks(d.tracks?.items || []);
          setPlaylists(d.playlists?.items || []);
        })
        .catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="space-y-8">
      <SearchBar value={query} onChange={setQuery} />
      {tracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <TrackList tracks={tracks} />
        </section>
      )}
      {playlists.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {playlists.map((p) => (
              <PlaylistCard key={p.id} item={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
