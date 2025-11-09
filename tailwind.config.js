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
        soft: "#F4F6F9", // Background: light gray
        slate: "#34495E", // Text: dark slate
        primary: "#2C3E50", // Header: midnight blue
        accent: "#3498DB", // Accent: peter river blue
        muted: "#6B7B8C",
        border: "#E6EDF5",
        card: "#FFFFFF",
      },
      fontFamily: {
        sans: [
          "Montserrat",
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
        "soft-lg": "0 8px 24px rgba(18, 38, 63, 0.06)",
        "soft-hover": "0 12px 28px rgba(18, 38, 63, 0.10)",
      },
    },
  },
  plugins: [],
};