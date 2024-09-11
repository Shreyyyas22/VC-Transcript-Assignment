import React from "react";

function PlaybackControls({ isPlaying, startPlayback, stopPlayback }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={isPlaying ? stopPlayback : startPlayback}
        className={`p-2 rounded ${isPlaying ? "bg-red-500" : "bg-green-500"} text-white`}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default PlaybackControls;
