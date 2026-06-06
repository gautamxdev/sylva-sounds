"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

const STAGES = [
  { number: "01", title: "Ideation", line: "A simple waveform appears." },
  { number: "02", title: "Composition", line: "Harmonics emerge." },
  { number: "03", title: "Production", line: "Layers build." },
  { number: "04", title: "Mixing", line: "Frequencies align." },
  { number: "05", title: "Mastering", line: "Everything converges." },
  { number: "06", title: "Delivery", line: "The completed sound moves into the work." },
];

export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const steps = stepsRef.current;
    const progress = progressRef.current;
    if (!section || !steps) return;

    const mm = gsap.matchMedia();
    const triggers: ScrollTrigger[] = [];

    mm.add("(min-width: 768px)", () => {
      if (progress) {
        gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });
        const progressTween = gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 0.5,
            },
          }
        );
        if (progressTween.scrollTrigger) triggers.push(progressTween.scrollTrigger);
      }

      gsap.utils.toArray<HTMLElement>(".process-step", steps).forEach((step) => {
        const dot = step.querySelector<HTMLElement>(".process-step-dot");

        const fadeSt = ScrollTrigger.create({
          trigger: step,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              step,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
            );
          },
        });
        triggers.push(fadeSt);

        if (dot) {
          const dotSt = ScrollTrigger.create({
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => dot.classList.add("is-active"),
            onLeaveBack: () => dot.classList.remove("is-active"),
          });
          triggers.push(dotSt);
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".process-step-mobile").forEach((stage) => {
        const st = ScrollTrigger.create({
          trigger: stage,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.fromTo(stage, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" });
          },
        });
        triggers.push(st);
      });
    });

    return () => {
      mm.revert();
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} data-stage="composition" className="relative border-t border-beige-deep/40">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 lg:gap-20">
          <div className="md:pt-1">
            <p className="label-mono mb-4 text-base md:text-lg">How We Work</p>
            <h2
              className="heading-display font-semibold leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
            >
              Silence To Experience
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              Six stages from first idea to final delivery — each step building toward sound that serves the story.
            </p>

            <div className="mt-10 hidden items-center gap-3 md:flex" aria-hidden>
              {STAGES.map((stage, i) => (
                <span key={stage.number} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-olive-core" />
                  {i < STAGES.length - 1 && <span className="h-px w-6 bg-beige-deep" />}
                </span>
              ))}
            </div>
          </div>

          <div ref={stepsRef} className="relative hidden md:block md:pt-1">
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-beige-deep/80" aria-hidden />
            <div
              ref={progressRef}
              className="absolute left-[7px] top-0 w-px origin-top bg-olive-core"
              style={{ height: "100%" }}
              aria-hidden
            />

            <div className="space-y-14 pl-10">
              {STAGES.map((stage) => (
                <div key={stage.number} className="process-step relative">
                  <span
                    className="process-step-dot absolute -left-[33px] top-2 h-2 w-2 rounded-full bg-beige-deep transition-transform duration-300 [&.is-active]:scale-125 [&.is-active]:bg-olive-core"
                    aria-hidden
                  />
                  <span className="font-mono text-base text-olive-core">{stage.number}</span>
                  <h3 className="mt-2 font-display text-4xl font-semibold leading-none text-olive-dark lg:text-5xl">
                    {stage.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-secondary">{stage.line}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10 md:hidden">
            {STAGES.map((stage) => (
              <div key={stage.number} className="process-step-mobile border-l border-olive-core/30 pl-5">
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
