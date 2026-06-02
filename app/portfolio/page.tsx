"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/lib/data";
import { TagChip } from "@/components/ui/TagChip";

const filters = ["All", "Music Production", "Film Scoring", "Sound Design", "Brand Audio"];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.type === filter);

  return (
    <div className="pt-24">
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="label-mono mb-4">OUR WORK</p>
          <h1 className="heading-display text-5xl font-bold text-white-pure md:text-7xl">Portfolio</h1>
          <p className="mt-4 max-w-xl text-grey-text">
            Selected projects spanning film, brands, games, and media.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <TagChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className={`group relative overflow-hidden rounded-card ${
                i === 0 ? "sm:col-span-2 sm:row-span-1" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "100vw" : "50vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="label-mono mb-2 block">{project.type}</span>
                  <h2 className="heading-display text-2xl font-bold text-white-pure md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm text-grey-text">
                    {project.client} · {project.year}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
