/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/case-studies", destination: "/portfolio", permanent: true },
      { source: "/case-studies/:slug", destination: "/portfolio/:slug", permanent: true },
      { source: "/catalogue", destination: "/portfolio", permanent: true },
      { source: "/catalogue/:slug", destination: "/portfolio", permanent: true },
      { source: "/services", destination: "/#services", permanent: false },
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
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "scdn.co" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "drive.google.com" },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["three"],
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
