/**
 * Tailwind configuration extending the theme with a Dark Neon palette.
 * This provides reusable colors and glow shadows across the app.
 */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0d0221", // Deep dark background
        "neon-cyan": "#00f7ff",
        "neon-magenta": "#ff2df1",
        "neon-lime": "#a8ff00",
      },
      fontFamily: {
        sans: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      boxShadow: {
        // Neon glow shadows for UI elements
        "neon-cyan": "0 0 10px rgba(0,247,255,0.6), 0 0 20px rgba(0,247,255,0.4)",
        "neon-magenta": "0 0 10px rgba(255,45,241,0.6), 0 0 20px rgba(255,45,241,0.4)",
        "neon-lime": "0 0 10px rgba(168,255,0,0.6), 0 0 20px rgba(168,255,0,0.4)",
      },
      borderColor: {
        "neon-cyan": "#00f7ff",
        "neon-magenta": "#ff2df1",
        "neon-lime": "#a8ff00",
      },
    },
  },
  plugins: [],
};