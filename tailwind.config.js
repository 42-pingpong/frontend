/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: '#E9F6FB',
        borderBlue: '#2FA5BB',
        progressBlue: '#97D2DD',
      },
      screens: {
        game: '2450px',
      },
    },
  },
  plugins: [],
};
