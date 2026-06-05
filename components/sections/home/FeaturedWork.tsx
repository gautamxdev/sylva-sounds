"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { featuredWork } from "@/lib/data";

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let mm: gsap.MatchMedia | null = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
      const cards = gsap.utils.toArray<HTMLElement>(".fw-card", track);

      // Each project becomes a cinematic scene: the centered one takes over,
      // neighbours recede in depth (scale + dim), with layered image/caption parallax.
      const focusCards = () => {
        const vw = window.innerWidth;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const offset = (center - vw / 2) / vw; // -1..1 ish
          const focus = gsap.utils.clamp(0, 1, 1 - Math.abs(offset) * 1.5);
          gsap.set(card, { scale: 0.82 + focus * 0.18, zIndex: Math.round(focus * 10) });
          const img = card.querySelector<HTMLElement>(".fw-img");
          const cap = card.querySelector<HTMLElement>(".fw-cap");
          const veil = card.querySelector<HTMLElement>(".fw-veil");
          if (img) gsap.set(img, { xPercent: offset * -10, scale: 1.08 + focus * 0.04 });
          if (cap) gsap.set(cap, { opacity: 0.18 + focus * 0.82, yPercent: (1 - focus) * 16 });
          if (veil) gsap.set(veil, { opacity: 0.55 - focus * 0.45 });
        });
      };

      const tween = gsap.to(track, { x: () => -getDistance(), ease: "none" });

      const st = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => "+=" + getDistance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tween,
        onUpdate: focusCards,
        onRefresh: focusCards,
      });

      focusCards();

      return () => {
        st.kill();
        tween.kill();
        gsap.set([track, ...cards], { clearProps: "all" });
      };
    });

    return () => {
      mm?.revert();
      mm = null;
    };
  }, []);

  return (
    <section ref={sectionRef} data-stage="projects" className="relative">
      {/* Mobile: swipe carousel */}
      <div className="md:hidden">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
          <p className="label-mono mb-4 text-base">Portfolio</p>
          <h2 className="heading-display font-semibold leading-[0.96]" style={{ fontSize: "clamp(2.6rem, 9vw, 4rem)" }}>
            Featured Work
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto px-6 pb-16 snap-x snap-mandatory">
          {featuredWork.map((project) => (
            <div key={project.id} className="w-[85vw] max-w-sm shrink-0 snap-center">
              <WorkCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: pinned horizontal cinematic scenes */}
      <div ref={pinRef} className="relative hidden h-screen overflow-hidden md:block">
        <div className="flex h-full items-center">
          <div ref={trackRef} className="flex items-center gap-12 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[18vw] will-change-transform">
            <div className="flex w-[34vw] max-w-md shrink-0 flex-col justify-center pr-6">
              <p className="label-mono mb-4 text-base md:text-lg">Portfolio</p>
              <h2 className="heading-display font-semibold leading-[0.92] tracking-[-0.03em]" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
                Featured Work
              </h2>
              <p className="mt-6 text-lg text-text-secondary md:text-xl">
                Scroll through selected scores, trailers, and brand films — each its own scene.
              </p>
              <p className="label-mono mt-8 text-sm text-olive-muted">Scroll &rarr;</p>
            </div>

            {featuredWork.map((project) => (
              <div key={project.id} className="fw-card w-[clamp(440px,44vw,680px)] shrink-0 will-change-transform">
                <WorkCard project={project} cinematic />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, cinematic = false }: { project: (typeof featuredWork)[0]; cinematic?: boolean }) {
  const wrapClass =
    "group relative block w-full overflow-hidden rounded-card shadow-xl transition-shadow duration-300 hover:shadow-2xl";

  const inner = (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <div className="fw-img absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 85vw, 680px"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/90 via-[var(--dark-bg)]/25 to-transparent" />
      {cinematic && <div className="fw-veil absolute inset-0 bg-[var(--dark-bg)]/40" />}
      {project.videoUrl && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-on-dark/40 bg-olive-core/85 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play size={26} className="ml-0.5 text-on-dark" />
          </span>
        </div>
      )}
      <div className="fw-cap absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="label-mono mb-2 text-sm text-olive-light md:text-base">
          {project.type}
          {!project.videoUrl && <span className="text-on-dark/50"> · No public reel</span>}
        </p>
        <div className="flex items-end justify-between gap-3">
          <h3 className="work-card-title font-display text-3xl font-semibold text-on-dark md:text-4xl lg:text-5xl">
            {project.title}
          </h3>
          {project.videoUrl && (
            <ExternalLink size={20} className="mb-2 shrink-0 text-on-dark/50 group-hover:text-on-dark" />
          )}
        </div>
      </div>
    </div>
  );

  if (project.videoUrl) {
    return (
      <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className={wrapClass}>
        {inner}
      </a>
    );
  }

  return <div className={wrapClass}>{inner}</div>;
}
