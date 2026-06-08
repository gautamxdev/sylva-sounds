# SYLVA SOUNDS

Premium audio production website built with Next.js 14, Three.js, GSAP, and Sanity CMS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS custom properties
- **3D:** Three.js + React Three Fiber + Drei
- **Animation:** GSAP (ScrollTrigger)
- **Audio:** Howler.js + Web Audio API
- **CMS:** Sanity.io (optional — falls back to static data)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and add your Sanity credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

The site works without Sanity configured — it uses static demo data from `lib/data.ts`.

## Project Structure

```
app/              # Next.js App Router pages
components/       # React components (layout, three, audio, ui, sections)
lib/              # Utilities, data, GSAP, Sanity client
sanity/schemas/   # Sanity CMS document schemas
styles/           # Global CSS and animations
public/           # Static assets
```

## Deployment

Deploy to Vercel with zero configuration. Set environment variables in the Vercel dashboard.

## Pages

- `/` — Home
- `/services` — Services
- `/portfolio` — Project showcase
- `/industries` — Industries served
- `/about` — About & team
- `/contact` — Contact form
