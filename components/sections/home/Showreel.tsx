"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { featuredWork } from "@/lib/data";
import { RevealText } from "@/components/ui/RevealText";
import { triggerPulse } from "@/lib/scrollState";

const WAVE_BARS = Array.from({ length: 48 });
const tracks = featuredWork.filter((w) => w.videoId);

export function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>(tracks[0]?.id ?? "");
  const [playing, setPlaying] = useState(false);

  const active = tracks.find((t) => t.id === activeId) ?? tracks[0];

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".showreel-list-item", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".showreel-list", start: "top 82%", once: true },
      });
      gsap.from(".showreel-player", {
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".showreel-player", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // While a track plays, the surrounding sound world pulses in response.
  useEffect(() => {
    if (!playing) return;
    triggerPulse(1);
    const id = window.setInterval(() => triggerPulse(0.7), 420);
    return () => window.clearInterval(id);
  }, [playing]);

  if (!active) return null;

  const selectTrack = (id: string) => {
    setActiveId(id);
    setPlaying(false);
    triggerPulse(0.9);
  };

  return (
    <section ref={sectionRef} data-stage="projects" className="veil-dark overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="label-mono mb-4 text-base md:text-lg" style={{ color: "var(--on-dark-label)" }}>
            Showreel
          </p>
          <RevealText
            text="Hear the work"
            className="heading-display font-semibold leading-[0.94] tracking-[-0.03em] text-on-dark"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <ul className="showreel-list flex flex-col">
            {tracks.map((track, i) => {
              const isActive = track.id === active.id;
              return (
                <li key={track.id} className="showreel-list-item">
                  <button
                    type="button"
                    onClick={() => selectTrack(track.id)}
                    className="group flex w-full items-center gap-5 border-b border-[rgba(240,236,227,0.1)] py-5 text-left transition-colors"
                  >
                    <span className={`font-mono text-sm tabular-nums transition-colors ${isActive ? "text-on-dark-accent" : "text-on-dark-dim"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <motion.span
                        animate={{ x: isActive ? 8 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`block font-display text-2xl font-semibold transition-colors md:text-3xl ${
                          isActive ? "text-on-dark-accent" : "text-on-dark group-hover:text-on-dark-accent"
                        }`}
                      >
                        {track.title}
                      </motion.span>
                      <span className="mt-1 block text-sm text-on-dark-dim md:text-base">{track.type}</span>
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isActive ? "border-olive-core bg-olive-core text-surface-01" : "border-[rgba(240,236,227,0.25)] text-on-dark-dim group-hover:border-on-dark"
                      }`}
                    >
                      <Play size={15} className="ml-0.5" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="showreel-player">
            <div className="relative aspect-video w-full overflow-hidden rounded-card border border-[rgba(92,107,61,0.2)] bg-black">
              {playing ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerated-charging; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.button
                    key={active.id}
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group absolute inset-0 h-full w-full"
                    aria-label={`Play ${active.title}`}
                    initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0, scale: 1.06 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={active.image} alt={active.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 60vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-on-dark/40 bg-olive-core/85 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play size={32} className="ml-1 text-on-dark" />
                    </span>
                  </motion.button>
                </AnimatePresence>
              )}
            </div>

            <div className="mt-6 flex items-end justify-between gap-[3px] px-1" aria-hidden>
              {WAVE_BARS.map((_, i) => (
                <span
                  key={i}
                  className={playing ? "showreel-wave-bar" : ""}
                  style={{
                    flex: 1,
                    height: playing ? undefined : 4,
                    minHeight: 4,
                    background: "var(--olive-core)",
                    borderRadius: 2,
                    opacity: playing ? 0.85 : 0.3,
                    animationDelay: `${(i % 12) * 0.07}s`,
                  }}
                />
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p className="font-display text-xl font-semibold text-on-dark md:text-2xl">{active.title}</p>
                  <p className="text-sm text-on-dark-dim md:text-base">{active.type}</p>
                </motion.div>
              </AnimatePresence>
              {active.videoUrl && (
                <a href={active.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-olive-light underline-offset-4 hover:text-on-dark hover:underline md:text-base">
                  Watch on YouTube ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
