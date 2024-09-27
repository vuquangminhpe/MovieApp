/** @type {import('tailwindcss').Config} */
const { Container } = require('postcss')
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        tmdbLightGreen: 'var(--tmdbLightGreen)',
        tmdbLightBlue: 'var(--tmdbLightBlue)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: '90rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4xl'),
          paddingRight: theme('spacing.4xl')
        }
      })
    })
  ]
}
