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
  tagline: "Music, Sound & Audio Production for Modern Media",
  description:
    "Original scores, sound design and audio post-production for brands, films and digital experiences.",
  email: "hello@sylvasounds.com",
  creditsDriveUrl:
    "https://drive.google.com/drive/folders/1MC6ngFWsnaAT3UW6KuxZX3nqXSY_hwqN?usp=drive_link",
};

export interface BrandClient {
  name: string;
  logo?: string | null;
  /** Two-letter monogram when no CDN logo is available */
  monogram?: string;
}

export const brandLogos: BrandClient[] = [
  {
    name: "Tata",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/tata.svg",
  },
  {
    name: "OnePlus",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/oneplus.svg",
  },
  {
    name: "Zee5",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Zee5-official-logo.jpeg",
  },
  {
    name: "BMW",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/bmw.svg",
  },
  {
    name: "Fastrack",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Fastrack_logo.png",
  },
  {
    name: "Parle",
    logo: "https://logo.debounce.com/parleproducts.com",
  },
  { name: "White Hill Music", monogram: "WH" },
  { name: "Wings Music", monogram: "WM" },
  {
    name: "NCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/No_Copyright_Sounds_logo.svg",
  },
  { name: "Spininn", monogram: "SP" },
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
    id: "2",
    slug: "vardaan",
    title: "Vardaan",
    type: "Trailer Score",
    videoUrl: "https://youtu.be/PyuyFSB2x84",
    videoId: "PyuyFSB2x84",
    image: "https://img.youtube.com/vi/PyuyFSB2x84/maxresdefault.jpg",
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
    // No public reel URL on file — excluded from Showreel via videoId filter.
    // TODO(client): Add videoUrl/videoId when a public clip is available; swap image to a Drive poster.
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
];

export const mediaTypes = [
  "Feature Films",
  "OTT & Web Series",
  "Trailers & Promos",
  "Commercials & Brand Films",
  "Documentaries",
  "Video Games",
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
