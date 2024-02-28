/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueLogo: "#2AA3EF",
        blueBgArticle: "#255878",
      },
    },
  },
  plugins: [],
};
