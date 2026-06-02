"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonButton } from "@/components/ui/NeonButton";

export function ProcessFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".process-step", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              end: "bottom 60%",
              scrub: 1.5,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".process-number").forEach((el) => {
        gsap.from(el, {
          scale: 0.6,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bg-secondary px-6 py-28 lg:px-8">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="HOW WE WORK"
          title="Our Process"
          subtitle="A proven four-stage workflow from first conversation to final delivery."
          align="center"
        />

        <div className="relative mt-20">
          <svg
            className="absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden h-2 md:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 4"
          >
            <line
              ref={lineRef}
              x1="0"
              y1="2"
              x2="1000"
              y2="2"
              stroke="url(#processGradient)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a4d22" />
                <stop offset="50%" stopColor="#1aff6b" />
                <stop offset="100%" stopColor="#0d8c3c" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className="process-step group relative"
              >
                <div className="glass flex h-full flex-col p-6 transition-all duration-300 hover:border-green-core/25 hover:shadow-[0_0_40px_rgba(26,255,107,0.06)]">
                  <div className="process-number mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-green-core/20 bg-green-core/5 font-display text-lg font-bold text-green-core transition-colors group-hover:border-green-core/40 group-hover:bg-green-core/10">
                    {step.number}
                  </div>
                  <h3 className="heading-display text-lg font-semibold text-white-pure md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-text">
                    {step.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-green-dim">
                    <span className="h-px w-6 bg-green-dim" />
                    Step {i + 1} of 4
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <NeonButton href="/contact" variant="outline">
            Start Your Project →
          </NeonButton>
        </div>
      </div>
    </section>
  );
}
