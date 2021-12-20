module.exports = {
  //mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // colors: {
      //   azure: {
      //     50: '#f3fafd',
      //     100: '#e0e6fd',
      //     200: '#c7d3fb',
      //     300: '#9cbdfc',
      //     400: '#6f9ffc',
      //     500: '#4b7dfc',
      //     600: '#345df5',
      //     700: '#2b46d9',
      //     800: '#2a3ab1',
      //     900: '#28348e',
      //   },
      //   gray: {
      //     50: '#f8f9f8',
      //     100: '#f0eff0',
      //     200: '#dedbdf',
      //     300: '#bbb8be',
      //     400: '#939097',
      //     500: '#776f74',
      //     600: '#605458',
      //     700: '#4a3f44',
      //     800: '#332c30',
      //     900: '#201c1f',
      //   },
      //   purple: {
      //     50: '#fbfafa',
      //     100: '#f6ecf7',
      //     200: '#efc9f1',
      //     300: '#df9fe0',
      //     400: '#db74ce',
      //     500: '#cc51c0',
      //     600: '#b536a8',
      //     700: '#902a84',
      //     800: '#681e5a',
      //     900: '#401532',
      //   },
      //   cerise: {
      //     50: '#fdfcfb',
      //     100: '#fceeef',
      //     200: '#f9c7e0',
      //     300: '#f298c2',
      //     400: '#f268a0',
      //     500: '#ea4685',
      //     600: '#d92d64',
      //     700: '#b62249',
      //     800: '#8a192f',
      //     900: '#591119',
      //   },
      // },
    },
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
