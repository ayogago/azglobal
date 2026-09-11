import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette sampled from the AZ Global logo.
        primary: {
          DEFAULT: '#077AA3', // AA contrast on white for text and buttons
          dark: '#065F80',
          bright: '#0A8FBD', // logo blue, decorative use
          soft: '#E7F4F9',
        },
        leaf: {
          DEFAULT: '#8BB141', // logo green, use on dark backgrounds
          dark: '#4F7A17', // AA contrast on white
          soft: '#F1F6E6',
        },
        sun: '#F0891F',
        dark: {
          DEFAULT: '#0E2433',
          light: '#4A5A68',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,36,51,0.06), 0 8px 24px rgba(14,36,51,0.06)',
      },
    },
  },
  plugins: [],
};
export default config;
