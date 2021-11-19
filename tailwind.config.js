module.exports = {
  //mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    cursor: {
      pointer: 'pointer',
      drag: '-webkit-grab',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
