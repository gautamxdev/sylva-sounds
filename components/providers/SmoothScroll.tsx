"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { setScroll, setPointer } from "@/lib/scrollState";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    registerGSAP();

    // Pointer feeds the world even when reduced motion disables Lenis.
    let pointerQueued = false;
    let px = 0;
    let py = 0;
    const onPointer = (e: PointerEvent | MouseEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = -((e.clientY / window.innerHeight) * 2 - 1);
      if (!pointerQueued) {
        pointerQueued = true;
        requestAnimationFrame(() => {
          setPointer(px, py);
          pointerQueued = false;
        });
      }
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    if (prefersReduced) {
      const onScroll = () => {
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        setScroll(limit > 0 ? window.scrollY / limit : 0, 0);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScroll);
      };
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", (e: { progress?: number; scroll: number; limit: number; velocity: number }) => {
      ScrollTrigger.update();
      const progress =
        typeof e.progress === "number" ? e.progress : e.limit > 0 ? e.scroll / e.limit : 0;
      setScroll(progress, e.velocity ?? 0);
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      window.removeEventListener("load", refresh);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <>{children}</>;
}
