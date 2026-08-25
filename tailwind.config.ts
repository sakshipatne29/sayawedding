import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF7F0",
        blush: "#F6E3E2",
        maroon: { DEFAULT: "#4A0E1F", deep: "#31070F" },
        gold: { DEFAULT: "#C9962F", light: "#E9CE8F" },
        emerald: "#1F4A3D",
        navy: "#1C2B47",
        ink: "#2B1B1F",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
