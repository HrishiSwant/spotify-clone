'use client';

import { useEffect } from 'react';

import useSearch from '@/hooks/useSearch';

import PlaylistGrid from '@/components/playlist/PlaylistGrid';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function SearchPage() {
  const {
    query,
    setQuery,

    tracks,
    playlists,
    artists,
    albums,

    search,
    loading,
  } = useSearch();

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [query, search]);

  const hasResults =
    tracks.length > 0 ||
    playlists.length > 0 ||
    artists.length > 0 ||
    albums.length > 0;

  return (
    <div className="pb-28 px-8 pt-8">

      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="What do you want to listen to?"
        className="mb-8 w-full rounded-full bg-[#242424] px-5 py-3 text-white outline-none placeholder:text-neutral-400"
      />

      {loading && (
        <p className="text-neutral-400">
          Searching...
        </p>
      )}

      {!loading &&
        query.trim() !== '' &&
        !hasResults && (
          <p className="text-neutral-400">
            No results found.
          </p>
        )}

      {!loading &&
        tracks.length > 0 && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-white">
              Songs
            </h2>

            <PlaylistTracks
              tracks={tracks}
            />
          </>
        )}

      {!loading &&
        playlists.length > 0 && (
          <>
            <h2 className="mt-12 mb-4 text-2xl font-bold text-white">
              Playlists
            </h2>

            <PlaylistGrid
              playlists={playlists}
            />
          </>
        )}

      {!loading &&
        albums.length > 0 && (
          <>
            <h2 className="mt-12 mb-4 text-2xl font-bold text-white">
              Albums
            </h2>

            <PlaylistGrid
              playlists={albums}
            />
          </>
        )}

      {!loading &&
        artists.length > 0 && (
          <>
            <h2 className="mt-12 mb-4 text-2xl font-bold text-white">
              Artists
            </h2>

            <PlaylistGrid
              playlists={artists}
            />
          </>
        )}

    </div>
  );
}
