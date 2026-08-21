'use client';

import {
  VolumeX,
  Volume1,
  Volume2,
} from 'lucide-react';

import { usePlayer } from '@/context/PlayerContext';

export default function VolumeSlider() {
  const {
    volume,
    muted,
    setVolume,
    toggleMute,
  } = usePlayer();

  function VolumeIcon() {
    if (muted || volume === 0) {
      return <VolumeX size={18} />;
    }

    if (volume < 50) {
      return <Volume1 size={18} />;
    }

    return <Volume2 size={18} />;
  }

  return (
    <div className="flex w-44 items-center gap-3">
      <button
        onClick={toggleMute}
        className="text-neutral-400 transition hover:text-white"
      >
        <VolumeIcon />
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
