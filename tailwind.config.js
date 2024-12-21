/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './website/templates/website/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

