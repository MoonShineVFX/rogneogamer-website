/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        cachet: ["Cachet", "sans-serif"],
        cachetpro: ["CachetPro", "sans-serif"],
        cachetproobl: ["CachetProObl", "sans-serif"],
        rog: ["ROGFonts", "sans-serif"],
        robotocon: ["RobotoCon", "sans-serif"],
        robotoconbold: ["RobotoConBold", "sans-serif"],
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2000px",
      },
    },
  },
  plugins: [],
};
