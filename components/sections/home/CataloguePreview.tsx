"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { tracks, formatDuration } from "@/lib/data";
import { useAudio } from "@/components/audio/AudioProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonButton } from "@/components/ui/NeonButton";
import { StaticWaveform } from "@/components/audio/WaveformVisualizer";

export function CataloguePreview() {
  const { playTrack } = useAudio();
  const featured = tracks.find((t) => t.featured) || tracks[0];
  const others = tracks.filter((t) => t.id !== featured.id).slice(0, 3);

  return (
    <section className="bg-bg-secondary px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="FROM THE CATALOGUE" title="Featured Tracks" />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <button
            onClick={() => playTrack(featured)}
            className="glass group relative flex min-h-[320px] flex-col justify-end overflow-hidden p-8 text-left transition-all hover:border-green-core/30 hover:shadow-[0_0_40px_rgba(26,255,107,0.1)]"
          >
            {featured.artwork && (
              <Image
                src={featured.artwork}
                alt={featured.title}
                fill
                className="object-cover opacity-30 transition-opacity group-hover:opacity-40"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
            <div className="relative z-10">
              <span className="label-mono mb-2 block">{featured.genre}</span>
              <h3 className="heading-display text-3xl font-bold text-white-pure">{featured.title}</h3>
              <p className="mt-2 font-mono text-sm text-grey-text">
                {formatDuration(featured.duration)} · {featured.bpm} BPM
              </p>
              <div className="mt-4 h-8 opacity-60">
                <StaticWaveform />
              </div>
            </div>
            <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-core/20 opacity-0 transition-opacity group-hover:opacity-100">
              <Play size={20} className="text-green-core" />
            </div>
          </button>

          <div className="flex flex-col gap-4">
            {others.map((track) => (
              <button
                key={track.id}
                onClick={() => playTrack(track)}
                className="glass group flex items-center gap-4 p-4 text-left transition-all hover:border-green-core/30"
              >
                {track.artwork && (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image src={track.artwork} alt={track.title} fill className="object-cover" sizes="80px" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-display font-semibold text-white-pure">{track.title}</h4>
                  <p className="font-mono text-xs text-grey-text">
                    {track.genre} · {formatDuration(track.duration)}
                  </p>
                  <div className="mt-2 h-4">
                    <StaticWaveform />
                  </div>
                </div>
                <Play size={18} className="shrink-0 text-green-core opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <NeonButton href="/catalogue" variant="outline">
            Browse Full Catalogue →
          </NeonButton>
        </div>
      </div>
    </section>
  );
}
