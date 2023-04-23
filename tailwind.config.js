/** @type {import('tailwindcss').Config} */

// @ts-ignore
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      /* partial color scheme while waiting for finalization */
      transparent: "transparent",
      current: "currentColor",
      navy: {
        DEFAULT: "#172f6e",
        deep: "#112353",
        light: "#45598b",
        lighter: "#7482a8",
      },
      blue: "#006ac3",
      "blue-gray": "#9fa9b4",
      mist: "#e9f3f8",
      "dark-blue-gray": "#696c78",
      red: colors.red,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
};
