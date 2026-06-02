"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { NeonButton } from "@/components/ui/NeonButton";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isMuted, toggleMute } = useAudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={clsx(
          "fixed left-0 right-0 top-0 z-[9999] transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(13, 26, 15, 0.85)",
          borderBottom: "1px solid rgba(26, 255, 107, 0.08)",
          pointerEvents: "auto",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="font-display text-lg font-bold tracking-tight text-white-pure md:text-xl">
            SYLVA<span className="text-green-core"> SOUNDS</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "relative font-body text-sm transition-colors",
                    pathname === link.href
                      ? "text-white-pure"
                      : "text-grey-text hover:text-white-pure"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-green-core shadow-[0_0_8px_rgba(26,255,107,0.6)]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="hidden p-2 text-grey-text transition-colors hover:text-green-core md:block"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <NeonButton href="/contact" variant="primary" className="hidden sm:inline-flex">
              Start a Project →
            </NeonButton>
            <button
              className="p-2 text-white-pure lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-xl lg:hidden"
          style={{ paddingTop: "80px" }}
        >
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-[fadeInUp_0.4s_ease-out_both]"
              >
                <Link
                  href={link.href}
                  className={clsx(
                    "font-display text-3xl font-semibold",
                    pathname === link.href ? "text-green-core" : "text-white-soft"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <NeonButton href="/contact" variant="primary">
              Start a Project →
            </NeonButton>
          </div>
        </div>
      )}
    </>
  );
}
