export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-neutral-700 border-t-[#1DB954]" />

        <p className="text-lg font-medium text-neutral-400">
          Loading Spotify...
        </p>
      </div>
    </div>
  );
}
