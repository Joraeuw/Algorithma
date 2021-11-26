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
    minWidth: {
      0: '0',
      '100px': '100px',
      '150px': '150px',
      '200px': '200px',
      '250px': '250px',
      '300px': '300px',
      '350px': '350px',
      '400px': '400px',
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
