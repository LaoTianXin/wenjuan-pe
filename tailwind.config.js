/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#ff0000',
    },
    container: {
      center: true,
    },
    extend: {
      colors: require('tailwindcss/colors'),
    },
  },
  plugins: [],
}
