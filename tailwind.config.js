// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(table|checkbox|form|spacer).js",
  ],
  theme: {
    extend: {
      screens:{
        'custom-range': { min: '820px', max: '1024px' },
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};