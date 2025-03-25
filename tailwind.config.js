module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/@themesberg/flowbite/**/*.js',
  ],
  plugins: [require('@tailwindcss/line-clamp')],
  theme: {
    spacing: true,
    screens: {
      xl: { min: '1216px' },
      '2xl': { min: '1536px' },
      a: { max: '1215px' },
      b: { max: '1024px' },
      c: { max: '900px' },
      d: { max: '800px' },
      e: { max: '768px' },
      f: { max: '600px' },
      g: { max: '485px' },
      j: { max: '410px' },
      h: { max: '375px' },
    },
    extend: {
      colors: {
        black: {
          DEFAULT: '#2C2D33',
        },
        blue: {
          DEFAULT: '#DA6B3B',
          dark: '#52230F',
          500: '#FD6625',
          600: '#DB490B',
          900: '#3C281F',
        },
        gray: {
          light: '#F1F1F2',
          100: '#F0F3F6',
          200: '#C0C0C0',
          300: '#BCBFCB',
          400: '#90A1B5',
        },
        orange: {
          DEFAULT: '#DA6B3B',
        },
        red: {
          DEFAULT: '#E5274E',
        },
        violet: {
          DEFAULT: '#CBCDFC',
        },
      },
      fontSize: {
        18: '18px',
        24: '24px',
        32: '32px',
        40: '40px',
      },
      lineHeight: {
        12: '12px',
        19: '19px',
        22: '22px',
        24: '24px',
        54: '54px',
        130: '130%',
      },
      boxShadow: {
        'level-shadow': '0px 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
}
