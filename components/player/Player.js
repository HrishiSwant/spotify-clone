'use client';

import {
  Heart,
  ListMusic,
  MonitorSpeaker,
  Mic2,
} from 'lucide-react';

import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';

import { usePlayer } from '@/context/PlayerContext';
import {
  formatArtists,
  getImage,
} from '@/lib/utils';

export default function Player() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-[90px] border-t border-neutral-800 bg-[#181818]">
      <div className="grid h-full grid-cols-[320px_1fr_320px] items-center px-4">

        {/* LEFT */}

        <div className="flex items-center gap-4 overflow-hidden">

          <img
            src={getImage(
              currentTrack.album?.images
            )}
            alt={currentTrack.name}
            className="h-14 w-14 rounded object-cover"
          />

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-semibold text-white">
              {currentTrack.name}
            </h4>

            <p className="truncate text-xs text-neutral-400">
              {formatArtists(
                currentTrack.artists
              )}
            </p>
          </div>

          <button className="text-neutral-400 hover:text-white">
            <Heart size={18} />
          </button>

        </div>

        {/* CENTER */}

        <div className="flex flex-col items-center justify-center">

          <Controls />

          <ProgressBar />

        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-end gap-4">

          <button className="text-neutral-400 hover:text-white">
            <Mic2 size={18} />
          </button>

          <button className="text-neutral-400 hover:text-white">
            <ListMusic size={18} />
          </button>

          <button className="text-neutral-400 hover:text-white">
            <MonitorSpeaker size={18} />
          </button>

          <VolumeSlider />

        </div>

      </div>
    </footer>
  );
}
