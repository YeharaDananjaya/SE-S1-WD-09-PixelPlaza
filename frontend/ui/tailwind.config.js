/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your setup
  ],
  theme: {
    extend: {
      fontFamily: {
        russo: ["Russo One", "sans-serif"],
      },
      colors: {
        primary: "#E76F51",
        secondary: "#5C646C",
        light: "#F4F4F4",
        dark: "#212529",
      },
    },
  },
  plugins: [require("daisyui")],
};
