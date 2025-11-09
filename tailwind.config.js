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
        // Original neon accents retained for occasional highlights
        "neon-cyan": "#00f7ff",
        "neon-magenta": "#ff2df1",
        "neon-lime": "#a8ff00",
        // Softer accent tones for more comfortable UI
        "accent-cyan": "#67e8f9", // cyan-300
        "accent-magenta": "#f472b6", // pink-400
        "accent-lime": "#a3e635", // lime-500
        surface: "#140a33", // elevated card surfaces
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
        // Softer glow shadows
        "neon-cyan": "0 0 8px rgba(0,247,255,0.35), 0 0 16px rgba(0,247,255,0.25)",
        "neon-magenta": "0 0 8px rgba(255,45,241,0.35), 0 0 16px rgba(255,45,241,0.25)",
        "neon-lime": "0 0 8px rgba(168,255,0,0.35), 0 0 16px rgba(168,255,0,0.25)",
        card: "0 6px 24px rgba(0,0,0,0.35)",
      },
      borderColor: {
        "neon-cyan": "#00f7ff",
        "neon-magenta": "#ff2df1",
        "neon-lime": "#a8ff00",
        surface: "#ffffff0f",
      },
    },
  },
  plugins: [],
};