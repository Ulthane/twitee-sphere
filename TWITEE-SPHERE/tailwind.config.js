/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        blueLogo: "#2AA3EF",
        blueLogoDark: "#2792d5",
        blueBgArticle: "#255878",
      },
    },
  },
  plugins: [],
};
