'use client';
import { useSession, signOut } from 'next-auth/react';
import LoginButton from './LoginButton';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-10 backdrop-blur bg-black/40">
      <div className="flex gap-2">
        <button
          onClick={() => router.back()}
          className="bg-black/60 rounded-full p-2 hover:bg-neutral-800"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => router.forward()}
          className="bg-black/60 rounded-full p-2 hover:bg-neutral-800"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      {session ? (
        <div className="flex items-center gap-3">
          {session.user?.image && (
            <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
          )}
          <span className="text-sm">{session.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="bg-neutral-800 hover:bg-neutral-700 rounded-full px-4 py-1 text-sm"
          >
            Log out
          </button>
        </div>
      ) : (
        <LoginButton />
      )}
    </header>
  );
}
