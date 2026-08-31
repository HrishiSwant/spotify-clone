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
    console.log('========== SpotifySDK ==========');

    if (!session?.accessToken) {
      console.log('No Spotify access token.');
      return;
    }

    console.log('Spotify access token found.');

    let player;

    async function initializePlayer() {
      console.log('Initializing Spotify Player...');

      if (!window.Spotify) {
        console.error('Spotify Web Playback SDK not loaded.');
        return;
      }

      console.log('Spotify SDK Loaded.');

      player = new window.Spotify.Player({
        name: 'Spotify Clone',

        getOAuthToken: (cb) => {
          console.log('Providing OAuth token...');
          cb(session.accessToken);
        },

        volume: 0.8,
      });

      window.spotifyPlayer = player;

      // ==========================
      // READY
      // ==========================

      player.addListener(
        'ready',
        async ({ device_id }) => {
          console.log('=================================');
          console.log('Spotify Player READY');
          console.log('Device ID:', device_id);
          console.log('=================================');

          setDeviceId(device_id);

          try {
            console.log('Transferring playback...');

            const result =
              await spotifyPlayer.transfer(
                device_id
              );

            console.log(
              'Transfer Result:',
              result
            );
          } catch (err) {
            console.error(
              'Transfer Failed:',
              err
            );
          }
        }
      );

      // ==========================
      // NOT READY
      // ==========================

      player.addListener(
        'not_ready',
        ({ device_id }) => {
          console.warn(
            'Spotify Device Offline:',
            device_id
          );
        }
      );

      // ==========================
      // PLAYER STATE
      // ==========================

      player.addListener(
        'player_state_changed',
        (state) => {
          if (!state) {
            console.log(
              'Player state is null.'
            );
            return;
          }

          console.log(
            'Player State Updated'
          );

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
            .catch((err) =>
              console.error(
                'Volume Error:',
                err
              )
            );
        }
      );

      // ==========================
      // ERRORS
      // ==========================

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

      console.log(
        'Connecting to Spotify...'
      );

      const connected =
        await player.connect();

      console.log(
        'Spotify Connected:',
        connected
      );

      if (!connected) {
        console.error(
          'Spotify player failed to connect.'
        );
      }
    }

    if (window.Spotify) {
      initializePlayer();
    } else {
      console.log(
        'Waiting for Spotify SDK...'
      );

      window.onSpotifyWebPlaybackSDKReady =
        initializePlayer;
    }

    return () => {
      console.log(
        'Cleaning up Spotify Player...'
      );

      if (player) {
        player.removeListener('ready');
        player.removeListener('not_ready');
        player.removeListener(
          'player_state_changed'
        );
        player.removeListener(
          'initialization_error'
        );
        player.removeListener(
          'authentication_error'
        );
        player.removeListener(
          'account_error'
        );
        player.removeListener(
          'playback_error'
        );

        player.disconnect();
      }

      window.spotifyPlayer = null;
    };
  }, [session]);

  return null;
}
