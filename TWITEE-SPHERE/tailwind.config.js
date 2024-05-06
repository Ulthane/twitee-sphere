/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        blueLogo: "#2AA3EF",
        blueLogoDark: "#2792d5",
        blueLogoLight: "#7ab7dd",
        blueBgArticle: "#255878",
        blueBgArticleLight: "rgba(43,105,143,.2)",
      },
    },
  },
  plugins: [],
};
