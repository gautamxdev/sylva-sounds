"use client";

import { useEffect } from "react";

/**
 * Mount once in the layout. Observes all [data-reveal] elements and
 * adds .is-revealed when they enter the viewport.
 *
 * Usage:
 *   <div data-reveal data-delay="0.1">…</div>
 *   <div data-reveal="left" data-delay="0.2">…</div>   // slides from left
 *   <div data-reveal="right">…</div>                   // slides from right
 *   <div data-reveal="scale">…</div>                   // scales up
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseFloat(el.dataset.delay ?? "0") * 1000;
          setTimeout(() => el.classList.add("is-revealed"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
