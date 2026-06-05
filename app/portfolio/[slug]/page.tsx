import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { featuredWork } from "@/lib/data";
import { NeonButton } from "@/components/ui/NeonButton";
import { Play } from "lucide-react";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return featuredWork.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: Props) {
  const project = featuredWork.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <div>
      <section className="relative aspect-[21/9] max-h-[70vh] overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <Link href="/portfolio" className="label-mono mb-4 inline-block hover:text-olive-dark">
            ← Back to Work
          </Link>
          <p className="label-mono mb-2">{project.type}</p>
          <h1 className="heading-display text-4xl font-semibold md:text-6xl">{project.title}</h1>
        </div>
      </section>

      <section className="bg-bg-primary px-6 py-28 text-center lg:px-8">
        {project.videoUrl ? (
          <NeonButton href={project.videoUrl} external variant="primary">
            <Play size={18} /> Watch Project
          </NeonButton>
        ) : (
          <p className="text-text-secondary">Final mix & audio finishing for {project.title}.</p>
        )}
        <div className="mt-10">
          <NeonButton href="/contact" variant="outline">
            Start a Similar Project →
          </NeonButton>
        </div>
      </section>
    </div>
  );
}
