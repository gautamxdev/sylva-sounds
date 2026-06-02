import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/data";

export default function CaseStudiesPage() {
  return (
    <div className="pt-24">
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="label-mono mb-4">DEEP DIVES</p>
          <h1 className="heading-display text-5xl font-bold text-white-pure md:text-7xl">Case Studies</h1>
          <p className="mt-4 max-w-xl text-grey-text">
            In-depth looks at how we approach complex audio challenges.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          {caseStudies.map((study, i) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className={`group grid items-center gap-8 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-card lg:[direction:ltr]">
                <Image
                  src={study.heroImage}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="50vw"
                />
              </div>
              <div className="lg:[direction:ltr]">
                <span className="label-mono">{study.industry}</span>
                <h2 className="heading-display mt-2 text-3xl font-bold text-white-pure group-hover:text-green-core transition-colors">
                  {study.title}
                </h2>
                <p className="mt-2 text-lg text-grey-text">{study.subtitle}</p>
                <p className="mt-4 text-sm text-grey-text">{study.excerpt}</p>
                <span className="mt-6 inline-block font-mono text-xs text-green-core">
                  Read Case Study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
