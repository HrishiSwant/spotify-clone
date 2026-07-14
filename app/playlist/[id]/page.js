"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { usePlayer } from "@/context/PlayerContext";

export default function PlaylistPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack } = usePlayer();

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`/api/spotify?type=playlist&id=${id}`);
        const data = await res.json();
        setPlaylist(data);
        setTracks(data?.tracks?.items || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handlePlay(track) {
    try {
      const yt = await fetch(
        `/api/youtube?q=${encodeURIComponent(
          `${track.name} ${track.artists?.[0]?.name}`
        )}`
      );
      const ytData = await yt.json();
      const videoId = ytData?.items?.[0]?.id?.videoId;
      playTrack({
        name: track.name,
        artist: track.artists?.map((a) => a.name).join(", "),
        image: track.album?.images?.[0]?.url,
        videoId,
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-neutral-400">Loading playlist...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-neutral-400">Playlist not found.</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-neutral-700/60 to-neutral-900">
        <img
          src={playlist.images?.[0]?.url}
          alt={playlist.name}
          className="w-48 h-48 object-cover shadow-2xl rounded"
        />
        <div>
          <p className="uppercase text-xs font-bold tracking-wider">Playlist</p>
          <h1 className="text-5xl font-extrabold my-3">{playlist.name}</h1>
          <p className="text-neutral-300 text-sm">
            {playlist.description}
          </p>
          <p className="text-neutral-400 text-sm mt-2">
            {playlist.owner?.display_name} • {playlist.tracks?.total} songs
          </p>
        </div>
      </div>

      <div className="p-6 space-y-1">
        {tracks.map((item, i) => {
          const track = item.track || item;
          if (!track) return null;
          return (
            <div
              key={`${track.id}-${i}`}
              onClick={() => handlePlay(track)}
              className="flex items-center gap-4 p-2 rounded-md hover:bg-neutral-800 cursor-pointer group"
            >
              <span className="w-6 text-right text-neutral-400">{i + 1}</span>
              <img
                src={
                  track.album?.images?.[track.album.images.length - 1]?.url
                }
                alt={track.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div className="min-w-0">
                <p className="font-semibold truncate">{track.name}</p>
                <p className="text-sm text-neutral-400 truncate">
                  {track.artists?.map((a) => a.name).join(", ")}
                </p>
              </div>
              <span className="ml-auto text-neutral-500 text-sm pr-3">
                {Math.floor(track.duration_ms / 60000)}:
                {String(
                  Math.floor((track.duration_ms % 60000) / 1000)
                ).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
