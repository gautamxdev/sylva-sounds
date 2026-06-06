"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { catalogueSongs } from "@/lib/data";
import { RevealText } from "@/components/ui/RevealText";
import { triggerPulse } from "@/lib/scrollState";
import { CatalogueTrackList } from "@/components/catalogue/CatalogueTrackList";
import { CatalogueNowPlaying } from "@/components/catalogue/CatalogueNowPlaying";
import { useCatalogueAudio } from "@/components/catalogue/useCatalogueAudio";

export function OurCatalogue() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>(catalogueSongs[0]?.id ?? "");

  const active = catalogueSongs.find((s) => s.id === activeId) ?? catalogueSongs[0];
  const { play, isPlaying, embed } = useCatalogueAudio(active);

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

  if (!active) return null;

  const selectTrack = (id: string) => {
    const song = catalogueSongs.find((s) => s.id === id);
    if (!song) return;
    setActiveId(id);
    play(song);
    triggerPulse(0.9);
  };

  return (
    <section ref={sectionRef} data-stage="projects" className="veil-dark overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="label-mono mb-4 text-base md:text-lg" style={{ color: "var(--on-dark-label)" }}>
            Catalogue
          </p>
          <RevealText
            text="Our Catalogue"
            className="heading-display font-semibold leading-[0.94] tracking-[-0.03em] text-on-dark"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <CatalogueTrackList songs={catalogueSongs} activeId={active.id} onSelect={selectTrack} />
          <CatalogueNowPlaying
            song={active}
            isPlaying={isPlaying}
            embedTrackId={embed.trackId}
            embedStart={embed.start}
          />
        </div>
      </div>
    </section>
  );
}
