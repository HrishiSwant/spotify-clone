'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PlaylistCard from '@/components/PlaylistCard';
import LoginButton from '@/components/LoginButton';
export const dynamic = 'force-dynamic';
export default function Home() {
  const { data: session, status } = useSession();
  const [featured, setFeatured] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!session?.accessToken) return;
    fetch('/api/spotify?action=featured')
      .then((r) => r.json())
      .then((d) => setFeatured(d.playlists?.items || d.items || []))
      .catch(() => {});
    fetch('/api/spotify?action=newReleases')
      .then((r) => r.json())
      .then((d) => setNewReleases(d.albums?.items || []))
      .catch(() => {});
  }, [session]);

  if (status === 'loading')
    return <p className="text-neutral-400">Loading...</p>;

  if (!session)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <h1 className="text-3xl font-bold">Log in to start listening</h1>
        <LoginButton />
      </div>
    );

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featured.map((p) => (
            <PlaylistCard key={p.id} item={p} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">New Releases</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {newReleases.map((a) => (
            <PlaylistCard key={a.id} item={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
