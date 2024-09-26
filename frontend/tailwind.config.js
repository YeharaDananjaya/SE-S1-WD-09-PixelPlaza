/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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

      colors: { // adding colors to the platform
        primary: "#FFFFFF",
        secondary: "#000000",
        baseextra2: "#E76F51",
        baseextra6: "#cf401d",
        baseextra3: "#212529",
        baseextra4: "#02203c",
        baseextra5: "#171614"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        russoone: ['Russo One', 'sans-serif'],
        kdamThmorPro: ['Kdam Thmor Pro', 'sans-serif'],
        lorniasolid: ['Londrina Solid', 'sans-serif'],
        bebasneue: ['Bebas Neue', 'sans-serif'],
        bricolagegrotesque: ['Bricolage Grotesque', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        ibmplexsans: ['IBM Plex Sans', 'sans-serif'],
      },
      screens: {
        'sms': { 'min': '10px','max': '640px' }, // screens <= 640px
        'mds': { 'min': '641px','max': '1023px'}, // screens <= 1023px
        'lgs': { 'min': '1024px','max': '5000px'} // screen <= 1536px
      },
      inset: {
        '5': '5px',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}

