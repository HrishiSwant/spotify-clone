'use client';

import { Volume2, VolumeX } from 'lucide-react';

import { usePlayer } from '@/context/PlayerContext';

export default function VolumeSlider() {
  const {
    volume,
    muted,
    setVolume,
    toggleMute,
  } = usePlayer();

  return (
    <div className="flex w-40 items-center gap-3">
      <button
        onClick={toggleMute}
        className="text-neutral-400 transition hover:text-white"
      >
        {muted || volume === 0 ? (
          <VolumeX size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>

      <input
        type="range"
        min={0}
        max={100}
        value={muted ? 0 : volume}
        onChange={(e) =>
          setVolume(Number(e.target.value))
        }
        className="h-1 w-full cursor-pointer accent-[#1DB954]"
      />
    </div>
  );
}
