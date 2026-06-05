"use client";

import { Film, Tv, Megaphone, Gamepad2, Mic2, Radio } from "lucide-react";
import { industries } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const icons = [Film, Tv, Megaphone, Gamepad2, Mic2, Radio];

export default function IndustriesPage() {
  return (
    <div>
      <PageHeader
        label="Industries"
        title="Where We Create"
        subtitle="Audio tailored for film, OTT, advertising, games, and digital media."
      />

      <section className="bg-bg-primary px-6 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = icons[i % icons.length];
            return (
              <GlassCard key={industry.id} hover className="group">
                <div className="mb-4 text-olive-dark">
                  <Icon size={32} strokeWidth={1.25} />
                </div>
                <h3 className="heading-display text-xl font-semibold text-text-primary">{industry.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{industry.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {industry.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] uppercase text-olive-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
