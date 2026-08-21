'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#121212]/90 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black hover:bg-neutral-800 flex items-center justify-center transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => router.forward()}
          className="w-8 h-8 rounded-full bg-black hover:bg-neutral-800 flex items-center justify-center transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition">
          <Bell size={18} />
        </button>

        {session?.user && (
          <>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Log out
            </button>

            <button className="flex items-center gap-2 bg-black rounded-full p-1 pr-3 hover:bg-neutral-800 transition">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-8 h-8 rounded-full"
              />

              <span className="text-sm font-semibold">
                {session.user.name}
              </span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
