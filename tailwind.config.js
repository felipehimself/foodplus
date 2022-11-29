/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#f73001',
          600: '#de2b01',
          700: '#c62601',
          800: '#ad2201',
          900: '#941d01',
        },
        lightWhite: '#F3F1F2',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
