"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

const STAGES = [
  { number: "01", title: "Signal", line: "A simple waveform appears." },
  { number: "02", title: "Composition", line: "Harmonics emerge." },
  { number: "03", title: "Production", line: "Layers build." },
  { number: "04", title: "Mixing", line: "Frequencies align." },
  { number: "05", title: "Mastering", line: "Everything converges." },
  { number: "06", title: "Delivery", line: "The completed sound moves into the work." },
];

export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const pin = pinRef.current;
    if (!pin) return;

    let mm: gsap.MatchMedia | null = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const stages = gsap.utils.toArray<HTMLElement>(".sound-stage");
        const layers = gsap.utils.toArray<SVGPathElement>(".sound-line-layer");
        const progress = pin.querySelector<HTMLElement>(".sound-progress-fill");

        gsap.set(stages, { opacity: 0, y: 18 });
        gsap.set(stages[0], { opacity: 1, y: 0 });
        gsap.set(layers, { opacity: 0 });
        gsap.set(layers[0], { opacity: 1 });

        layers.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        });

        gsap.to(layers[0], { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: "+=" + STAGES.length * 85 + "%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        if (progress) {
          tl.to(progress, { scaleX: 1, ease: "none", duration: STAGES.length }, 0);
        }

        layers.forEach((path, i) => {
          tl.to(path, { opacity: i === 0 ? 1 : 0.72, strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, i * 0.85);
        });

        stages.forEach((stage, i) => {
          if (i === 0) return;
          tl.to(stages[i - 1], { opacity: 0, y: -16, duration: 0.35, ease: "power2.in" }, i * 0.85)
            .fromTo(stage, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, i * 0.85 + 0.12);
        });
      }, pin);
      return () => ctx.revert();
    });

    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".sound-stage-mobile").forEach((stage) => {
          gsap.fromTo(stage, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: stage, start: "top 88%", once: true } });
        });
      }, pin);
      return () => ctx.revert();
    });

    return () => {
      mm?.revert();
      mm = null;
    };
  }, []);

  return (
    <section ref={sectionRef} data-stage="composition" className="relative border-t border-beige-deep/40">
      <div ref={pinRef} className="relative min-h-screen overflow-hidden px-6 py-20 md:flex md:items-center md:py-0 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="label-mono mb-4 text-base md:text-lg">How We Work</p>
            <h2 className="heading-display font-semibold leading-[0.92] tracking-[-0.03em]" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
              From brief to delivery
            </h2>
            <div className="mt-8 h-px w-full max-w-md overflow-hidden bg-beige-deep">
              <div className="sound-progress-fill h-full origin-left bg-olive-core" style={{ transform: "scaleX(0)" }} />
            </div>

            <div className="relative mt-12 hidden min-h-[230px] md:block">
              {STAGES.map((stage) => (
                <div key={stage.number} className="sound-stage absolute inset-0 max-w-md">
                  <span className="font-mono text-base text-olive-core">{stage.number}</span>
                  <h3 className="mt-3 font-display text-5xl font-semibold leading-none text-olive-dark lg:text-6xl">{stage.title}</h3>
                  <p className="mt-5 text-xl leading-relaxed text-text-secondary">{stage.line}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[55vh] items-center md:flex">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-beige-deep/70" />
            <svg className="relative h-[min(46vh,460px)] w-full overflow-visible" viewBox="0 0 900 360" fill="none" aria-hidden>
              <path className="sound-line-layer" d="M24 184 C 130 184 145 132 250 152 C 350 171 365 214 462 188 C 560 162 585 126 682 154 C 775 181 806 184 876 184" stroke="var(--olive-core)" strokeWidth="3" strokeLinecap="round" />
              <path className="sound-line-layer" d="M24 184 C 108 136 170 232 258 184 C 350 134 396 236 480 184 C 572 126 628 238 710 184 C 786 132 824 184 876 184" stroke="var(--olive-light)" strokeWidth="2" strokeLinecap="round" />
              <path className="sound-line-layer" d="M24 184 C 116 108 184 254 280 184 C 374 112 438 254 530 184 C 624 116 694 246 780 184 C 820 154 850 174 876 184" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round" />
              <path className="sound-line-layer" d="M24 184 C 140 148 238 220 348 184 C 456 150 548 220 662 184 C 752 156 822 178 876 184" stroke="var(--olive-dark)" strokeWidth="3" strokeLinecap="round" />
              <path className="sound-line-layer" d="M24 184 C 196 184 236 184 356 184 C 488 184 534 184 650 184 C 760 184 810 184 876 184" stroke="var(--olive-core)" strokeWidth="4" strokeLinecap="round" />
              <path className="sound-line-layer" d="M24 184 C 170 184 220 156 338 166 C 458 176 512 204 626 194 C 738 184 800 184 876 184" stroke="var(--on-dark-accent)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="space-y-10 md:hidden">
            {STAGES.map((stage) => (
              <div key={stage.number} className="sound-stage-mobile border-l border-olive-core/30 pl-5">
                <span className="font-mono text-sm text-olive-core">{stage.number}</span>
                <h3 className="mt-2 font-display text-3xl font-semibold text-olive-dark">{stage.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-text-secondary">{stage.line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
