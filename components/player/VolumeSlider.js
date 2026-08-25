'use client';

import {
  VolumeX,
  Volume1,
  Volume2,
} from 'lucide-react';

import { usePlayer } from '@/context/PlayerContext';
import usePlayback from '@/hooks/usePlayback';

export default function VolumeSlider() {
  const {
    volume,
    muted,
    setVolume,
    toggleMute,
  } = usePlayer();

  const playback = usePlayback();

  function VolumeIcon() {
    if (muted || volume === 0) {
      return <VolumeX size={18} />;
    }

    if (volume < 50) {
      return <Volume1 size={18} />;
    }

    return <Volume2 size={18} />;
  }

  async function handleVolumeChange(e) {
    const value = Number(e.target.value);

    try {
      await setVolume(value);
      await playback.volume(value);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleMute() {
    try {
      await toggleMute();

      if (muted) {
        await playback.volume(volume);
      } else {
        await playback.volume(0);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex w-44 items-center gap-3">

      <button
        onClick={handleMute}
        className="text-neutral-400 transition hover:text-white"
      >
        <VolumeIcon />
      </button>

      <input
        type="range"
        min={0}
        max={100}
        value={muted ? 0 : volume}
        onChange={handleVolumeChange}
        className="h-1 w-full cursor-pointer accent-[#1DB954]"
      />

    </div>
  );
}
