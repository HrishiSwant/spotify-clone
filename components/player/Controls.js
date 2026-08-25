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
import usePlayback from '@/hooks/usePlayback';

export default function Controls() {
  const {
    playing,
    shuffle,
    repeat,
    setPlaying,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const playback = usePlayback();

  async function handlePlayPause() {
    try {
      await playback.togglePlayback();
      setPlaying(!playing);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleNext() {
    try {
      await playback.next();
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePrevious() {
    try {
      await playback.previous();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleShuffle() {
    try {
      const newState = !shuffle;

      toggleShuffle();

      await playback.shuffle(newState);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRepeat() {
    try {
      const newState = !repeat;

      toggleRepeat();

      await playback.repeat(
        newState
          ? 'context'
          : 'off'
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex items-center gap-5">

      <button
        onClick={handleShuffle}
        className={
          shuffle
            ? 'text-[#1DB954]'
            : 'text-neutral-500 hover:text-white'
        }
      >
        <Shuffle size={18} />
      </button>

      <button
        onClick={handlePrevious}
        className="text-neutral-300 hover:text-white"
      >
        <SkipBack
          size={20}
          fill="currentColor"
        />
      </button>

      <button
        onClick={handlePlayPause}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
      >
        {playing ? (
          <Pause
            size={18}
            fill="currentColor"
          />
        ) : (
          <Play
            size={18}
            fill="currentColor"
          />
        )}
      </button>

      <button
        onClick={handleNext}
        className="text-neutral-300 hover:text-white"
      >
        <SkipForward
          size={20}
          fill="currentColor"
        />
      </button>

      <button
        onClick={handleRepeat}
        className={
          repeat
            ? 'text-[#1DB954]'
            : 'text-neutral-500 hover:text-white'
        }
      >
        <Repeat2 size={18} />
      </button>

    </div>
  );
}
