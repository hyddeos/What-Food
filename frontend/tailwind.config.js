/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'blue': {
        '50': '#f1f5fc',
        '100': '#e5eefa',
        '200': '#cfdff6',
        '300': '#b2c9ef',
        '400': '#93abe6',
        '500': '#788fdc',
        '600': '#5e6fcd',
        '700': '#4e5cb4',
        '800': '#414d92',
        '900': '#232946',
      },
     'headline': '#fffffe',
      'prim': {
        '50': '#fcf4f4',
        '100': '#fae9eb',
        '200': '#f5d6db',
        '300': '#eebbc3',
        '400': '#e18b9a',
        '500': '#d26178',
        '600': '#bc4261',
        '700': '#9e3250',
        '800': '#852c48',
        '900': '#722941',
      },
      'sec': {
        '50': '#f1f4fc',
        '100': '#e6eaf9',
        '200': '#d2d8f3',
        '300': '#b8c1ec',
        '400': '#989fe1',
        '500': '#7e80d6',
        '600': '#6a64c7',
        '700': '#5b54ae',
        '800': '#4a468d',
        '900': '#403e71',
      },
    },
    extend: {},
  },
  plugins: [],
}
