"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { portfolioProjects } from "@/lib/data";

function getScrollDistance(track: HTMLDivElement) {
  return Math.max(0, track.scrollWidth - window.innerWidth + 80);
}

export function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();

    const section = sectionRef.current;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!section || !pinEl || !track) return;

    let ctx: gsap.Context | null = null;

    const setup = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.matchMedia().add("(min-width: 768px)", () => {
          gsap.set(pinEl, { zIndex: 10 });
          gsap.set(track, { x: 0 });

          gsap.to(track, {
            x: () => -getScrollDistance(track),
            ease: "none",
            scrollTrigger: {
              trigger: pinEl,
              pin: pinEl,
              scrub: 1,
              start: "top top",
              end: () => `+=${getScrollDistance(track)}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        });
      }, section);

      ScrollTrigger.refresh();
    };

    setup();

    const onLoad = () => setup();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx?.revert();
      gsap.set(track, { clearProps: "transform" });
    };
  }, []);

  return (
    <section ref={sectionRef} className="portfolio-section relative bg-bg-primary">
      {/* Desktop: full-viewport pinned horizontal scroll, vertically centered */}
      <div
        ref={pinRef}
        className="relative hidden min-h-screen flex-col md:flex"
      >
        <div className="shrink-0 px-6 pt-24 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <div>
              <p className="label-mono mb-4">SELECTED WORK</p>
              <h2 className="heading-display text-4xl font-bold text-white-pure md:text-5xl">
                Portfolio
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-green-core transition-colors hover:text-white-pure"
            >
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center overflow-hidden pb-16 pt-4">
          <div
            ref={trackRef}
            className="portfolio-track flex w-max gap-8 pl-6 pr-24 will-change-transform"
          >
            {portfolioProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group relative w-[65vw] max-w-2xl shrink-0 overflow-hidden rounded-card lg:w-[55vw]"
              >
                <div className="relative aspect-[16/10] overflow-hidden transition-transform duration-500 group-hover:[transform:perspective(1000px)_rotateY(-2deg)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="65vw"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="label-mono mb-2 block">{project.type}</span>
                    <h3 className="heading-display text-2xl font-bold text-white-pure md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-grey-text">
                      {project.client} · {project.year}
                    </p>
                  </div>
                  <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-green-core/30 bg-bg-primary/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <ArrowUpRight size={18} className="text-green-core" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="px-6 pt-24 lg:px-8">
          <p className="label-mono mb-4">SELECTED WORK</p>
          <h2 className="heading-display text-4xl font-bold text-white-pure">Portfolio</h2>
        </div>
        <div className="mt-8 overflow-x-auto pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-6 pl-6 pr-6">
            {portfolioProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group relative w-[85vw] shrink-0 overflow-hidden rounded-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="85vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="label-mono mb-1 block text-[10px]">{project.type}</span>
                    <h3 className="heading-display text-xl font-bold text-white-pure">{project.title}</h3>
                    <p className="mt-1 text-xs text-grey-text">{project.client} · {project.year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
