"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { NeonButton } from "@/components/ui/NeonButton";

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.3,
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroCanvas density="full" />
      <div className="radial-glow pointer-events-none absolute inset-0" />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="hero-animate label-mono mb-6">[ AUDIO PRODUCTION HOUSE ]</p>
        <h1
          ref={headlineRef}
          className="hero-animate heading-display mb-6 text-5xl font-bold leading-[1.05] text-white-pure sm:text-7xl lg:text-[7rem]"
        >
          We Craft Sound
          <br />
          Into Experience
        </h1>
        <p className="hero-animate mx-auto mb-10 max-w-xl text-lg text-grey-text">
          Music. Sound Design. Mixing. Mastering. Post-Production.
        </p>
        <div className="hero-animate flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NeonButton href="/portfolio" variant="outline">
            Explore Our Work
          </NeonButton>
          <NeonButton href="/catalogue" variant="ghost">
            Hear the Catalogue
          </NeonButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown className="animate-pulse-arrow text-green-core" size={28} />
      </div>
    </section>
  );
}
