/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      maxWidth: {
        xl: '36rem',
      },
      colors: {
        pv: {
          DEFAULT: "#6b123b", // Couleur principale P&V
          light: "#9c1f59",
        },
        jsia: {
          DEFAULT: "#00324b", // Couleur principale JS-INNOV.IA
          light: "#00597d",
        },
      },
    },
  },
  plugins: [],
};
