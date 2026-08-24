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
    <div className="pb-28">

      <div className="bg-gradient-to-b from-purple-700 to-[#121212] px-8 py-12">

        <div className="flex items-end gap-8">

          <img
            src={
              profile.images?.[0]?.url ||
              '/images/avatar.png'
            }
            alt={profile.display_name}
            className="h-52 w-52 rounded-full object-cover shadow-2xl"
          />

          <div>

            <p className="text-sm font-bold uppercase tracking-widest">
              Profile
            </p>

            <h1 className="mt-3 text-6xl font-black">
              {profile.display_name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-6 text-neutral-300">

              <span>
                {profile.followers?.total?.toLocaleString()} Followers
              </span>

              <span>
                {profile.country}
              </span>

              <span>
                {profile.product}
              </span>

            </div>

            <p className="mt-4 text-neutral-400">
              {profile.email}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
