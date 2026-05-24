/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        adventure:{
          light: 'white', // Your fresh background
          dark: '#0A4D68',  // Your deep text color
          primary: '#10B981', // Your happy accent green
          sun: '#F97316',    // A bright orange for buttons
        }
      }
    },
  },
  plugins: [],
}