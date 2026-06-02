import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data";
import { NeonButton } from "@/components/ui/NeonButton";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export default function CaseStudyPage({ params }: Props) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) notFound();

  const chapters = [
    { title: "Overview", id: "overview" },
    { title: "Challenge", id: "challenge" },
    { title: "Approach", id: "approach" },
    { title: "Results", id: "results" },
  ];

  return (
    <div className="pt-24">
      <section className="relative aspect-[21/9] overflow-hidden">
        <Image src={study.heroImage} alt={study.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <Link href="/case-studies" className="label-mono mb-4 inline-block hover:text-white-soft">
            ← All Case Studies
          </Link>
          <span className="label-mono mb-2 block">{study.client} · {study.industry}</span>
          <h1 className="heading-display max-w-4xl text-4xl font-bold text-white-pure md:text-6xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-grey-text">{study.subtitle}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[200px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-3">
            {chapters.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="block font-mono text-xs text-grey-text transition-colors hover:text-green-core"
              >
                {ch.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="max-w-3xl space-y-16">
          <section id="overview">
            <p className="text-xl leading-relaxed text-white-soft">{study.excerpt}</p>
            <blockquote className="my-12 border-l-2 border-green-core pl-6">
              <p className="heading-display text-2xl font-semibold italic text-white-pure">
                &ldquo;Sound is half the experience. We make sure it&apos;s the right half.&rdquo;
              </p>
            </blockquote>
          </section>

          <section id="challenge">
            <h2 className="label-mono mb-4">THE CHALLENGE</h2>
            <p className="text-grey-text leading-relaxed">
              {study.content || "Every project begins with a unique set of creative and technical challenges..."}
            </p>
          </section>

          <section id="approach">
            <h2 className="label-mono mb-4">OUR APPROACH</h2>
            <p className="text-grey-text leading-relaxed">
              We began with extensive discovery sessions to understand the emotional landscape of the project.
              Our team developed multiple sonic directions, iterating closely with the client through each phase
              of production.
            </p>
          </section>

          <section id="results">
            <h2 className="label-mono mb-4">RESULTS</h2>
            <div className="glass p-8">
              <p className="heading-display text-2xl font-semibold text-green-core">
                A sonic identity that elevated the entire project and resonated with audiences worldwide.
              </p>
            </div>
          </section>

          <div className="pt-8">
            <NeonButton href="/contact" variant="primary">
              Start Your Project →
            </NeonButton>
          </div>
        </article>
      </div>
    </div>
  );
}
