"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import { useAudio } from "@/components/audio/AudioProvider";
import type { Track } from "@/lib/data";
import { Play } from "lucide-react";

export function TrackPlayer({ track }: { track: Track }) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();
  const isCurrent = currentTrack?.id === track.id;

  return (
    <NeonButton
      variant="primary"
      onClick={() => {
        if (isCurrent) togglePlay();
        else playTrack(track);
      }}
    >
      <Play size={16} />
      {isCurrent && isPlaying ? "Pause Preview" : "Play Preview"}
    </NeonButton>
  );
}
