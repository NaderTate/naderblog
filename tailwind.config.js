const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "dark-blue": "var(--dark-blue)",
        "light-blue": "var(--light-blue)",
        "very-light-blue": "var(--very-light-blue)",
        "super-light-blue": "var(--super-light-blue)",
        yellow: "var(--yellow)",
      },
    },
  },
  plugins: [nextui()],
};
