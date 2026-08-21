'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  Search,
  Library,
  Heart,
  Plus,
} from 'lucide-react';

const menu = [
  {
    name: 'Home',
    href: '/',
    icon: House,
  },
  {
    name: 'Search',
    href: '/search',
    icon: Search,
  },
  {
    name: 'Your Library',
    href: '/library',
    icon: Library,
  },
  {
    name: 'Liked Songs',
    href: '/liked',
    icon: Heart,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-2">
      {/* Main Navigation */}

      <div className="bg-[#121212] rounded-lg p-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-md px-4 py-3 transition
              ${
                active
                  ? 'text-white bg-white/10'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={24} />

              <span className="font-semibold">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Library */}

      <div className="flex-1 bg-[#121212] rounded-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3 text-neutral-300">
            <Library size={24} />

            <span className="font-semibold">
              Your Library
            </span>
          </div>

          <button className="p-2 rounded-full hover:bg-neutral-800">
            <Plus size={18} />
          </button>
        </div>

        <div className="px-2 overflow-y-auto flex-1">
          <div className="bg-[#242424] rounded-lg p-4 mb-4">
            <h3 className="font-semibold">
              Create your first playlist
            </h3>

            <p className="text-sm text-neutral-400 mt-2">
              It's easy, we'll help you.
            </p>

            <button className="mt-4 bg-white text-black font-semibold rounded-full px-5 py-2 hover:scale-105 transition">
              Create playlist
            </button>
          </div>

          <div className="bg-[#242424] rounded-lg p-4">
            <h3 className="font-semibold">
              Let's find some podcasts
            </h3>

            <p className="text-sm text-neutral-400 mt-2">
              We'll keep you updated.
            </p>

            <button className="mt-4 bg-white text-black font-semibold rounded-full px-5 py-2 hover:scale-105 transition">
              Browse podcasts
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
