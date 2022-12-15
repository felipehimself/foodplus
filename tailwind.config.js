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
        primary: {
          400: '#f95934',
          500: '#f73001',
          600: '#de2b01',
          700: '#c62601',
          800: '#ad2201',
          900: '#941d01',
        },
        accent: {
          400: '#c6015c'
        },
        lightWhite: '#F3F1F2',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
