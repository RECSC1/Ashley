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
          DEFAULT: '#1C1C1C',
          50: '#F2F1F0',
          100: '#D9D7D4',
          900: '#111111',
        },
        blush: '#D8A7A7',
        gold: '#C8A96A',
        taupe: '#B7A99A',
        sage: '#A8B8A0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widewide: '0.18em',
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(28, 28, 28, 0.18)',
        ring: '0 0 0 1px rgba(28, 28, 28, 0.08)',
      },
    },
  },
  plugins: [],
};
