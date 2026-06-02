"use client";

import { useState } from "react";
import { Mail, MapPin, Send, Clock, Instagram, Linkedin, Music2 } from "lucide-react";
import { AboutCanvas } from "@/components/three/HeroCanvas";
import { NeonButton } from "@/components/ui/NeonButton";
import clsx from "clsx";

const projectTypes = [
  "Music Production",
  "Film Scoring",
  "Sound Design",
  "Mixing & Mastering",
  "Audio Post-Production",
  "Brand Audio",
  "Other",
];

const budgetRanges = [
  { label: "Under $5K", value: "under-5k" },
  { label: "$5K – $15K", value: "5k-15k" },
  { label: "$15K – $50K", value: "15k-50k" },
  { label: "$50K+", value: "50k-plus" },
  { label: "Not sure", value: "unsure" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@sylvasounds.com", href: "mailto:hello@sylvasounds.com" },
  { icon: MapPin, label: "Studios", value: "Los Angeles · London · Remote" },
  { icon: Clock, label: "Response", value: "Within 24 hours" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.message.trim()) e.message = "Message is required";
    if (!form.projectType) e.projectType = "Please select a project type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-0 radial-glow" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="label-mono mb-4">GET IN TOUCH</p>
            <h1 className="heading-display text-5xl font-bold text-white-pure md:text-7xl">
              Let&apos;s Create Something Great
            </h1>
            <p className="mt-6 text-lg text-grey-text">
              Tell us about your project. We&apos;ll respond within 24 hours with next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="glass flex min-h-[480px] flex-col items-center justify-center p-12 text-center animate-glow-pulse">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-core/15 ring-1 ring-green-core/30">
                  <Send className="text-green-core" size={32} />
                </div>
                <h2 className="heading-display text-3xl font-bold text-white-pure">Message Sent</h2>
                <p className="mt-4 max-w-sm text-grey-text">
                  Thanks for reaching out. Our team will review your brief and get back to you within 24 hours.
                </p>
                <div className="mt-8">
                  <NeonButton href="/catalogue" variant="ghost">
                    Browse the Catalogue
                  </NeonButton>
                </div>
              </div>
            ) : (
              <div className="glass p-8 md:p-10">
                <h2 className="heading-display mb-8 text-2xl font-semibold text-white-pure">
                  Project Brief
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label-mono mb-2 block">Name *</label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-card border border-grey-mid/40 bg-surface-01 px-4 py-3 text-white-soft outline-none transition-colors focus:border-green-core/50"
                        placeholder="Your name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="label-mono mb-2 block">Company</label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-card border border-grey-mid/40 bg-surface-01 px-4 py-3 text-white-soft outline-none transition-colors focus:border-green-core/50"
                        placeholder="Company or brand"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-mono mb-3 block">Project Type *</label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, projectType: t })}
                          className={clsx(
                            "rounded-pill border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-all",
                            form.projectType === t
                              ? "border-green-core bg-green-core text-bg-primary"
                              : "border-grey-mid/40 text-grey-text hover:border-green-core/40 hover:text-white-soft"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.projectType && <p className="mt-2 text-xs text-red-400">{errors.projectType}</p>}
                  </div>

                  <div>
                    <label className="label-mono mb-3 block">Budget Range</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => setForm({ ...form, budget: b.value })}
                          className={clsx(
                            "rounded-pill border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-all",
                            form.budget === b.value
                              ? "border-green-core/60 bg-green-core/10 text-green-core"
                              : "border-grey-mid/40 text-grey-text hover:border-green-core/40 hover:text-white-soft"
                          )}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="label-mono mb-2 block">Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-card border border-grey-mid/40 bg-surface-01 px-4 py-3 text-white-soft outline-none transition-colors focus:border-green-core/50"
                      placeholder="Tell us about your project, timeline, and creative vision..."
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  <NeonButton type="submit" variant="primary">
                    Send Message →
                  </NeonButton>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="glass overflow-hidden">
              <div className="pointer-events-none h-48 lg:h-56">
                <AboutCanvas />
              </div>
            </div>

            <div className="glass space-y-5 p-6">
              <h3 className="label-mono">Contact Info</h3>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-core/10">
                    <Icon size={16} className="text-green-core" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-grey-text">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 block text-sm text-white-soft hover:text-green-core">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-white-soft">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass p-6">
              <h3 className="label-mono mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Music2, label: "SoundCloud" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-mid/40 text-grey-text transition-all hover:border-green-core/40 hover:text-green-core"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-card border border-green-core/20 bg-green-core/5 p-6">
              <p className="font-display text-sm font-semibold text-green-core">Quick Turnaround</p>
              <p className="mt-2 text-sm text-grey-text">
                Need something fast? Mention your deadline in the message — rush projects welcome.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
