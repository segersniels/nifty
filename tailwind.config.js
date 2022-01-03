module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: '#6236FF',
        gradient: {
          from: 'rgb(236, 63, 251)',
          to: 'rgb(252, 229, 70)',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
