'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const avatar =
    session?.user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      session?.user?.name || 'User'
    )}&background=1DB954&color=fff`;

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#121212]/90 px-6 py-4 backdrop-blur-md">

      {/* Left */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition hover:bg-neutral-800"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => router.forward()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition hover:bg-neutral-800"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 transition hover:bg-neutral-700">
          <Bell size={18} />
        </button>

        {session?.user && (
          <>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: '/login',
                })
              }
              className="rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:scale-105"
            >
              Log out
            </button>

            <button
              onClick={() => router.push('/profile')}
              className="flex items-center gap-2 rounded-full bg-black p-1 pr-3 transition hover:bg-neutral-800"
            >
              <img
                src={avatar}
                alt={session.user.name || 'Profile'}
                className="h-8 w-8 rounded-full"
              />

              <span className="text-sm font-semibold text-white">
                {session.user.name}
              </span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
