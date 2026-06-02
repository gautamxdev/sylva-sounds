"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Search, X, Disc3 } from "lucide-react";
import { tracks, MOODS, GENRES, USAGES, formatDuration } from "@/lib/data";
import { useAudio } from "@/components/audio/AudioProvider";
import { TagChip } from "@/components/ui/TagChip";
import { WaveformVisualizer } from "@/components/audio/WaveformVisualizer";
import { NeonButton } from "@/components/ui/NeonButton";

const moodColors: Record<string, string> = {
  Dark: "#1aff6b",
  Uplifting: "#00d4aa",
  Tense: "#ff6b6b",
  Ambient: "#6b9fff",
  Epic: "#ffd93d",
  Minimal: "#8a9e8d",
};

export default function CataloguePage() {
  const { playTrack, currentTrack, isPlaying, progress } = useAudio();
  const [search, setSearch] = useState("");
  const [moodFilter, setMoodFilter] = useState<string | null>(null);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [usageFilter, setUsageFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return tracks.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (moodFilter && !t.mood.includes(moodFilter)) return false;
      if (genreFilter && t.genre !== genreFilter) return false;
      if (usageFilter && !t.usageTags.includes(usageFilter)) return false;
      return true;
    });
  }, [search, moodFilter, genreFilter, usageFilter]);

  const featured = tracks.find((t) => t.featured) || tracks[0];
  const hasFilters = !!(search || moodFilter || genreFilter || usageFilter);

  const clearFilters = () => {
    setSearch("");
    setMoodFilter(null);
    setGenreFilter(null);
    setUsageFilter(null);
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-12 lg:px-8">
        <div className="pointer-events-none absolute inset-0 radial-glow" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-12 lg:grid-cols-2">
            <div>
              <p className="label-mono mb-4">THE SYLVA CATALOGUE</p>
              <h1 className="heading-display text-5xl font-bold text-white-pure md:text-7xl">
                Music for Every Story
              </h1>
              <p className="mt-6 max-w-lg text-lg text-grey-text">
                {tracks.length} production-ready tracks. Licensed for film, TV, advertising, games, and more.
              </p>
            </div>

            {/* Featured track hero card */}
            <button
              onClick={() => playTrack(featured)}
              className="glass group relative overflow-hidden text-left transition-all hover:border-green-core/30 hover:shadow-[0_0_50px_rgba(26,255,107,0.08)]"
            >
              <div className="relative flex flex-col sm:flex-row">
                {featured.artwork && (
                  <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-48">
                    <Image
                      src={featured.artwork}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="200px"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-center p-6">
                  <span className="label-mono mb-2 text-[10px]">Featured Track</span>
                  <h2 className="heading-display text-2xl font-bold text-white-pure">{featured.title}</h2>
                  <p className="mt-1 font-mono text-xs text-grey-text">
                    {featured.genre} · {formatDuration(featured.duration)} · {featured.bpm} BPM
                  </p>
                  <div className="mt-4 h-8">
                    <WaveformVisualizer
                      animated={currentTrack?.id === featured.id && isPlaying}
                      progress={currentTrack?.id === featured.id ? progress : 0}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-green-core">
                    <Play size={16} />
                    <span className="font-mono text-xs uppercase tracking-wider">Play Preview</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div
        className="sticky top-[72px] z-20 border-y border-grey-mid/20 px-6 py-5 lg:px-8"
        style={{ backdropFilter: "blur(20px)", background: "rgba(3, 8, 5, 0.9)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-text" size={18} />
              <input
                type="search"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-pill border border-grey-mid/40 bg-surface-01 py-3 pl-12 pr-4 font-body text-sm text-white-soft outline-none transition-colors focus:border-green-core/50"
              />
            </div>
            <div className="flex items-center gap-3">
              <Disc3 size={16} className="text-green-core" />
              <span className="font-mono text-xs text-grey-text">
                {filtered.length} track{filtered.length !== 1 ? "s" : ""}
              </span>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 font-mono text-xs text-green-core hover:text-white-pure"
                >
                  <X size={12} /> Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-[10px] uppercase text-grey-text">Mood</span>
              {MOODS.map((m) => (
                <TagChip key={m} label={m} active={moodFilter === m} onClick={() => setMoodFilter(moodFilter === m ? null : m)} />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-[10px] uppercase text-grey-text">Genre</span>
              {GENRES.map((g) => (
                <TagChip key={g} label={g} active={genreFilter === g} onClick={() => setGenreFilter(genreFilter === g ? null : g)} />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-[10px] uppercase text-grey-text">Usage</span>
              {USAGES.map((u) => (
                <TagChip key={u} label={u} active={usageFilter === u} onClick={() => setUsageFilter(usageFilter === u ? null : u)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Track grid */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="heading-display text-2xl font-semibold text-white-pure">No tracks found</p>
              <p className="mt-2 text-grey-text">Try adjusting your filters or search term.</p>
              <div className="mt-6">
                <NeonButton variant="outline" onClick={clearFilters}>
                  Clear Filters
                </NeonButton>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((track) => {
                const isActive = currentTrack?.id === track.id && isPlaying;
                return (
                  <div
                    key={track.id}
                    className={`glass group overflow-hidden transition-all hover:border-green-core/30 ${
                      isActive ? "border-green-core/40 shadow-[0_0_30px_rgba(26,255,107,0.1)]" : ""
                    }`}
                  >
                    <div className="relative">
                      <button
                        onClick={() => playTrack(track)}
                        className="relative block w-full aspect-[4/3] overflow-hidden"
                        aria-label={`Play ${track.title}`}
                      >
                        {track.artwork && (
                          <Image
                            src={track.artwork}
                            alt={track.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/30 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-full ${isActive ? "bg-green-core" : "bg-green-core/90"} text-bg-primary`}>
                            <Play size={22} className={isActive ? "" : "ml-0.5"} />
                          </div>
                        </div>
                        {/* Mood dots */}
                        <div className="absolute left-4 top-4 flex gap-1.5">
                          {track.mood.slice(0, 2).map((m) => (
                            <span
                              key={m}
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: moodColors[m] || "#1aff6b", boxShadow: `0 0 6px ${moodColors[m] || "#1aff6b"}80` }}
                              title={m}
                            />
                          ))}
                        </div>
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/catalogue/${track.slug}`}
                            className="block truncate font-display text-lg font-semibold text-white-pure transition-colors hover:text-green-core"
                          >
                            {track.title}
                          </Link>
                          <p className="mt-1 font-mono text-[11px] text-grey-text">
                            {track.genre} · {formatDuration(track.duration)} · {track.bpm} BPM
                          </p>
                        </div>
                        <span className="shrink-0 rounded-pill border border-green-dim/40 px-2 py-0.5 font-mono text-[9px] uppercase text-green-muted">
                          {track.licensingTier?.replace("-", " ") || "standard"}
                        </span>
                      </div>

                      <div className="mt-4 h-6">
                        <WaveformVisualizer animated={isActive} bars={40} />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {track.mood.map((m) => (
                          <span key={m} className="font-mono text-[9px] uppercase tracking-wider text-green-muted/80">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Licensing CTA */}
      <section className="border-t border-grey-mid/20 bg-bg-secondary px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label-mono mb-4">Licensing</p>
          <h2 className="heading-display text-3xl font-bold text-white-pure md:text-4xl">
            Need a custom license?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-grey-text">
            We offer standard, exclusive, and custom licensing for every track in the catalogue.
          </p>
          <div className="mt-8">
            <NeonButton href="/contact" variant="primary">
              Request a License →
            </NeonButton>
          </div>
        </div>
      </section>
    </div>
  );
}
