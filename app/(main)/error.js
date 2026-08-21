'use client';

export default function Error({
  error,
  reset,
}) {
  console.error(error);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-white">
          Something went wrong
        </h1>

        <p className="mt-4 text-neutral-400">
          {error?.message ||
            'Unexpected error occurred.'}
        </p>

        <button
          onClick={reset}
          className="mt-8 rounded-full bg-[#1DB954] px-8 py-3 font-semibold text-black transition hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
