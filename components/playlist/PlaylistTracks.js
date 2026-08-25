'use client';

import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';

import { usePlayer } from '@/context/PlayerContext';
import usePlayback from '@/hooks/usePlayback';

import {
  formatArtists,
  msToTime,
  getImage,
} from '@/lib/utils';

export default function PlaylistTracks({
  tracks = [],
  contextUri,
}) {
  const playback = usePlayback();

  const {
    currentTrack,
    playTrack,
  } = usePlayer();

  const [loadingTrack, setLoadingTrack] =
    useState(null);

  async function handlePlay(track, index) {
    if (!track) return;

    try {
      setLoadingTrack(track.id);

      // Update player context immediately
      playTrack(track, tracks);

      if (contextUri) {
        await playback.playPlaylist(
          contextUri,
          index
        );
      } else {
        await playback.playTrack(track);
      }
    } catch (err) {
      console.error(
        'Failed to play track',
        err
      );
    } finally {
      setLoadingTrack(null);
    }
  }

  return (
    <div className="mt-8">

      <div className="grid grid-cols-[40px_4fr_3fr_80px] gap-4 border-b border-neutral-800 px-6 py-2 text-xs uppercase tracking-wider text-neutral-400">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span className="text-right">
          Time
        </span>
      </div>

      {tracks.map((item, index) => {
        const track = item.track || item;

        const active =
          currentTrack?.id === track.id;

        const loading =
          loadingTrack === track.id;

        return (
          <button
            key={`${track.id}-${index}`}
            onClick={() =>
              handlePlay(track, index)
            }
            disabled={loading}
            className={`group grid w-full grid-cols-[40px_4fr_3fr_80px] gap-4 px-6 py-2 text-left transition hover:bg-neutral-800 disabled:opacity-60 ${
              active
                ? 'text-[#1DB954]'
                : 'text-white'
            }`}
          >
            <div className="flex items-center justify-center">

              {loading ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <>
                  <span className="group-hover:hidden">
                    {index + 1}
                  </span>

                  <Play
                    size={15}
                    className="hidden group-hover:block"
                    fill="currentColor"
                  />
                </>
              )}

            </div>

            <div className="flex min-w-0 items-center gap-3">

              <img
                src={getImage(
                  track.album?.images
                )}
                alt=""
                className="h-10 w-10 rounded object-cover"
              />

              <div className="min-w-0">

                <p className="truncate text-sm font-medium">
                  {track.name}
                </p>

                <p className="truncate text-xs text-neutral-400">
                  {formatArtists(
                    track.artists
                  )}
                </p>

              </div>

            </div>

            <p className="truncate text-sm text-neutral-400">
              {track.album?.name}
            </p>

            <p className="text-right text-sm text-neutral-400">
              {msToTime(
                track.duration_ms
              )}
            </p>

          </button>
        );
      })}

    </div>
  );
}
