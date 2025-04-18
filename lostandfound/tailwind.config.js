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
        background: '#0f172a',   // slate-900 (rich dark blue)
        surface: '#1e293b',      // slate-800 (for cards, inputs)
        primary: '#3b82f6',      // blue-500 (main accent)
        primaryDark: '#2563eb',  // blue-600 (hover/active)
        accent: '#6366f1',       // indigo-500 (secondary)
        muted: '#94a3b8',        // slate-400 (placeholder, labels)
        danger: '#ef4444',
        card: '#1e293b',         // same as surface, better for contrast
        border: '#334155',       // slate-700 (subtle borders)
        text: '#f1f5f9',         // slate-100 (light text)
        buttonText: 'black'
      }
    },
  },
  plugins: [],
}