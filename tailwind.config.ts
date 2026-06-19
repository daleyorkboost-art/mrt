import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        midnight: '#FFFFFF',
        gold: '#2563EB',
        pearl: '#F8FAFC',
        mist: '#64748B',
        teal: '#10B981',
        ruby: '#DC2626',
        surface: '#F8FAFC',
        ink: '#0F172A',
        line: '#E2E8F0',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 18px 44px rgba(37, 99, 235, 0.22)',
        glass: '0 18px 52px rgba(15, 23, 42, 0.10)',
      },
      backgroundImage: {
        'gold-line': 'linear-gradient(90deg, rgba(37,99,235,0), rgba(37,99,235,.75), rgba(37,99,235,0))',
      },
    },
  },
  plugins: [],
};

export default config;
