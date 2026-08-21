'use client';

import { MonitorSpeaker, Smartphone } from 'lucide-react';

export default function DeviceSelector({
  devices = [],
  currentDeviceId,
  onSelect,
}) {
  if (!devices.length) {
    return (
      <div className="p-4 text-sm text-neutral-400">
        No devices available
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800 bg-[#181818]">
      {devices.map((device) => {
        const active =
          device.id === currentDeviceId;

        return (
          <button
            key={device.id}
            onClick={() => onSelect(device.id)}
            className={`flex w-full items-center justify-between px-4 py-3 transition ${
              active
                ? 'bg-[#1DB954] text-black'
                : 'text-white hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {device.type === 'Smartphone' ? (
                <Smartphone size={18} />
              ) : (
                <MonitorSpeaker size={18} />
              )}

              <div className="text-left">
                <p className="font-medium">
                  {device.name}
                </p>

                <p className="text-xs opacity-70">
                  {device.type}
                </p>
              </div>
            </div>

            {device.is_active && (
              <span className="text-xs font-bold">
                Active
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
