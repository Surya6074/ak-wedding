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
        ivory: {
          50: "#FFFEFB",
          100: "#FAF7F2",
          200: "#F4EFEA",
          300: "#EDE4DA",
        },
        champagne: {
          50: "#FAF6EF",
          100: "#F4ECDD",
          200: "#E9DAC0",
          300: "#DBC49E",
          400: "#CCA977",
          500: "#C5A059",
          600: "#A8833E",
          700: "#86652B",
        },
        gold: {
          50: "#FDFBF5",
          100: "#FBF5EA",
          200: "#F5E9D3",
          300: "#EBD5B0",
          400: "#DFBA73",
          500: "#D4AF37",
          600: "#B88E28",
          700: "#8E6F34",
        },
        sand: {
          50: "#F8F5F0",
          100: "#EFE8DE",
          200: "#E3D8CA",
          300: "#D5C7B5",
        },
        rosewood: {
          50: "#FAF3F4",
          100: "#F4E4E6",
          200: "#EBD0D4",
          300: "#DCB2B9",
          400: "#C88A96",
          500: "#A7596B",
          600: "#8B3A4A",
          700: "#6B2332",
        },
        editorial: {
          DEFAULT: "#2C2422",
          muted: "#635754",
          light: "#847773",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        heading: ["'Playfair Display'", "Georgia", "serif"],
        script: ["'Great Vibes'", "cursive"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        tamil: ["'Noto Serif Tamil'", "serif"],
      },
      boxShadow: {
        luxury: "0 20px 45px -15px rgba(44, 36, 34, 0.08)",
        goldGlow: "0 0 35px rgba(197, 160, 89, 0.22)",
        card: "0 10px 30px -10px rgba(44, 36, 34, 0.05), 0 0 0 1px rgba(197, 160, 89, 0.15)",
        floating: "0 25px 50px -12px rgba(44, 36, 34, 0.12)",
      },
      letterSpacing: {
        editorial: "0.28em",
        wideSpaced: "0.4em",
      },
    },
  },
  plugins: [],
};

export default config;
