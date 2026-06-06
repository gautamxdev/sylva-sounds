"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
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

      const focusCards = () => {
        const vw = window.innerWidth;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const offset = (center - vw / 2) / vw;
          const focus = gsap.utils.clamp(0, 1, 1 - Math.abs(offset) * 1.5);
          gsap.set(card, { scale: 0.82 + focus * 0.18, zIndex: Math.round(focus * 10) });
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
              <div key={project.id} className="fw-card w-[clamp(440px,44vw,680px)] shrink-0">
                <WorkCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: (typeof featuredWork)[0] }) {
  const shellClass =
    "group block w-full transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl";

  const content = (
    <>
      <div className="relative overflow-hidden rounded-card shadow-lg">
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--dark-bg)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 85vw, 680px"
          />
          {project.videoUrl && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-on-dark/40 bg-olive-core/90 backdrop-blur-sm">
                <Play size={22} className="ml-0.5 text-on-dark" />
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="fw-meta mt-3 px-0.5">
        <p className="label-mono mb-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-olive-core md:text-base">
          {project.type}
        </p>
        <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight text-text-primary md:text-[clamp(1.75rem,2.2vw,2.5rem)]">
          {project.title}
        </h3>
      </div>
    </>
  );

  if (project.videoUrl) {
    return (
      <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className={shellClass}>
        {content}
      </a>
    );
  }

  return <div className={shellClass}>{content}</div>;
}
