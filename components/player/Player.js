'use client';

import { useEffect, useState } from 'react';

import {
  Heart,
  HeartOff,
  Loader2,
  ListMusic,
  MonitorSpeaker,
  Mic2,
} from 'lucide-react';

import SpotifyPlayer from './SpotifySDK';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';

import { usePlayer } from '@/context/PlayerContext';
import usePlayback from '@/hooks/usePlayback';

import {
  formatArtists,
  getImage,
} from '@/lib/utils';

export default function Player() {
  const { currentTrack } = usePlayer();

  const playback = usePlayback();

  const [liked, setLiked] = useState(false);
  const [loadingLike, setLoadingLike] =
    useState(false);

  useEffect(() => {
    async function loadLiked() {
      if (!currentTrack?.id) {
        setLiked(false);
        return;
      }

      try {
        const result =
          await playback.isTrackLiked(
            currentTrack.id
          );

        setLiked(
          Array.isArray(result)
            ? result[0]
            : false
        );
      } catch {
        setLiked(false);
      }
    }

    loadLiked();
  }, [currentTrack, playback]);

  async function toggleLike() {
    if (
      !currentTrack?.id ||
      loadingLike
    ) {
      return;
    }

    setLoadingLike(true);

    try {
      if (liked) {
        await playback.unlikeTrack(
          currentTrack.id
        );

        setLiked(false);
      } else {
        await playback.likeTrack(
          currentTrack.id
        );

        setLiked(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  }

  return (
    <>
      <SpotifyPlayer />

      {!currentTrack ? null : (
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

              <button
                onClick={toggleLike}
                disabled={loadingLike}
                className="text-neutral-400 transition hover:text-[#1DB954] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingLike ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : liked ? (
                  <Heart
                    size={18}
                    fill="currentColor"
                    className="text-[#1DB954]"
                  />
                ) : (
                  <HeartOff size={18} />
                )}
              </button>

            </div>

            {/* CENTER */}

            <div className="flex flex-col items-center justify-center">

              <Controls />

              <ProgressBar />

            </div>

            {/* RIGHT */}

            <div className="flex items-center justify-end gap-4">

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

          </div>
        </footer>
      )}
    </>
  );
}
