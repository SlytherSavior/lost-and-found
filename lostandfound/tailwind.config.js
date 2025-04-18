/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#244b8a',
        primary: 'white',
        card: '#f9fafb',
        cardText: '#1f2937',
        cardAlt: '#e5e7eb',
        cardTextAlt: '#111827',
      }
    },
  },
  plugins: [],
}