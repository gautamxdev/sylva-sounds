import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { featuredWork } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";

export default function PortfolioPage() {
  return (
    <div>
      <PageHeader
        label="Our Work"
        title="Portfolio"
        subtitle="Selected projects across film, OTT, advertising, and digital media."
      />

      <section className="bg-bg-primary px-6 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWork.map((project) => {
            const card = (
              <div className="group relative overflow-hidden rounded-card shadow-md transition-all duration-500 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700"
                    style={{ transition: "transform 700ms cubic-bezier(0.4,0,0.2,1)" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f07]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.videoUrl && (
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f0ece3]/40" style={{ background: "rgba(92,107,61,0.7)" }}>
                        <Play size={20} className="ml-0.5 text-[#f0ece3]" />
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="label-mono mb-1 text-[10px]" style={{ color: "#7a9a50" }}>{project.type}</p>
                    <h3 className="font-display text-lg font-semibold text-[#f0ece3]">{project.title}</h3>
                  </div>
                </div>
              </div>
            );

            if (project.videoUrl) {
              return (
                <a key={project.id} href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              );
            }
            return <div key={project.id}>{card}</div>;
          })}
        </div>
      </section>
    </div>
  );
}
