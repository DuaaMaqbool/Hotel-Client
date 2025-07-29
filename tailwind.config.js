/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  
  theme: {
    extend: {
        zIndex: {
        '100': '100',
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        lora: ['"Lora"', "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#F4C67A", // this is what `bg-primary` will use
          light: "#FAD997", // optional: lighter shade
          dark: "#D9AC5E",
        },
        secondary: {
          DEFAULT: "#FBBF24",
          dark: "#B45309",
        },
      },
      
    },
  },
  plugins: [],
};
