/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        darkPink: "#CE7E8B",
        darkPinkHover:"#ad6a75",
        lightRed: "#faf5f5",
      },
    },
  },
  plugins: [],
};
