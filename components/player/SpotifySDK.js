'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { usePlayer } from '@/context/PlayerContext';

export default function SpotifySDK() {
  const { data: session } = useSession();

  const {
    setDeviceId,
    setPlaying,
    setProgress,
    setDuration,
    setCurrentTrack,
  } = usePlayer();

  useEffect(() => {
    if (!session?.accessToken) return;

    function initializePlayer() {
      if (!window.Spotify) return;

      const player = new window.Spotify.Player({
        name: 'Spotify Clone',

        getOAuthToken: (cb) => {
          cb(session.accessToken);
        },

        volume: 0.8,
      });

      player.addListener(
        'ready',
        ({ device_id }) => {
          console.log(
            'Spotify Device:',
            device_id
          );

          setDeviceId(device_id);
        }
      );

      player.addListener(
        'player_state_changed',
        (state) => {
          if (!state) return;

          setPlaying(!state.paused);

          setProgress(state.position);

          setDuration(state.duration);

          if (state.track_window.current_track) {
            setCurrentTrack(
              state.track_window.current_track
            );
          }
        }
      );

      player.connect();

      window.spotifyPlayer = player;
    }

    if (window.Spotify) {
      initializePlayer();
    } else {
      window.addEventListener(
        'spotify-sdk-ready',
        initializePlayer
      );
    }

    return () => {
      if (window.spotifyPlayer) {
        window.spotifyPlayer.disconnect();
      }
    };
  }, [session]);

  return null;
}
