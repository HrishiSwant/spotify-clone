'use client';

import TrackInfo from './TrackInfo';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';

export default function PlayerBar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex h-24 items-center justify-between border-t border-neutral-800 bg-black px-4">

      <div className="w-[30%] min-w-0">
        <TrackInfo />
      </div>

      <div className="flex w-[40%] flex-col items-center">
        <Controls />
        <ProgressBar />
      </div>

      <div className="flex w-[30%] justify-end">
        <VolumeSlider />
      </div>

    </footer>
  );
}
