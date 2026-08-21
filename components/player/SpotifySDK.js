'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { usePlayer } from '@/context/PlayerContext';
import spotifyPlayer from '@/lib/spotify/player';

export default function SpotifySDK() {
  const { data: session } = useSession();

  const {
    setDeviceId,
    setCurrentTrack,
    setPlaying,
    setProgress,
    setDuration,
  } = usePlayer();

  useEffect(() => {
    if (!session?.accessToken) return;

    let player;

    async function initialize() {
      if (!window.Spotify) return;

      player = new window.Spotify.Player({
        name: 'Spotify Clone',

        getOAuthToken: (cb) =>
          cb(session.accessToken),

        volume: 0.8,
      });

      player.addListener(
        'ready',
        async ({ device_id }) => {
          setDeviceId(device_id);

          try {
            await spotifyPlayer.transfer(
              device_id
            );
          } catch (err) {
            console.error(err);
          }
        }
      );

      player.addListener(
        'player_state_changed',
        (state) => {
          if (!state) return;

          setPlaying(!state.paused);

          setProgress(state.position);

          setDuration(state.duration);

          setCurrentTrack(
            state.track_window.current_track
          );
        }
      );

      player.addListener(
        'initialization_error',
        console.error
      );

      player.addListener(
        'authentication_error',
        console.error
      );

      player.addListener(
        'account_error',
        console.error
      );

      player.addListener(
        'playback_error',
        console.error
      );

      await player.connect();

      window.spotifyPlayer = player;
    }

    if (window.Spotify) {
      initialize();
    } else {
      window.addEventListener(
        'spotify-sdk-ready',
        initialize
      );
    }

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [session]);

  return null;
}
