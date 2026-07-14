'use client';
import { usePlayer } from '@/context/PlayerContext';
import { Play } from 'lucide-react';

export default function TrackItem({ track, index, queue }) {
  const { playTrack, currentTrack } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <div
      onClick={() => playTrack(track, queue)}
      className={`group grid grid-cols-[16px_4fr_2fr_1fr] gap-4 items-center px-4 py-2 rounded hover:bg-neutral-800 cursor-pointer ${
        isActive ? 'text-spotify-green' : 'text-white'
      }`}
    >
      <div className="text-neutral-400 text-sm relative">
        <span className="group-hover:hidden">{index + 1}</span>
        <Play size={14} className="hidden group-hover:block" />
      </div>
      <div className="flex items-center gap-3 min-w-0">
        {track.album?.images?.[track.album.images.length - 1] && (
          <img
            src={track.album.images[track.album.images.length - 1].url}
            alt=""
            className="w-10 h-10 rounded"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm">{track.name}</p>
          <p className="truncate text-xs text-neutral-400">
            {track.artists?.map((a) => a.name).join(', ')}
          </p>
        </div>
      </div>
      <p className="truncate text-xs text-neutral-400">{track.album?.name}</p>
      <p className="text-xs text-neutral-400 text-right">
        {msToTime(track.duration_ms)}
      </p>
    </div>
  );
}

function msToTime(ms) {
  if (!ms) return '';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
