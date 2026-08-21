'use client';

import { useEffect } from 'react';

import useSearch from '@/hooks/useSearch';

import PlaylistGrid from '@/components/playlist/PlaylistGrid';

export default function SearchPage() {
  const {
    query,
    setQuery,

    tracks,
    artists,
    albums,
    playlists,

    search,
    loading,
  } = useSearch();

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-10">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="What do you want to listen to?"
          className="w-full rounded-full bg-white px-6 py-4 text-black text-lg outline-none"
        />
      </div>

      {loading && (
        <p className="text-neutral-400">
          Searching...
        </p>
      )}

      {!loading && (
        <>
          <PlaylistGrid
            title="Songs"
            items={tracks}
            type="track"
          />

          <PlaylistGrid
            title="Artists"
            items={artists}
            type="artist"
          />

          <PlaylistGrid
            title="Albums"
            items={albums}
            type="album"
          />

          <PlaylistGrid
            title="Playlists"
            items={playlists}
            type="playlist"
          />
        </>
      )}
    </div>
  );
}
