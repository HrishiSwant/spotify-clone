'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

import { usePlayer } from '@/context/PlayerContext';
import spotifyPlayer from '@/lib/spotify/player';

export default function SpotifySDK() {
  const { data: session, status } = useSession();
  const initialized = useRef(false);

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
    if (status !== 'authenticated' || !session?.accessToken) {
      return;
    }

    if (initialized.current) return;

    let player = null;
    let cancelled = false;

    async function initializePlayer() {
      if (cancelled || initialized.current) return;
      if (!window.Spotify) {
        console.warn('Spotify SDK not ready yet');
        return;
      }

      initialized.current = true;
      console.log('Initializing Spotify Player...');

      player = new window.Spotify.Player({
        name: 'Spotify Clone',
        getOAuthToken: (cb) => {
          cb(session.accessToken);
        },
        volume: 0.8,
      });

      window.spotifyPlayer = player;

      player.addListener('ready', async ({ device_id }) => {
        if (cancelled) return;
        console.log('Spotify Player READY – Device ID:', device_id);
        setDeviceId(device_id);

        // Soft transfer – don't fail hard if no previous device
        try {
          await spotifyPlayer.transfer(device_id);
        } catch (err) {
          // 404 is common when no device is active yet – ignore
          console.warn(
            'Initial transfer skipped/failed (normal on first load):',
            err?.message || err
          );
        }
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.warn('Spotify Device Offline:', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) return;

        const track = state.track_window?.current_track;
        if (track) setCurrentTrack(track);

        setPlaying(!state.paused);
        setProgress(state.position);
        setDuration(state.duration);
        setQueue(state.track_window?.next_tracks || []);

        player
          .getVolume()
          .then((v) => setVolume(Math.round(v * 100)))
          .catch(() => {});
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization Error:', message);
        initialized.current = false;
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication Error:', message);
        initialized.current = false;
      });

      player.addListener('account_error', ({ message }) => {
        console.error(
          'Account Error (Premium required for Web Playback):',
          message
        );
      });

      player.addListener('playback_error', ({ message }) => {
        console.error('Playback Error:', message);
      });

      const connected = await player.connect();
      console.log('Spotify Connected:', connected);

      if (!connected) {
        initialized.current = false;
        console.error('Spotify player failed to connect');
      }
    }

    // If SDK already loaded
    if (window.Spotify) {
      initializePlayer();
    } else {
      // Wait for the event we fire from layout.js
      const onReady = () => {
        initializePlayer();
      };
      window.addEventListener('spotify-sdk-ready', onReady);

      // Fallback: also set the classic global
      window.onSpotifyWebPlaybackSDKReady = () => {
        window.dispatchEvent(new CustomEvent('spotify-sdk-ready'));
        initializePlayer();
      };

      return () => {
        cancelled = true;
        window.removeEventListener('spotify-sdk-ready', onReady);
      };
    }

    return () => {
      cancelled = true;
      if (player) {
        try {
          player.disconnect();
        } catch (_) {}
      }
    };
  }, [session?.accessToken, status]);

  return null;
}
