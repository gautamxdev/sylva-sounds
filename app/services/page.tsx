"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { services, faqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProcessFlow } from "@/components/sections/home/ProcessFlow";
import { ChevronDown } from "lucide-react";

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".services-hero", { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".service-block").forEach((block, i) => {
        gsap.from(block, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="pt-24">
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center services-hero">
          <p className="label-mono mb-4">OUR SERVICES</p>
          <h1 className="heading-display text-5xl font-bold text-white-pure md:text-7xl">
            Full-Stack Audio Production
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-grey-text">
            From original composition to final master, we deliver end-to-end audio solutions
            tailored to your creative vision.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`service-block grid items-center gap-12 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-01 lg:[direction:ltr]">
                <div className="absolute inset-0 gradient-accent opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-full max-w-md px-8">
                    <div className="flex h-full items-end gap-1">
                      {Array.from({ length: 32 }).map((_, j) => (
                        <div
                          key={j}
                          className="flex-1 rounded-full bg-green-core/60 waveform-bar"
                          style={{
                            height: `${20 + Math.sin(j * 0.5) * 40 + Math.random() * 20}%`,
                            animationDelay: `${j * 0.05}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:[direction:ltr]">
                <h2 className="heading-display text-3xl font-bold text-white-pure">{service.title}</h2>
                <p className="mt-4 text-grey-text">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-white-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-core" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <NeonButton href="/contact" variant="outline">
                    Discuss This Service →
                  </NeonButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProcessFlow />

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="FAQ" title="Common Questions" align="center" />
          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="overflow-hidden">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display font-semibold text-white-pure">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-green-core transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="mt-4 text-sm text-grey-text">{faq.answer}</p>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
