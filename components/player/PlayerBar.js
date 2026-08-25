'use client';

import {
  Heart,
  ListMusic,
  MonitorSpeaker,
  Mic2,
} from 'lucide-react';

import { usePlayer } from '@/context/PlayerContext';
import usePlayback from '@/hooks/usePlayback';

import TrackInfo from './TrackInfo';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';

export default function PlayerBar() {
  const { currentTrack } = usePlayer();

  const playback = usePlayback();

  async function handleLike() {
    if (!currentTrack?.id) return;

    try {
      const liked =
        await playback.isTrackLiked(
          currentTrack.id
        );

      if (liked?.[0]) {
        await playback.unlikeTrack(
          currentTrack.id
        );
      } else {
        await playback.likeTrack(
          currentTrack.id
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex h-24 items-center justify-between border-t border-neutral-800 bg-[#181818] px-4">

      {/* LEFT */}

      <div className="flex w-[30%] min-w-0 items-center gap-4">

        <TrackInfo />

        {currentTrack && (
          <button
            onClick={handleLike}
            className="text-neutral-400 transition hover:text-[#1DB954]"
          >
            <Heart size={18} />
          </button>
        )}

      </div>

      {/* CENTER */}

      <div className="flex w-[40%] flex-col items-center">

        <Controls />

        <ProgressBar />

      </div>

      {/* RIGHT */}

      <div className="flex w-[30%] items-center justify-end gap-4">

        <button className="text-neutral-400 transition hover:text-white">
          <Mic2 size={18} />
        </button>

        <button className="text-neutral-400 transition hover:text-white">
          <ListMusic size={18} />
        </button>

        <button className="text-neutral-400 transition hover:text-white">
          <MonitorSpeaker size={18} />
        </button>

        <VolumeSlider />

      </div>

    </footer>
  );
}
