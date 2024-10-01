/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your setup
  ],
  theme: {
    extend: {

      textShadow: {
        'none': 'none',
        'sm': '1px 1px 0 rgba(0, 0, 0, 0.1)',
        'DEFAULT': '2px 2px 0 rgba(0, 0, 0, 0.2)',
        'md': '3px 3px 0 rgba(0, 0, 0, 0.3)',
        'lg': '4px 4px 0 rgba(0, 0, 0, 0.4)',
        'xl': '5px 5px 0 rgba(0, 0, 0, 0.5)',
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        russo: ["Russo One", "sans-serif"],
        kdamThmorPro: ["Kdam Thmor Pro", "sans-serif"],
        lorniasolid: ["Londrina Solid", "sans-serif"],
        bebasneue: ["Bebas Neue", "sans-serif"],
        bricolagegrotesque: ["Bricolage Grotesque", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        ibmplexsans: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        primary: "#E76F51",
        secondary: "#5C646C",
        light: "#F4F4F4",
        dark: "#212529",
        baseextra3: "#212529",
        baseextra4: "#02203c",
        baseextra5: "#171614",
        baseextra6: "#FFFFFF",
        baseextra7: "#000000",
        baseextra8: "#cf401d",
      },
      screens: {
        sms: { min: "10px", max: "640px" }, // screens <= 640px
        mds: { min: "641px", max: "1023px" }, // screens <= 1023px
        lgs: { min: "1024px", max: "5000px" }, // screen <= 1536px
      },
      inset: {
        5: "5px",
      },
    },
  },
  plugins: [require("daisyui"),
    require('tailwindcss-textshadow'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {},
};
