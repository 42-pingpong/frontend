/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
			colors: {
				'sky' : '#E9F6FB',
			},
      screens: {
        'game' : '2450px',
      }
		},
  },
  plugins: [],
};
