/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#14FF00",
        sleep: "#AEAEAE",
        dc: "#35373C",
      },
      fontFamily: {
        main: "Main",
      },
      dropShadow: {
        main: "0 0 1rem rgb(20 255 0 / 25%)",
      },
    },
  },
  plugins: [],
};
