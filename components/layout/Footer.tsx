import Link from "next/link";

const footerLinks = {
  Pages: [
    { href: "/services", label: "Services" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/case-studies", label: "Case Studies" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/industries", label: "Industries" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-grey-mid/30 bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-bold text-white-pure">
              SYLVA<span className="text-green-core"> SOUNDS</span>
            </p>
            <p className="mt-4 max-w-sm text-grey-text">
              Premium audio production for film, media, and brands. Where technology meets artistry.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="label-mono mb-4">{title}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-grey-text transition-colors hover:text-green-core"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-grey-mid/20 pt-8 md:flex-row">
          <p className="font-mono text-xs text-grey-text">
            © {new Date().getFullYear()} Sylva Sounds. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "SoundCloud"].map((social) => (
              <span key={social} className="font-mono text-xs text-grey-text hover:text-green-core cursor-pointer">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
