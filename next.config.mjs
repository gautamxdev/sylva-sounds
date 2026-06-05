/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/case-studies", destination: "/portfolio", permanent: true },
      { source: "/case-studies/:slug", destination: "/portfolio/:slug", permanent: true },
      { source: "/catalogue", destination: "/portfolio", permanent: true },
      { source: "/catalogue/:slug", destination: "/portfolio", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "logo.debounce.com" },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
