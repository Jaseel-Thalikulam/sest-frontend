/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",


  ],
  theme: {
    extend: {
      textColor: {
        'c0c0c0': '#c0c0c0',
        '12222E': '#12222E',
        '555':'#555',
        '888888':'#888888',
        
      },
      backgroundColor: {
        'fafa':'#FAFAFC',
        '1C1D1F':'#1C1D1F',
        '8A3FFC':'#8A3FFC',
        '12222E':'#12222E',
      }

    },
  },
  plugins: [ ],
}
