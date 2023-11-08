const defaultTheme = require('tailwindcss/defaultTheme')

const colors = require('./src/styles/colors')

module.exports = {
  important: true,
  darkMode: true,
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Circular', ...defaultTheme.fontFamily.sans],
    },
    colors,
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens: {
        '2xs': '375px', // 例如，适用于较小的手机
        xs: '414px', // 特别为 iPhone 8 Plus 等设备设置
      },
    },
  },
}
