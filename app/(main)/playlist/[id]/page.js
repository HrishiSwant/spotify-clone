'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';

import playlists from '@/lib/spotify/playlists';
import client from '@/lib/spotify/client';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function PlaylistPage() {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function loadPlaylist() {
      try {
        setLoading(true);
        setError(false);

        // 1. Fetch playlist metadata
        const data = await playlists.playlist(id);

        if (cancelled) return;

        if (!data || data.error || data.status === 404) {
          setError(true);
          return;
        }

        setPlaylist(data);

        // 2. Prefer embedded tracks, but also try dedicated tracks endpoint
        let items = data.tracks?.items || [];

        // If embedded tracks are empty / incomplete, fetch tracks separately
        if (!items.length || items.every((i) => !i?.track && !i?.id)) {
          try {
            const tracksRes = await client.byId('playlistTracks', id);
            if (tracksRes?.items) {
              items = tracksRes.items;
            }
          } catch (e) {
            console.warn('playlistTracks fallback failed', e);
          }
        }

        // Normalize: always end up with real Track objects
        const normalized = (items || [])
          .map((item) => item?.track || item)
          .filter((t) => t && t.id && t.uri && !t.is_local);

        setTracks(normalized);
      } catch (err) {
        console.error('Failed to load playlist', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPlaylist();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    notFound();
  }

  if (loading || !playlist) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading playlist...
      </div>
    );
  }

  return (
    <div className="pb-28">
      <PlaylistHeader
        playlist={{
          ...playlist,
          tracks: {
            total: playlist.tracks?.total || tracks.length,
            items: tracks,
          },
        }}
      />

      <PlaylistTracks
        tracks={tracks}
        contextUri={playlist.uri}
      />
    </div>
  );
}
