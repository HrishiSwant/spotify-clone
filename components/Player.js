'use client';
import { usePlayer } from '@/context/PlayerContext';
import YouTube from 'react-youtube';
import { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    videoId,
    volume,
    setVolume,
    togglePlay,
    nextTrack,
    prevTrack
  } = usePlayer();
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isPlaying, videoId]);

  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume);
  }, [volume]);

  const onReady = (e) => {
    playerRef.current = e.target;
    e.target.setVolume(volume);
    if (isPlaying) e.target.playVideo();
  };

  return (
    <footer className="h-20 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-3 w-1/3 min-w-0">
        {currentTrack?.album?.images?.[0] && (
          <img
            src={currentTrack.album.images[0].url}
            alt=""
            className="w-14 h-14 rounded"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm">{currentTrack?.name || 'Nothing playing'}</p>
          <p className="truncate text-xs text-neutral-400">
            {currentTrack?.artists?.map((a) => a.name).join(', ')}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 w-1/3">
        <div className="flex items-center gap-6">
          <button onClick={prevTrack} className="text-neutral-400 hover:text-white">
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={nextTrack} className="text-neutral-400 hover:text-white">
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 w-1/3 justify-end">
        <Volume2 size={18} className="text-neutral-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 accent-spotify-green"
        />
      </div>

      {videoId && (
        <div className="hidden">
          <YouTube
            videoId={videoId}
            opts={{ height: '0', width: '0', playerVars: { autoplay: 1 } }}
            onReady={onReady}
            onEnd={nextTrack}
          />
        </div>
      )}
    </footer>
  );
}
