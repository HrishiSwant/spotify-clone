'use client';

import { useEffect } from 'react';

import { usePlayer } from '@/context/PlayerContext';
import { msToTime } from '@/lib/utils';

export default function ProgressBar() {
  const {
    progress,
    duration,
    seek,
    playing,
  } = usePlayer();

  useEffect(() => {
    let interval;

    if (playing && window.spotifyPlayer) {
      interval = setInterval(async () => {
        const state =
          await window.spotifyPlayer.getCurrentState();

        if (!state) return;

        seek(state.position, false);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="mt-3 flex w-full max-w-[620px] items-center gap-3">
      <span className="w-10 text-right text-[11px] text-neutral-400">
        {msToTime(progress)}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 1}
        value={progress}
        onChange={(e) =>
          seek(Number(e.target.value), true)
        }
        className="h-1 flex-1 cursor-pointer accent-[#1DB954]"
      />

      <span className="w-10 text-[11px] text-neutral-400">
        {msToTime(duration)}
      </span>
    </div>
  );
}
