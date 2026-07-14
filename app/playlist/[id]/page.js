'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TrackList from '@/components/TrackList';

export default function PlaylistPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/spotify?action=playlist&id=${id}`)
      .then((r) => r.json())
      .then((d) => setPlaylist(d))
      .catch(() => {});
    fetch(`/api/spotify?action=playlistTracks&id=${id}`)
      .then((r) => r.json())
      .then((d) => setTracks((d.items || []).map((i) => i.track).filter(Boolean)))
      .catch(() => {});
  }, [id]);

  return (
    <div className="space-y-6">
      {playlist && (
        <div className="flex items-end gap-6">
          {playlist.images?.[0] && (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="w-48 h-48 rounded shadow-lg"
            />
          )}
          <div>
            <p className="text-xs uppercase text-neutral-400">Playlist</p>
            <h1 className="text-4xl font-bold">{playlist.name}</h1>
            <p className="text-sm text-neutral-400 mt-2">
              {playlist.description}
            </p>
          </div>
        </div>
      )}
      <TrackList tracks={tracks} />
    </div>
  );
}
