/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        vandebharat: "url('/vandebharat2.jpg')",
      },
    },
  },
  plugins: [],
};
