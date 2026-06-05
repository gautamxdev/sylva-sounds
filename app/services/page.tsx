import { serviceCategories } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { NeonButton } from "@/components/ui/NeonButton";
import { MediaTypes } from "@/components/sections/home/MediaTypes";

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        label="What We Do"
        title="Services"
        subtitle="End-to-end music, sound design, and post-production for film, brands, and digital media."
      />

      <section className="bg-bg-primary px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          {serviceCategories.map((cat, i) => (
            <article
              key={cat.id}
              className={`anim-in-${i % 2 === 0 ? "left" : "right"} anim-delay-${i + 1} grid gap-12 lg:grid-cols-2 lg:items-start ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className="lg:[direction:ltr]">
                <p className="label-mono mb-4 text-xs">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="font-display text-4xl font-semibold text-olive-dark md:text-5xl">
                  {cat.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-text-secondary md:text-xl">
                  {cat.description}
                </p>
              </div>
              <ul className="grid gap-2 rounded-card border border-beige-deep bg-surface-01 p-6 sm:grid-cols-2 lg:[direction:ltr]">
                {cat.items.map((item) => (
                  <li key={item} className="rounded-lg border border-beige-deep/50 bg-bg-primary px-4 py-3.5 text-base text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-olive-core/40 hover:shadow-md">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <MediaTypes />

      <section className="bg-bg-primary px-6 py-20 text-center lg:px-8">
        <NeonButton href="/contact" variant="primary">Start a Project →</NeonButton>
      </section>
    </div>
  );
}
