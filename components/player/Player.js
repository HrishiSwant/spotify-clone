'use client';

import PlayerBar from './PlayerBar';
import SpotifyPlayer from './SpotifyPlayer';

export default function Player() {
  return (
    <>
      <SpotifyPlayer />
      <PlayerBar />
    </>
  );
}
