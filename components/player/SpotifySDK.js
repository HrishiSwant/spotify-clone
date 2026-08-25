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
    setVolume,
    setQueue,
  } = usePlayer();

  useEffect(() => {
    if (!session?.accessToken) return;

    let player;

    async function initializePlayer() {
      if (!window.Spotify) return;

      player = new window.Spotify.Player({
        name: 'Spotify Clone',

        getOAuthToken: (cb) => {
          cb(session.accessToken);
        },

        volume: 0.8,
      });

      player.addListener(
        'ready',
        async ({ device_id }) => {
          console.log(
            'Spotify Player Ready:',
            device_id
          );

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
        'not_ready',
        ({ device_id }) => {
          console.log(
            'Device Offline:',
            device_id
          );
        }
      );

      player.addListener(
        'player_state_changed',
        (state) => {
          if (!state) return;

          const track =
            state.track_window.current_track;

          setCurrentTrack(track);

          setPlaying(!state.paused);

          setProgress(state.position);

          setDuration(state.duration);

          setQueue(
            state.track_window.next_tracks || []
          );

          player
            .getVolume()
            .then((value) => {
              setVolume(
                Math.round(value * 100)
              );
            })
            .catch(() => {});
        }
      );

      player.addListener(
        'initialization_error',
        ({ message }) => {
          console.error(
            'Initialization Error:',
            message
          );
        }
      );

      player.addListener(
        'authentication_error',
        ({ message }) => {
          console.error(
            'Authentication Error:',
            message
          );
        }
      );

      player.addListener(
        'account_error',
        ({ message }) => {
          console.error(
            'Account Error:',
            message
          );
        }
      );

      player.addListener(
        'playback_error',
        ({ message }) => {
          console.error(
            'Playback Error:',
            message
          );
        }
      );

      const connected =
        await player.connect();

      console.log(
        'Spotify Connected:',
        connected
      );

      window.spotifyPlayer = player;
    }

    if (window.Spotify) {
      initializePlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady =
        initializePlayer;
    }

    return () => {
      if (player) {
        player.disconnect();
      }

      window.spotifyPlayer = null;
    };
  }, [session]);

  return null;
}
