'use client';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('spotify')}
      className="bg-spotify-green hover:scale-105 transition text-black font-bold rounded-full px-6 py-2"
    >
      Log in
    </button>
  );
}
