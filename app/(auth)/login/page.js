'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-xl bg-[#121212] p-10 text-center shadow-2xl">
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            alt="Spotify"
            width={70}
            height={70}
            priority
          />
        </div>

        <h1 className="mt-8 text-4xl font-bold text-white">
          Spotify
        </h1>

        <p className="mt-3 text-neutral-400">
          Sign in to continue
        </p>

        <button
          onClick={() => signIn('spotify')}
          className="mt-10 w-full rounded-full bg-[#1DB954] py-4 text-lg font-bold text-black transition hover:scale-[1.02]"
        >
          Continue with Spotify
        </button>
      </div>
    </main>
  );
}
