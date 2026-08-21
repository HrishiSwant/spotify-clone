'use client';

import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat2,
} from 'lucide-react';

import { usePlayer } from '@/context/PlayerContext';

export default function Controls() {
  const {
    playing,
    togglePlayback,
    nextTrack,
    previousTrack,
    shuffle,
    repeat,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={toggleShuffle}
        className={
          shuffle
            ? 'text-[#1DB954]'
            : 'text-neutral-400 hover:text-white'
        }
      >
        <Shuffle size={18} />
      </button>

      <button
        onClick={previousTrack}
        className="text-neutral-300 hover:text-white"
      >
        <SkipBack size={22} fill="currentColor" />
      </button>

      <button
        onClick={togglePlayback}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
      >
        {playing ? (
          <Pause size={18} fill="currentColor" />
        ) : (
          <Play size={18} fill="currentColor" />
        )}
      </button>

      <button
        onClick={nextTrack}
        className="text-neutral-300 hover:text-white"
      >
        <SkipForward size={22} fill="currentColor" />
      </button>

      <button
        onClick={toggleRepeat}
        className={
          repeat
            ? 'text-[#1DB954]'
            : 'text-neutral-400 hover:text-white'
        }
      >
        <Repeat2 size={18} />
      </button>
    </div>
  );
}
