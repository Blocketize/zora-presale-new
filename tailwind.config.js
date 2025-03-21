/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["dalek", "sans-serif"], 
      },
      backgroundImage: {
        "custom-bg": "url('/public/img/bg.png')",
        "second-bg": "url('/public/img/second-bg.png')",
        "third-bg": "url('/public/img/third-bg.png')",
        "fourth-bg": "url('/public/img/fourth-bg.png')",
        "fifth-bg": "url('/public/img/fifth-bg.png')",
        "sixth-bg": "url('/public/img/sixth-bg.png')",
        "seventh-1-bg": "url('/public/img/seventh-1-bg.png')",
        "seventh-2-bg": "url('/public/img/seventh-2-bg.png')",
        "seventh-3-bg": "url('/public/img/seventh-3-bg.png')",
        "eighth-bg": "url('/public/img/eighth-bg.png')",
        "ninth-bg": "url('/public/img/ninth-bg.png')",
        "ten-bg": "url('/public/img/ten-bg.png')"
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
