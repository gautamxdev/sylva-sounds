import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/lib/data";
import { NeonButton } from "@/components/ui/NeonButton";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.description };
}

export default function PortfolioDetailPage({ params }: Props) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = portfolioProjects.filter((p) => p.id !== project.id && p.type === project.type).slice(0, 2);

  return (
    <div className="pt-24">
      <section className="relative aspect-[21/9] overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <Link href="/portfolio" className="label-mono mb-4 inline-block hover:text-white-soft">
            ← Back to Portfolio
          </Link>
          <span className="label-mono mb-2 block">{project.type}</span>
          <h1 className="heading-display text-4xl font-bold text-white-pure md:text-6xl">{project.title}</h1>
          <p className="mt-2 text-grey-text">{project.client} · {project.year}</p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {project.description && (
            <p className="text-xl text-white-soft leading-relaxed">{project.description}</p>
          )}
          {project.challenge && (
            <div className="mt-12">
              <h2 className="label-mono mb-4">THE CHALLENGE</h2>
              <p className="text-grey-text">{project.challenge}</p>
            </div>
          )}
          {project.approach && (
            <div className="mt-12">
              <h2 className="label-mono mb-4">OUR APPROACH</h2>
              <p className="text-grey-text">{project.approach}</p>
            </div>
          )}
          {project.result && (
            <div className="mt-12 glass p-8">
              <h2 className="label-mono mb-4">THE RESULT</h2>
              <p className="heading-display text-2xl font-semibold text-green-core">{project.result}</p>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-bg-secondary px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="heading-display mb-8 text-2xl font-bold text-white-pure">Related Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className="group glass overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image src={p.image} alt={p.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="50vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-white-pure">{p.title}</h3>
                    <p className="text-sm text-grey-text">{p.type}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-16 text-center lg:px-8">
        <NeonButton href="/contact" variant="primary">
          Start a Similar Project →
        </NeonButton>
      </section>
    </div>
  );
}
