"use client";

import {
  Clapperboard,
  Megaphone,
  Gamepad2,
  Mic,
  Building2,
  Calendar,
} from "lucide-react";
import { industries } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const iconMap: Record<string, React.ReactNode> = {
  clapperboard: <Clapperboard size={32} className="text-green-core" />,
  megaphone: <Megaphone size={32} className="text-green-core" />,
  gamepad: <Gamepad2 size={32} className="text-green-core" />,
  mic: <Mic size={32} className="text-green-core" />,
  building: <Building2 size={32} className="text-green-core" />,
  calendar: <Calendar size={32} className="text-green-core" />,
};

export default function IndustriesPage() {
  return (
    <div className="pt-24">
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="INDUSTRIES"
            title="Where We Create"
            subtitle="Tailored audio solutions across film, advertising, gaming, and beyond."
          />
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <GlassCard key={industry.id} hover className="group">
              <div className="mb-4">{iconMap[industry.icon]}</div>
              <h3 className="heading-display text-xl font-semibold text-white-pure">{industry.title}</h3>
              <p className="mt-2 text-sm text-grey-text">{industry.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                {industry.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] uppercase text-green-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
