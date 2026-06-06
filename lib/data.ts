export interface FeaturedWork {
  id: string;
  slug: string;
  title: string;
  type: string;
  videoUrl?: string;
  videoId?: string;
  image: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client?: string;
  type: string;
  year: string;
  image: string;
  videoUrl?: string;
  videoId?: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export const site = {
  name: "Sylva Sounds",
  tagline: "From Silence to Experience",
  description: "Music, Sound & Audio Production for Modern Media",
  email: "hello@sylvasounds.com",
  creditsDriveUrl:
    "https://drive.google.com/drive/folders/1MC6ngFWsnaAT3UW6KuxZX3nqXSY_hwqN?usp=drive_link",
};

export interface BrandClient {
  name: string;
  logo: string;
  scale?: number;
}

export const brandLogos: BrandClient[] = [
  { name: "Tata", logo: "/logos/clients/tata.png", scale: 1 },
  { name: "OnePlus", logo: "/logos/clients/oneplus.png", scale: 1.05 },
  { name: "BMW", logo: "/logos/clients/bmw.png", scale: 1.1 },
  { name: "NCS", logo: "/logos/clients/ncs.png", scale: 1 },
  { name: "Parle", logo: "/logos/clients/parle.png", scale: 1.05 },
  { name: "White Hill Music", logo: "/logos/clients/white-hill.png", scale: 1 },
  { name: "Zee5", logo: "/logos/clients/zee5.png", scale: 1 },
];

export const brandClients = brandLogos.map((b) => b.name);

export const featuredWork: FeaturedWork[] = [
  {
    id: "1",
    slug: "gargi",
    title: "Gargi",
    type: "Original Score",
    videoUrl: "https://youtu.be/U69BddfXlzM",
    videoId: "U69BddfXlzM",
    image: "https://img.youtube.com/vi/U69BddfXlzM/maxresdefault.jpg",
  },
  {
    id: "3",
    slug: "oneplus",
    title: "OnePlus",
    type: "Music Production for Advertising",
    videoUrl: "https://youtu.be/c01FMC-WxXo",
    videoId: "c01FMC-WxXo",
    image: "https://img.youtube.com/vi/c01FMC-WxXo/maxresdefault.jpg",
  },
  {
    id: "2",
    slug: "vardaan",
    title: "Vardaan",
    type: "Trailer Score",
    videoUrl: "https://youtu.be/PyuyFSB2x84",
    videoId: "PyuyFSB2x84",
    image: "https://img.youtube.com/vi/PyuyFSB2x84/maxresdefault.jpg",
  },
  {
    id: "4",
    slug: "dharmarakshak-sambhaji",
    title: "Dharmarakshak Sambhaji",
    type: "Sound Post-Production",
    videoUrl: "https://youtu.be/yVndzR2PsKQ",
    videoId: "yVndzR2PsKQ",
    image: "https://img.youtube.com/vi/yVndzR2PsKQ/maxresdefault.jpg",
  },
  {
    id: "5",
    slug: "the-secret",
    title: "The Secret",
    type: "Final Mix & Audio Finishing",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop",
  },
  {
    id: "6",
    slug: "supertails",
    title: "Supertails",
    type: "Brand Campaign Music",
    videoUrl: "https://youtu.be/5kzSIrk8It4",
    videoId: "5kzSIrk8It4",
    image: "https://img.youtube.com/vi/5kzSIrk8It4/maxresdefault.jpg",
  },
  {
    id: "7",
    slug: "ad-content-localisation",
    title: "Advertisement Content Localisation",
    type: "Advertisement Content Localisation",
    videoUrl: "https://www.youtube.com/watch?v=6swuSVRr-CA",
    videoId: "6swuSVRr-CA",
    image: "https://img.youtube.com/vi/6swuSVRr-CA/maxresdefault.jpg",
  },
  {
    id: "8",
    slug: "ad-audio-post",
    title: "Advertisement Audio Post Production",
    type: "Advertisement Audio Post Production",
    videoUrl: "https://www.youtube.com/watch?v=sBVtDjt9fe0",
    videoId: "sBVtDjt9fe0",
    image: "https://img.youtube.com/vi/sBVtDjt9fe0/maxresdefault.jpg",
  },
];

export const portfolioProjects: PortfolioProject[] = featuredWork.map((w) => ({
  id: w.id,
  slug: w.slug,
  title: w.title,
  type: w.type,
  year: "",
  image: w.image,
  videoUrl: w.videoUrl,
  videoId: w.videoId,
  client: w.type,
}));

export interface CatalogueSong {
  id: string;
  title: string;
  credit: string;
  spotifyUrl: string;
  spotifyTrackId: string;
  previewStart: number; // seconds — Spotify deep link / embed start offset
  previewUrl: string;   // 30s MP3 preview — instant in-site playback on click
  artwork?: string;
}

export const catalogueSongs: CatalogueSong[] = [
  {
    id: "naina-laage",
    title: "Naina Laage",
    credit: "Composed, Produced & Engineered",
    spotifyUrl: "https://open.spotify.com/track/1cJSZr8PPcqDMqys9ldwHk",
    spotifyTrackId: "1cJSZr8PPcqDMqys9ldwHk",
    previewStart: 185,
    previewUrl: "https://p.scdn.co/mp3-preview/5b9192743dc6231c6338c5da8bb39002a474057e",
  },
  {
    id: "homestudio",
    title: "Homestudio",
    credit: "Music Production",
    spotifyUrl: "https://open.spotify.com/track/6fhIFGEL0t28F1e4Md6lCy",
    spotifyTrackId: "6fhIFGEL0t28F1e4Md6lCy",
    previewStart: 51,
    previewUrl: "https://p.scdn.co/mp3-preview/cd0888c8806624d2b11610af6bf3c28acb2b5ebb",
  },
  {
    id: "money-first",
    title: "Money First",
    credit: "Music Production",
    spotifyUrl: "https://open.spotify.com/track/3v0CDBrvFJ3NWSy9sg3IoS",
    spotifyTrackId: "3v0CDBrvFJ3NWSy9sg3IoS",
    previewStart: 40,
    previewUrl: "https://p.scdn.co/mp3-preview/ba77667dda0f8399d7c168a20b4f63469bb0fcb3",
  },
  {
    id: "chora-wohi",
    title: "Chora Wohi",
    credit: "Music Production",
    spotifyUrl: "https://open.spotify.com/track/60DEYvF1PmaL7VFBCQfUKD",
    spotifyTrackId: "60DEYvF1PmaL7VFBCQfUKD",
    previewStart: 92,
    previewUrl: "https://p.scdn.co/mp3-preview/3332f88b1660ce0c8ffc4e9fff81616b14fdc9de",
  },
  {
    id: "jiya-jaye-na",
    title: "Jiya Jaye Na",
    credit: "Mixing & Mastering",
    spotifyUrl: "https://open.spotify.com/track/3c1wvlkS1q404QfID2ZsPd",
    spotifyTrackId: "3c1wvlkS1q404QfID2ZsPd",
    previewStart: 70,
    previewUrl: "https://p.scdn.co/mp3-preview/95f3381c3df6a3fed2c6753078896577d9592548",
  },
  {
    id: "yaad-karu-na",
    title: "Yaad Karu Na",
    credit: "Mix & Master",
    spotifyUrl: "https://open.spotify.com/track/7ET3Og6ge05lIP5ecuEwr9",
    spotifyTrackId: "7ET3Og6ge05lIP5ecuEwr9",
    previewStart: 76,
    previewUrl: "https://p.scdn.co/mp3-preview/c8d7847f2bf4a2fea9387069fe8a92661cc320c7",
  },
  {
    id: "aadatein-hai",
    title: "Aadatein Hai",
    credit: "Composed, Produced & Engineered",
    spotifyUrl: "https://open.spotify.com/track/2dc7fqKx6ljfiqAMgi44kU",
    spotifyTrackId: "2dc7fqKx6ljfiqAMgi44kU",
    previewStart: 80,
    previewUrl: "https://p.scdn.co/mp3-preview/d3b9cc0d615d200c4f2fd19ef30d94216bcdbaac",
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "music-scoring",
    title: "Music & Scoring",
    description: "From original scores to campaign anthems — music that carries the story.",
    items: [
      "Original Score",
      "Trailer & Teaser Music",
      "Commercial Music Production",
      "Brand Campaign Music",
      "Anthems & Theme Music",
      "Sonic Branding & Audio Identities",
      "Music Production & Arrangement",
    ],
  },
  {
    id: "sound-post",
    title: "Sound Design & Post Production",
    description: "Full post pipelines — edit, design, mix, and deliver broadcast-ready audio.",
    items: [
      "Sound Design & SFX Sweetening",
      "Dialogue Editing",
      "Music Editing",
      "Sound Editing",
      "Foley",
      "ADR Editing & Integration",
      "Re-Recording Mix",
      "Audio Finishing & Delivery",
    ],
  },
  {
    id: "mixing-mastering",
    title: "Mixing & Mastering",
    description: "Stereo to immersive — mixed and mastered in Dolby-certified environments.",
    items: [
      "Stereo Mixing",
      "Film & Broadcast Mixing",
      "5.1, 7.1 & Dolby Atmos Mixes",
      "Dolby Certified Studio Sessions",
      "Mastering",
      "Feature Film Pre-Mixes",
      "Program Audio Sweetening",
    ],
  },
  {
    id: "artist-development",
    title: "Songs & Artist Development",
    description: "From demos to release-ready records — helping artists shape their sound and bring songs to life.",
    items: [
      "Song Production",
      "Composition & Songwriting Support",
      "Arrangement & Programming",
      "Vocal Production",
      "Recording Supervision",
      "Indie Artist Releases",
      "Release-Ready Masters",
    ],
  },
];

export const mediaTypes = [
  "Feature Films",
  "OTT & Web Series",
  "Trailers & Promos",
  "Commercials & Brand Films",
  "Documentaries",
  "Game sound audio assets",
  "Explainer Videos",
  "Digital Content",
  "Podcasts",
  "TV Shows",
  "Short Films",
];

export const creditsSummary = {
  headline: "20+ Films, Shorts & Digital Projects",
  subline: "Credits across Indian cinema, OTT, advertising, and digital media.",
};

export const aboutStudio = {
  location: "Mumbai",
  reach: "Working globally",
  pillars: [
    {
      title: "Story-first",
      line: "Every cue, mix, and sound design choice serves the narrative — not the other way around.",
    },
    {
      title: "End-to-end",
      line: "From first demo to Dolby Atmos delivery, one team carries the audio through the full pipeline.",
    },
    {
      title: "Craft & speed",
      line: "Broadcast-ready quality without losing the agility modern productions demand.",
    },
  ],
  stats: [
    { value: "20+", label: "Films & digital projects" },
    { value: "Dolby", label: "Certified studio sessions" },
    { value: "7+", label: "Major brand partners" },
    { value: "Global", label: "Remote collaboration" },
  ],
};

export interface CreditPoster {
  id: string;
  title: string;
  image: string;
  year?: string;
}

/** Poster art sourced from site.creditsDriveUrl — add entries when new assets are uploaded to Drive. */
export const creditPosters: CreditPoster[] = [
  { id: "digital-fasting", title: "Digital Fasting", image: "/credits/posters/digital-fasting.png" },
  { id: "girlfriend", title: "Girlfriend", image: "/credits/posters/girlfriend.png" },
  { id: "happy-anniversary", title: "Happy Anniversary", image: "/credits/posters/happy-anniversary.jpeg" },
  { id: "intrusion", title: "Intrusion", image: "/credits/posters/intrusion.jpeg" },
  { id: "jaaniv", title: "Jaaniv", image: "/credits/posters/jaaniv.jpeg" },
  { id: "madness-of-mind", title: "Madness Of Mind", image: "/credits/posters/madness-of-mind.png" },
  { id: "masterchi-scooter", title: "Masterchi Scooter", image: "/credits/posters/masterchi-scooter.jpeg" },
  { id: "rangamahal", title: "Rangamahal", image: "/credits/posters/rangamahal.png" },
  { id: "sambhaji", title: "Dharmarakshak Sambhaji", image: "/credits/posters/sambhaji.png" },
  { id: "vardaan", title: "Vardaan", image: "/credits/posters/vardaan.jpg" },
];

export interface DiscographyEntry {
  year: string;
  title: string;
  role: string;
}

// PLACEHOLDER discography — replace with the real release list when provided.
export const discography: DiscographyEntry[] = [
  { year: "2021", title: "Gargi", role: "Original Score" },
  { year: "2022", title: "Vardaan", role: "Trailer Score" },
  { year: "2022", title: "OnePlus Campaign", role: "Music Production" },
  { year: "2023", title: "Dharmarakshak Sambhaji", role: "Sound Post-Production" },
  { year: "2023", title: "The Secret", role: "Final Mix & Finishing" },
  { year: "2024", title: "Supertails", role: "Brand Campaign Music" },
  { year: "2024", title: "Untitled OTT Series", role: "Score & Sound Design" },
  { year: "2025", title: "Feature Film (TBA)", role: "Re-Recording Mix" },
];

// Legacy exports for pages not yet fully migrated
export const MOODS = ["Cinematic", "Uplifting", "Ambient", "Epic", "Tense"] as const;
export const GENRES = ["Cinematic", "Electronic", "Orchestral", "Hip-Hop", "World"] as const;
export const USAGES = ["Film", "TV", "Ads", "Games", "Podcasts"] as const;

export interface Track {
  id: string;
  slug: string;
  title: string;
  genre: string;
  duration: number;
  bpm: number;
  mood: string[];
  usageTags: string[];
  audioUrl: string;
  artwork?: string;
  description?: string;
  licensingTier?: string;
  featured?: boolean;
}

export const tracks: Track[] = [];

export const services = serviceCategories.map((c) => ({
  id: c.id,
  title: c.title,
  description: c.description,
  icon: "music",
  deliverables: c.items.slice(0, 4),
}));

export const industries = mediaTypes.map((title, i) => ({
  id: title.toLowerCase().replace(/\s+/g, "-"),
  title,
  description: `Audio production tailored for ${title.toLowerCase()}.`,
  icon: "clapperboard",
  tags: [serviceCategories[i % 3].title],
}));

export const clientLogos = brandClients;

export const processSteps = [
  { number: "01", title: "Brief & Discovery", description: "Understanding your story, audience, and sonic goals." },
  { number: "02", title: "Composition & Design", description: "Music, sound design, and creative development." },
  { number: "03", title: "Production & Mix", description: "Recording, editing, mixing, and refinement." },
  { number: "04", title: "Delivery", description: "Final masters and formats for your platform." },
];

export const teamMembers = [
  { id: "1", name: "Sylva Sounds", role: "Audio Production Studio", bio: "Music, sound design, and post-production for modern media." },
];

export const faqs = [
  {
    question: "What types of projects do you take on?",
    answer:
      "We work across feature films, OTT series, trailers, brand films, documentaries, games, and digital content — from scoring to full audio post.",
  },
  {
    question: "Do you offer Dolby Atmos mixing?",
    answer:
      "Yes. We deliver stereo, 5.1, 7.1, and Dolby Atmos mixes from Dolby-certified studio partners.",
  },
  {
    question: "Can you work with remote clients?",
    answer: "Absolutely. We collaborate with teams across India and internationally via secure workflows.",
  },
];

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
