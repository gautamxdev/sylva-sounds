import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "surface-01": "var(--surface-01)",
        "surface-02": "var(--surface-02)",
        "green-core": "var(--green-core)",
        "green-muted": "var(--green-muted)",
        "green-dim": "var(--green-dim)",
        "white-soft": "var(--white-soft)",
        "grey-mid": "var(--grey-mid)",
        "grey-text": "var(--grey-text)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
      },
      transitionTimingFunction: {
        smooth: "var(--transition-smooth)",
        spring: "var(--transition-spring)",
      },
    },
  },
  plugins: [],
};

export default config;
