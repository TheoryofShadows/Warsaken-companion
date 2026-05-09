/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Oswald', 'Impact', 'sans-serif'],
      },
      colors: {
        mil: {
          base:    '#0d1a0f',
          deeper:  '#080f0a',
          panel:   '#111e12',
          border:  '#2d4a1e',
          muted:   '#1a2e1b',
          green:   '#3a6b27',
          olive:   '#4a5c2a',
          red:     '#cc2200',
          redsoft: '#a31a00',
          redbright: '#e63300',
          paper:   '#e8dcc8',
          stone:   '#b5a98a',
          fade:    '#7a6e58',
          ghost:   '#3d3628',
        },
      },
    },
  },
  plugins: [],
};
