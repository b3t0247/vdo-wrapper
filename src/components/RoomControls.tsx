// Host/guest controls (mute, layout)
// src/components/RoomControls.tsx
"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import router from "next/router";

export default function RoomControls({ roomId }: { roomId: string }) {
  const [layout, setLayout] = useState<"grid" | "solo">("grid");
  const [showOverlay, setShowOverlay] = useState(true);
  const mockGuests = [
    { id: "guest1", name: "Alice", status: "connected" },
    { id: "guest2", name: "Bob", status: "waiting" },
    { id: "guest3", name: "Charlie", status: "connected" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block font-medium">Layout</label>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value as "grid" | "solo")}
          className="rounded border px-4 py-2"
        >
          <option value="grid">Grid</option>
          <option value="solo">Solo</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Overlays</label>
        <input
          type="checkbox"
          checked={showOverlay}
          onChange={(e) => setShowOverlay(e.target.checked)}
          className="mr-2"
        />
        <span>Show name tags</span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Room ID: <strong>{roomId}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Layout: <strong>{layout}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Overlays: <strong>{showOverlay ? "On" : "Off"}</strong>
        </p>
      </div>

      <button
        onClick={() => router.push(`/room/${roomId}`)}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Join Room
      </button>

      <div>
        <h2 className="mb-2 text-lg font-semibold">Guest Previews</h2>
        <div className="grid grid-cols-2 gap-4">
          {mockGuests.map((guest) => (
            <div key={guest.id} className="rounded border p-4 shadow-sm">
              <p className="font-medium">{guest.name}</p>
              <p className="text-sm text-gray-500">Status: {guest.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
