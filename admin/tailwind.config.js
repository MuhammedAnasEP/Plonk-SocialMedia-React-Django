/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      colors: {
        primarycolor: "#F9A826",
        glass:"rgba(255, 255, 255, 0.25)",
        brown:"reb(30, 30, 17);"
      }
    },
    fontFamily: {
      display: ["Nunito", "sans-serif"]
    }
  },
  plugins: [],
}

