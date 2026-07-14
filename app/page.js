"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack } = usePlayer();

  useEffect(() => {
    async function load() {
      try {
        const fRes = await fetch("/api/spotify?type=featured");
        const fData = await fRes.json();
        setFeatured(fData?.playlists?.items || []);

        const nRes = await fetch("/api/spotify?type=new-releases");
        const nData = await nRes.json();
        setNewReleases(nData?.albums?.items || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-neutral-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 overflow-y-auto h-full">
      <section>
        <h1 className="text-3xl font-bold mb-6">Good evening</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map((pl) => (
            <Link
              key={pl.id}
              href={`/playlist/${pl.id}`}
              className="flex items-center bg-neutral-800/60 hover:bg-neutral-700/70 rounded-md overflow-hidden transition group"
            >
              <img
                src={pl.images?.[0]?.url}
                alt={pl.name}
                className="w-16 h-16 object-cover"
              />
              <span className="px-4 font-semibold truncate">{pl.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">New Releases</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {newReleases.map((album) => (
            <div
              key={album.id}
              className="bg-neutral-800/40 hover:bg-neutral-800 p-4 rounded-md transition cursor-pointer group"
              onClick={() =>
                playTrack({
                  name: album.name,
                  artist: album.artists?.[0]?.name,
                  image: album.images?.[0]?.url,
                })
              }
            >
              <div className="relative">
                <img
                  src={album.images?.[0]?.url}
                  alt={album.name}
                  className="w-full aspect-square object-cover rounded-md mb-3"
                />
                <button className="absolute bottom-2 right-2 bg-green-500 text-black rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg transition">
                  ▶
                </button>
              </div>
              <p className="font-semibold truncate">{album.name}</p>
              <p className="text-sm text-neutral-400 truncate">
                {album.artists?.map((a) => a.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
