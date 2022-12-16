/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '984px',
        '2xl': '984px',
      },
    },
    extend: {},
    fontSize: {
      "xs": ["10px", "10px"],
      "sm": ["14px", "20px"],
      "base": ["16px", "24px"],
      "lg": ["18px", "28px"],
      "2xl": ["32px", "40px"],
    },
    fontWeight: {
      "normal": 400,
      "medium": 500,
      "semi-bold": 600,
      "bold": 700,
      "extra-bold": 800,
    },
  },
}
