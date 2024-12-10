/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'App.tsx'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'general-bold': ['GeneralSans700'],
        'general-regular': ['GeneralSans400'],
        'general-semibold': ['GeneralSans500'],
      },
    },
  },
  plugins: [],
};
