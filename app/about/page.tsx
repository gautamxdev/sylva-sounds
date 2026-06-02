"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { teamMembers } from "@/lib/data";
import { AboutCanvas } from "@/components/three/HeroCanvas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  { value: 200, suffix: "+", label: "Projects Completed" },
  { value: 80, suffix: "+", label: "Clients Worldwide" },
  { value: 12, suffix: "", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Catalogue Tracks" },
];

const values = [
  { title: "Craft", desc: "Every detail matters. We obsess over the nuance that makes sound unforgettable." },
  { title: "Collaboration", desc: "Great audio is born from partnership. We work alongside you, not just for you." },
  { title: "Innovation", desc: "We push boundaries with technology while honoring the art of sound." },
  { title: "Integrity", desc: "Clear communication, fair licensing, and deliverables you can count on." },
];

export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = parseInt(el.dataset.value || "0", 10);
        gsap.from(el, {
          textContent: 0,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          onUpdate: function () {
            el.textContent = Math.ceil(parseFloat(el.textContent || "0")).toString();
          },
          onComplete: function () {
            el.textContent = target.toString();
          },
        });
      });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-24">
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="label-mono mb-4">ABOUT US</p>
            <h1 className="heading-display text-5xl font-bold text-white-pure md:text-6xl">
              Where Technology Meets Artistry
            </h1>
            <p className="mt-6 text-lg text-grey-text leading-relaxed">
              Sylva Sounds is a premium audio production house born from a simple belief:
              sound is the most powerful storytelling tool we have. For over a decade, we&apos;ve
              crafted sonic experiences for film, brands, games, and media worldwide.
            </p>
          </div>
          <AboutCanvas />
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="heading-display text-3xl font-semibold italic text-white-pure md:text-4xl">
            &ldquo;We don&apos;t just make audio. We craft the emotional backbone of every story.&rdquo;
          </blockquote>
        </div>
      </section>

      <section ref={statsRef} className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="heading-display text-4xl font-bold text-green-core md:text-5xl">
                <span className="stat-value" data-value={stat.value}>0</span>
                {stat.suffix}
              </p>
              <p className="mt-2 font-mono text-xs text-grey-text">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="OUR TEAM" title="The People Behind the Sound" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <GlassCard key={member.id} hover>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-dim/30 font-display text-xl font-bold text-green-core">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-display font-semibold text-white-pure">{member.name}</h3>
                <p className="font-mono text-xs text-green-muted">{member.role}</p>
                {member.bio && <p className="mt-2 text-sm text-grey-text">{member.bio}</p>}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="PHILOSOPHY" title="What We Stand For" align="center" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="border-l-2 border-green-core/30 pl-6">
                <h3 className="heading-display text-2xl font-bold text-white-pure">{v.title}</h3>
                <p className="mt-2 text-grey-text">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
