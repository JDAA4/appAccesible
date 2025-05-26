/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
      extend: {
        scale: {
          200: "2",
          300: "3",
        },
      },
    },
    plugins: [],
  }
