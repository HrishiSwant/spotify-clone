'use client';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('spotify')}
      className="bg-spotify-green hover:sc
