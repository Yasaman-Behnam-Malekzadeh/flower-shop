/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandPurple: "#584172",
        cream: "#FAF6EE",
        sage: "#E2EBE0",
      },
    },
  },
  plugins: [],
};
