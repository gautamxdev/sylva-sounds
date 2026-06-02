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
  licensingTier?: "free-preview" | "standard" | "exclusive";
  featured?: boolean;
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
  description?: string;
  challenge?: string;
  approach?: string;
  result?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  client: string;
  industry: string;
  publishedAt: string;
  excerpt: string;
  content?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export const MOODS = ["Dark", "Uplifting", "Tense", "Ambient", "Epic", "Minimal"] as const;
export const GENRES = ["Cinematic", "Electronic", "Orchestral", "Hip-Hop", "World"] as const;
export const USAGES = ["Film", "TV", "Ads", "Games", "Podcasts"] as const;

export const tracks: Track[] = [
  {
    id: "1",
    slug: "midnight-echo",
    title: "Midnight Echo",
    genre: "Cinematic",
    duration: 204,
    bpm: 92,
    mood: ["Dark", "Ambient"],
    usageTags: ["Film", "TV"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    description: "A brooding cinematic piece with layered strings and subtle electronic textures.",
    licensingTier: "standard",
    featured: true,
  },
  {
    id: "2",
    slug: "neon-drift",
    title: "Neon Drift",
    genre: "Electronic",
    duration: 178,
    bpm: 128,
    mood: ["Uplifting", "Epic"],
    usageTags: ["Ads", "Games"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop",
    description: "High-energy electronic track with driving synths and punchy drums.",
    licensingTier: "standard",
  },
  {
    id: "3",
    slug: "forest-whispers",
    title: "Forest Whispers",
    genre: "Orchestral",
    duration: 245,
    bpm: 72,
    mood: ["Ambient", "Minimal"],
    usageTags: ["Film", "Podcasts"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    description: "Delicate orchestral arrangement inspired by natural landscapes.",
    licensingTier: "exclusive",
  },
  {
    id: "4",
    slug: "pulse-protocol",
    title: "Pulse Protocol",
    genre: "Electronic",
    duration: 156,
    bpm: 140,
    mood: ["Tense", "Epic"],
    usageTags: ["Games", "TV"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    description: "Intense electronic score perfect for action sequences.",
    licensingTier: "standard",
  },
  {
    id: "5",
    slug: "golden-hour",
    title: "Golden Hour",
    genre: "World",
    duration: 198,
    bpm: 88,
    mood: ["Uplifting", "Minimal"],
    usageTags: ["Ads", "Film"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    description: "Warm world-music inspired composition with organic instrumentation.",
    licensingTier: "free-preview",
  },
  {
    id: "6",
    slug: "shadow-protocol",
    title: "Shadow Protocol",
    genre: "Hip-Hop",
    duration: 167,
    bpm: 95,
    mood: ["Dark", "Tense"],
    usageTags: ["TV", "Ads"],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artwork: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=600&fit=crop",
    description: "Dark hip-hop instrumental with cinematic undertones.",
    licensingTier: "standard",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    slug: "aurora-film-score",
    title: "Aurora",
    client: "Northlight Pictures",
    type: "Film Scoring",
    year: "2025",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop",
    description: "Full orchestral score for an indie sci-fi feature film.",
    challenge: "Create an emotionally resonant score that balances wonder with tension.",
    approach: "Layered orchestral composition with electronic undertones.",
    result: "Premiered at Sundance, nominated for Best Original Score.",
  },
  {
    id: "2",
    slug: "vertex-brand-identity",
    title: "Vertex Sonic Identity",
    client: "Vertex Labs",
    type: "Brand Audio",
    year: "2025",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop",
    description: "Complete sonic branding system for a tech startup.",
  },
  {
    id: "3",
    slug: "echoes-documentary",
    title: "Echoes of Tomorrow",
    client: "StreamCo",
    type: "Sound Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800&fit=crop",
    description: "Immersive sound design for a documentary series.",
  },
  {
    id: "4",
    slug: "pulse-campaign",
    title: "Pulse Campaign",
    client: "Meridian Athletics",
    type: "Music Production",
    year: "2024",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop",
    description: "High-energy campaign music for global sports brand.",
  },
  {
    id: "5",
    slug: "nocturne-game-audio",
    title: "Nocturne",
    client: "Phantom Interactive",
    type: "Sound Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop",
    description: "Complete audio package for an atmospheric horror game.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "aurora-film-score",
    title: "Scoring the Impossible",
    subtitle: "How we crafted an otherworldly score for Aurora",
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&h=900&fit=crop",
    client: "Northlight Pictures",
    industry: "Film & TV",
    publishedAt: "2025-01-15",
    excerpt: "A deep dive into our creative process for the Aurora film score.",
    content: "When Northlight Pictures approached us with Aurora, they wanted something that had never been heard before...",
  },
  {
    id: "2",
    slug: "vertex-sonic-brand",
    title: "Building a Sonic Brand from Zero",
    subtitle: "Vertex Labs' complete audio identity system",
    heroImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&h=900&fit=crop",
    client: "Vertex Labs",
    industry: "Technology",
    publishedAt: "2025-02-20",
    excerpt: "How we developed a cohesive sonic identity for a fast-growing tech startup.",
    content: "Every brand has a visual identity. Few have a sonic one. Vertex Labs came to us wanting to change that...",
  },
];

export const services = [
  {
    id: "music-production",
    title: "Music Production",
    description: "Original compositions tailored to your vision, from concept to final mix.",
    icon: "music",
    deliverables: ["Original composition", "Arrangement", "Production", "Stem delivery"],
  },
  {
    id: "film-scoring",
    title: "Film Scoring",
    description: "Cinematic scores that elevate storytelling and emotional impact.",
    icon: "film",
    deliverables: ["Spotting session", "Thematic development", "Orchestration", "Final score"],
  },
  {
    id: "sound-design",
    title: "Sound Design",
    description: "Immersive sonic worlds for film, games, and interactive media.",
    icon: "waveform",
    deliverables: ["Foley", "SFX library", "Ambience design", "Implementation support"],
  },
  {
    id: "mixing-mastering",
    title: "Mixing & Mastering",
    description: "Professional polish that makes your audio shine on every platform.",
    icon: "sliders",
    deliverables: ["Mix revision rounds", "Mastering", "Platform optimization", "Quality assurance"],
  },
  {
    id: "audio-post",
    title: "Audio Post-Production",
    description: "Complete post-production pipeline for film, TV, and digital content.",
    icon: "layers",
    deliverables: ["Dialogue edit", "ADR", "Sound design", "Final mix"],
  },
  {
    id: "brand-audio",
    title: "Brand Audio & Sonic Identity",
    description: "Distinctive sonic branding that makes your brand instantly recognizable.",
    icon: "sparkles",
    deliverables: ["Sonic logo", "Brand guidelines", "UI sounds", "Campaign music"],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery & Brief",
    description: "We dive deep into your vision, audience, and creative goals to build a clear roadmap.",
  },
  {
    number: "02",
    title: "Creative Development",
    description: "Concept exploration, mood boards, and initial sketches to find the perfect sonic direction.",
  },
  {
    number: "03",
    title: "Production & Iteration",
    description: "Full production with regular check-ins, revisions, and collaborative refinement.",
  },
  {
    number: "04",
    title: "Delivery & Licensing",
    description: "Final masters, stem files, and clear licensing terms for your project needs.",
  },
];

export const industries = [
  {
    id: "film-tv",
    title: "Film & TV",
    description: "Scores and sound design for features, series, and streaming content.",
    icon: "clapperboard",
    tags: ["Film Scoring", "Sound Design", "Post-Production"],
  },
  {
    id: "advertising",
    title: "Advertising",
    description: "Campaign music and sonic branding that cuts through the noise.",
    icon: "megaphone",
    tags: ["Brand Audio", "Music Production", "Sonic Identity"],
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Immersive audio for interactive experiences and game worlds.",
    icon: "gamepad",
    tags: ["Sound Design", "Adaptive Music", "UI Audio"],
  },
  {
    id: "podcasts",
    title: "Podcasts & Media",
    description: "Intro music, transitions, and audio polish for digital media.",
    icon: "mic",
    tags: ["Music Production", "Mixing", "Mastering"],
  },
  {
    id: "brands",
    title: "Brands & Startups",
    description: "Sonic identities that make your brand unforgettable.",
    icon: "building",
    tags: ["Sonic Identity", "Brand Audio", "UI Sounds"],
  },
  {
    id: "live-events",
    title: "Live Events",
    description: "Custom compositions and sound design for live experiences.",
    icon: "calendar",
    tags: ["Live Music", "Sound Design", "Event Audio"],
  },
];

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Alex Rivera", role: "Founder & Creative Director", bio: "15 years crafting sonic experiences for film and brands." },
  { id: "2", name: "Maya Chen", role: "Head of Production", bio: "Award-winning producer with a passion for cinematic sound." },
  { id: "3", name: "Jordan Blake", role: "Lead Sound Designer", bio: "Specialist in immersive audio for games and interactive media." },
  { id: "4", name: "Sam Okonkwo", role: "Mixing Engineer", bio: "Grammy-nominated engineer with an ear for perfection." },
];

export const clientLogos = [
  "T-Series",
  "Sony Music India",
  "Saregama",
  "Zee Music",
  "Tips Industries",
  "YRF Music",
  "Universal Music India",
  "Warner Music India",
];

export const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Timelines vary by scope. A single track typically takes 1-2 weeks, while full film scores can take 4-8 weeks. We provide detailed timelines during the discovery phase.",
  },
  {
    question: "Do you offer licensing for catalogue tracks?",
    answer: "Yes. Our catalogue offers three tiers: free preview, standard licensing, and exclusive rights. Contact us for custom licensing arrangements.",
  },
  {
    question: "Can you work with remote clients?",
    answer: "Absolutely. We work with clients worldwide and have streamlined remote collaboration workflows including secure file sharing and video calls.",
  },
  {
    question: "What file formats do you deliver?",
    answer: "We deliver in all standard formats: WAV, AIFF, MP3, and platform-specific masters. Stem files and project files are available upon request.",
  },
  {
    question: "How many revision rounds are included?",
    answer: "Standard projects include 2-3 revision rounds. We believe in collaborative refinement and can accommodate additional rounds as needed.",
  },
];

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
