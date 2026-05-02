/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F4EF',
        warmwhite: '#FFFFFF',
        navy: {
          DEFAULT: '#14213D',
          50: '#E7EAF2',
          100: '#C2C9DC',
          900: '#0B1428',
        },
        blush: '#D8A7A7',
        gold: '#C8A96A',
        taupe: '#B7A99A',
        sage: '#A8B8A0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widewide: '0.18em',
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(20, 33, 61, 0.18)',
        ring: '0 0 0 1px rgba(20, 33, 61, 0.08)',
      },
    },
  },
  plugins: [],
};
