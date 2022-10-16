/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#ff6b35",
        darkble: "#004e89",
        bluee: "#1a659e",
        lightOrange: "#f7c59f",
      },
      fontFamily: {
        Oswald: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
