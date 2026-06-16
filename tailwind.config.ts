import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A1931',
        midnight: '#071225',
        gold: '#C9A84C',
        pearl: '#F7F4EA',
        mist: '#BFC8D8',
        teal: '#0F766E',
        ruby: '#8F2D56',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(201, 168, 76, 0.20)',
        glass: '0 22px 70px rgba(0, 0, 0, 0.34)',
      },
      backgroundImage: {
        'gold-line': 'linear-gradient(90deg, rgba(201,168,76,0), rgba(201,168,76,.8), rgba(201,168,76,0))',
      },
    },
  },
  plugins: [],
};

export default config;
