/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        exo: ["exo", "sans-serif"],
        exo_italic: ["exo_italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
