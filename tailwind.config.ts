import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0D0D0D',
        brown: '#3B2F2F',
        gold: '#FFD700',
        'gold-hover': '#E6C200',
        beige: '#F5F5DC',
      },
    },
  },
  plugins: [],
} satisfies Config;
