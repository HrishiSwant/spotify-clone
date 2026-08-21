'use client';

import { useEffect, useState } from 'react';

import useSpotify from '@/hooks/useSpotify';

export default function ProfilePage() {
  const spotify = useSpotify();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await spotify.me();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-8">
        <img
          src={
            profile.images?.[0]?.url ||
            '/images/avatar.png'
          }
          alt={profile.display_name}
          className="w-52 h-52 rounded-full object-cover shadow-2xl"
        />

        <div>
          <p className="uppercase text-sm font-bold tracking-widest">
            Profile
          </p>

          <h1 className="text-6xl font-black mt-2">
            {profile.display_name}
          </h1>

          <div className="mt-5 space-y-2 text-neutral-400">
            <p>Email: {profile.email}</p>

            <p>
              Country: {profile.country}
            </p>

            <p>
              Product: {profile.product}
            </p>

            <p>
              Followers:{' '}
              {profile.followers?.total?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
