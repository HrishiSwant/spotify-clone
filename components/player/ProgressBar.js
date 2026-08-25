'use client';

import { useEffect } from 'react';

import { usePlayer } from '@/context/PlayerContext';
import usePlayback from '@/hooks/usePlayback';

import { msToTime } from '@/lib/utils';

export default function ProgressBar() {
  const {
    progress,
    duration,
    playing,

    setProgress,
    setDuration,
  } = usePlayer();

  const playback = usePlayback();

  useEffect(() => {
    let interval;

    async function syncPlayback() {
      try {
        const state =
          await playback.currentPlayback();

        if (!state) return;

        setProgress(
          state.progress_ms || 0
        );

        setDuration(
          state.item?.duration_ms || 0
        );
      } catch (err) {
        console.error(err);
      }
    }

    syncPlayback();

    if (playing) {
      interval = setInterval(
        syncPlayback,
        1000
      );
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [playing]);

  async function handleSeek(e) {
    const position = Number(
      e.target.value
    );

    setProgress(position);

    try {
      await playback.seek(position);
    } catch (err) {
      console.error(err);
    }
  }

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
        onChange={handleSeek}
        className="h-1 flex-1 cursor-pointer accent-[#1DB954]"
      />

      <span className="w-10 text-[11px] text-neutral-400">
        {msToTime(duration)}
      </span>

    </div>
  );
}
