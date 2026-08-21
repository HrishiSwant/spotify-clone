'use client';

import { useMemo } from 'react';

import { usePlayer } from '@/context/PlayerContext';
import { msToTime } from '@/lib/utils';

export default function ProgressBar() {
  const {
    progress,
    duration,
    seek,
  } = usePlayer();

  const current = useMemo(
    () => msToTime(progress),
    [progress]
  );

  const total = useMemo(
    () => msToTime(duration),
    [duration]
  );

  return (
    <div className="mt-3 flex w-full max-w-[620px] items-center gap-3">
      <span className="w-10 text-right text-[11px] text-neutral-400">
        {current}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 1}
        value={progress}
        onChange={(e) =>
          seek(Number(e.target.value))
        }
        className="h-1 flex-1 cursor-pointer accent-[#1DB954]"
      />

      <span className="w-10 text-[11px] text-neutral-400">
        {total}
      </span>
    </div>
  );
}
