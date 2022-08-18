/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      'zen-antique':['"Permanent Marker"','Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif']
    },
    extend: {
      spacing: {
      '128': '32rem',
    }},
  },
  plugins: [require('flowbite/plugin'),], 
}