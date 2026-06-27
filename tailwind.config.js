/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
         surface: "var(--color-surface-bg)",
        primary: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-brand-accent)",
        panel: "var(--color-surface-panel)",
      }
    },
  },
  plugins: [],
} 