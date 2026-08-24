'use client';

import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from 'lucide-react';

export default function PlayerControls({
  playing = false,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}) {
  return (
    <div className="flex items-center justify-center gap-5">

      <button
        onClick={onPrevious}
        className="text-neutral-400 transition hover:text-white"
      >
        <SkipBack size={22} />
      </button>

      <button
        onClick={playing ? onPause : onPlay}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
      >
        {playing ? (
          <Pause size={22} fill="currentColor" />
        ) : (
          <Play
            size={22}
            fill="currentColor"
            className="ml-1"
          />
        )}
      </button>

      <button
        onClick={onNext}
        className="text-neutral-400 transition hover:text-white"
      >
        <SkipForward size={22} />
      </button>

    </div>
  );
}
