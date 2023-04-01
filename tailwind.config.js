/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        card: 'calc(100% - 3rem)'
      }
    },
  },
  plugins: [],
}
