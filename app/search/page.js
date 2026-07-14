"use client";

import { useState, useEffect, useCallback } from "react";
import { usePlayer } from "@/context/PlayerContext";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { playTrack } = usePlayer();

  const runSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/spotify?type=search&q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setResults(data?.tracks?.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => runSearch(query), 400);
    return () => clearTimeout(t);
  }, [query, runSearch]);

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

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="sticky top-0 bg-neutral-900/95 backdrop-blur pb-4 z-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full max-w-md bg-white text-black rounded-full px-5 py-3 outline-none font-medium"
          autoFocus
        />
      </div>

      {loading && <p className="text-neutral-400 mt-4">Searching...</p>}

      <div className="mt-4 space-y-1">
        {results.map((track) => (
          <div
            key={track.id}
            onClick={() => handlePlay(track)}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-neutral-800 cursor-pointer group"
          >
            <img
              src={track.album?.images?.[track.album.images.length - 1]?.url}
              alt={track.name}
              className="w-12 h-12 object-cover rounded"
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
        ))}
      </div>
    </div>
  );
}
