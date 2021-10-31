// tailwind.config.js
module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    cursor: {
      drag: '-webkit-grab',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
