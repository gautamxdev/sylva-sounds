"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { site } from "@/lib/data";
import { getSupabase } from "@/lib/supabase";
import clsx from "clsx";

const projectTypes = [
  "Original Score",
  "Trailer Music",
  "Sound Post-Production",
  "Brand Campaign Music",
  "Mixing & Mastering",
  "Dolby Atmos Mix",
  "Songs & Artist Development",
  "Other",
];

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: [] as string[],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".contact-kicker", { opacity: 0, y: 14, duration: 0.6 })
        .from(".contact-title", { opacity: 0, y: 28, duration: 0.85 }, "-=0.25")
        .from(".contact-copy", { opacity: 0, y: 18, duration: 0.65, stagger: 0.08 }, "-=0.35")
        .from(".contact-detail", { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 }, "-=0.25")
        .from(".form-reveal", { opacity: 0, y: 24, duration: 0.7, stagger: 0.07 }, "-=0.15");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleProjectType = (type: string) => {
    setForm((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type],
    }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim() || !/^(\+91[\s-]?)?[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, ""))) e.phone = "Valid 10-digit Indian phone number is required";
    if (!form.message.trim()) e.message = "Message is required";
    if (form.projectType.length === 0) e.projectType = "Select at least one project type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const moveButton = (e: React.PointerEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.18, y: y * 0.28, duration: 0.28, ease: "power3.out" });
  };

  const resetButton = () => {
    if (buttonRef.current) gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <section ref={sectionRef} className="px-6 pb-28 pt-40 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="contact-kicker label-mono mb-5 text-sm">Contact</p>
        <h1
          className="contact-title font-display font-semibold"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7.25rem)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
        >
          Ready To Shape Your Sound?
        </h1>
        <div className="contact-copy mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          <p>Every story has a sound.</p>
          <p className="mt-2">Let&apos;s build yours.</p>
          <p className="mt-4">
            Tell us about your film, campaign, series, or project and we&apos;ll get back within 24 hours.
          </p>
        </div>

        <div className="contact-copy mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-text-secondary md:text-base">
          <a href={`mailto:${site.email}`} className="contact-detail underline-offset-4 transition-colors hover:text-olive-dark hover:underline">
            {site.email}
          </a>
          <span className="contact-detail hidden h-1 w-1 rounded-full bg-olive-core/45 sm:block" />
          <span className="contact-detail">India • Remote Worldwide</span>
          <span className="contact-detail hidden h-1 w-1 rounded-full bg-olive-core/45 sm:block" />
          <span className="contact-detail">Response within 24 Hours</span>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl">
        {submitted ? (
          <div className="form-reveal rounded-card border border-beige-deep bg-surface-01 p-10 text-center md:p-12">
            <h2 className="heading-display text-3xl font-semibold">Message sent</h2>
            <p className="mt-3 text-text-secondary">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form
            className="rounded-card border border-beige-deep bg-surface-01 p-6 md:p-8"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!validate()) return;

              setSubmitting(true);
              setError("");

              const supabase = getSupabase();
              const { error: supabaseError } = await supabase
                .from("contact_submissions")
                .insert({
                  name: form.name.trim(),
                  email: form.email.trim(),
                  phone: form.phone.trim(),
                  company: form.company.trim(),
                  project_type: form.projectType,
                  message: form.message.trim(),
                });

              setSubmitting(false);

              if (supabaseError) {
                console.error("Supabase insert error:", supabaseError.message, supabaseError.details, supabaseError.code);
                setError("Something went wrong. Please try again or email us directly.");
                return;
              }

              setSubmitted(true);
            }}
          >
            {error && (
              <div className="mb-5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <FloatingField id="name" label="Name *" value={form.name} error={errors.name}>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="peer w-full rounded-card border border-beige-deep bg-bg-primary px-4 pb-3 pt-6 outline-none transition-colors duration-300 hover:border-olive-muted/70 focus:border-olive-core"
                />
              </FloatingField>

              <FloatingField id="email" label="Email *" value={form.email} error={errors.email}>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="peer w-full rounded-card border border-beige-deep bg-bg-primary px-4 pb-3 pt-6 outline-none transition-colors duration-300 hover:border-olive-muted/70 focus:border-olive-core"
                />
              </FloatingField>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <FloatingField id="phone" label="Phone *" value={form.phone} error={errors.phone}>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="peer w-full rounded-card border border-beige-deep bg-bg-primary px-4 pb-3 pt-6 outline-none transition-colors duration-300 hover:border-olive-muted/70 focus:border-olive-core"
                />
              </FloatingField>

              <FloatingField id="company" label="Company / Production" value={form.company}>
                <input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="peer w-full rounded-card border border-beige-deep bg-bg-primary px-4 pb-3 pt-6 outline-none transition-colors duration-300 hover:border-olive-muted/70 focus:border-olive-core"
                />
              </FloatingField>
            </div>

            <div className="form-reveal mt-6">
              <label className="label-mono mb-3 block text-left">Project Type *</label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t, i) => {
                  const selected = form.projectType.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleProjectType(t)}
                      className={clsx(
                        "rounded-pill border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                        selected
                          ? "border-olive-core bg-olive-core text-surface-01"
                          : "border-beige-deep text-text-secondary hover:border-olive-muted hover:bg-bg-primary hover:text-olive-dark"
                      )}
                      style={{ transitionDelay: `${i * 10}ms` }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              {errors.projectType && <p className="mt-2 text-left text-xs text-red-600">{errors.projectType}</p>}
            </div>

            <div className="mt-6">
              <FloatingField id="message" label="Message *" value={form.message} error={errors.message}>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="peer w-full resize-none rounded-card border border-beige-deep bg-bg-primary px-4 pb-3 pt-6 outline-none transition-colors duration-300 hover:border-olive-muted/70 focus:border-olive-core"
                />
              </FloatingField>
            </div>

            <div className="form-reveal mt-8 text-center">
              <button
                ref={buttonRef}
                type="submit"
                disabled={submitting}
                onPointerMove={moveButton}
                onPointerLeave={resetButton}
                className="inline-flex will-change-transform items-center justify-center rounded-full bg-olive-core px-9 py-4 text-sm font-semibold tracking-wide text-surface-01 transition-colors duration-300 hover:bg-olive-dark active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function FloatingField({
  id,
  label,
  value,
  error,
  children,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  children: React.ReactNode;
}) {
  const active = value.length > 0;

  return (
    <div className="form-reveal">
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className={clsx(
            "pointer-events-none absolute left-4 top-4 origin-left font-body text-sm font-semibold uppercase tracking-[0.14em] text-text-muted transition-all duration-300",
            "peer-focus:top-2 peer-focus:scale-[0.78] peer-focus:text-olive-core",
            active && "top-2 scale-[0.78] text-olive-core"
          )}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
