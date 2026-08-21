import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-8xl font-black text-white">
          404
        </h1>

        <p className="mt-4 text-xl text-neutral-400">
          Page not found.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#1DB954] px-8 py-3 font-semibold text-black transition hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
