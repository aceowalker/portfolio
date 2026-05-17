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
        base: "#FAF7F2",
        surface: "#FFFFFF",
        "surface-alt": "#F5EEE4",
        "nav-bg": "#FFFFFF",
        accent1: "#B8864E",
        accent2: "#8A6B3A",
        "text-primary": "#1C1916",
        "text-secondary": "#6B6158",
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
