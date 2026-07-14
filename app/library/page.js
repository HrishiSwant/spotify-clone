"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LibraryPage() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const res = await fetch("/api/spotify?type=my-playlists");
        const data = await res.json();
        setPlaylists(data?.items || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <h2 className="text-2xl font-bold mb-2">Your Library</h2>
        <p className="text-neutral-400">
          Log in with Spotify to see your playlists.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-neutral-400">Loading your library...</div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {playlists.map((pl) => (
          <Link
            key={pl.id}
            href={`/playlist/${pl.id}`}
            className="bg-neutral-800/40 hover:bg-neutral-800 p-4 rounded-md transition"
          >
            <img
              src={pl.images?.[0]?.url || "/placeholder.png"}
              alt={pl.name}
              className="w-full aspect-square object-cover rounded-md mb-3"
            />
            <p className="font-semibold truncate">{pl.name}</p>
            <p className="text-sm text-neutral-400 truncate">
              {pl.tracks?.total} tracks
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
