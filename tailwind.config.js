/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        openPlayer: {
          "0%": { height: "0px", opacity: 0 },
          "100%": { height: "150px", opacity: 1 },
        },
        closePlayer: {
          "0%": { height: "150px", opacity: 1 },
          "100%": { height: "0px", opacity: 0 },
        },
      },
      fontFamily: {
        exo: ["exo", "sans-serif"],
        exo_italic: ["exo_italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
