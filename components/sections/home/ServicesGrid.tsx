import Link from "next/link";
import { Music, Film, AudioWaveform, SlidersHorizontal, Layers, Sparkles } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { StaticWaveform } from "@/components/audio/WaveformVisualizer";

const iconMap: Record<string, React.ReactNode> = {
  music: <Music size={28} className="text-green-core" />,
  film: <Film size={28} className="text-green-core" />,
  waveform: <AudioWaveform size={28} className="text-green-core" />,
  sliders: <SlidersHorizontal size={28} className="text-green-core" />,
  layers: <Layers size={28} className="text-green-core" />,
  sparkles: <Sparkles size={28} className="text-green-core" />,
};

export function ServicesGrid() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="WHAT WE DO"
          title={"Sound, Crafted\nEnd-to-End"}
          subtitle="From concept to delivery, we handle every stage of audio production."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href="/services" className="block">
              <GlassCard hover className="group flex h-full flex-col">
                <div className="mb-4">{iconMap[service.icon]}</div>
                <h3 className="heading-display mb-2 text-xl font-semibold text-white-pure">
                  {service.title}
                </h3>
                <p className="mb-6 flex-1 text-sm text-grey-text">{service.description}</p>
                <div className="h-6 opacity-40 transition-opacity group-hover:opacity-100">
                  <StaticWaveform />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
