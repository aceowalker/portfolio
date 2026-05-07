import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0A0908",
        surface: "#141210",
        "surface-alt": "#1A1814",
        "nav-bg": "#0F0E0C",
        accent1: "#B8864E",
        accent2: "#D4C5B0",
        "text-primary": "#F0EBE3",
        "text-secondary": "#8A8178",
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        noto: ["Noto Sans JP", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
