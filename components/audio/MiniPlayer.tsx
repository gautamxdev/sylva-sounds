"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, X, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";
import { formatDuration } from "@/lib/data";
import { WaveformVisualizer } from "./WaveformVisualizer";

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    isMuted,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    closePlayer,
  } = useAudio();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (currentTrack) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  const currentTime = Math.floor(progress * currentTrack.duration);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Audio player"
    >
      <div className="glass mx-4 mb-4 flex items-center gap-4 px-6 py-4 md:mx-8">
        <button
          onClick={togglePlay}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-core text-bg-primary transition-transform hover:scale-105 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <p className="truncate font-display text-sm font-semibold text-white-pure">
              {currentTrack.title}
            </p>
            <span className="hidden shrink-0 font-mono text-xs text-grey-text md:inline">
              {currentTrack.genre}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-grey-text">
              {formatDuration(currentTime)}
            </span>
            <div
              className="relative h-8 flex-1 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                seek((e.clientX - rect.left) / rect.width);
              }}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <WaveformVisualizer progress={progress} animated={isPlaying} />
            </div>
            <span className="font-mono text-xs text-grey-text">
              {formatDuration(currentTrack.duration)}
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={toggleMute}
            className="p-2 text-grey-text transition-colors hover:text-green-core"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1 w-20 cursor-pointer accent-green-core"
            aria-label="Volume"
          />
        </div>

        <button
          onClick={closePlayer}
          className="p-2 text-grey-text transition-colors hover:text-white-pure"
          aria-label="Close player"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
