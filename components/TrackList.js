'use client';
import TrackItem from './TrackItem';

export default function TrackList({ tracks = [] }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-xs text-neutral-400 border-b border-neutral-800 mb-2">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span className="text-right">Time</span>
      </div>
      {tracks.map((t, i) => (
        <TrackItem key={`${t.id}-${i}`} track={t} index={i} queue={tracks} />
      ))}
    </div>
  );
}
