/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050608',
          900: '#080a0f',
          850: '#0c0f17',
          800: '#121622',
          700: '#1a2030',
          600: '#252e42',
        },
        cyber: {
          cyan: '#00f2fe',
          teal: '#4facfe',
          purple: '#8a2be2',
          neon: '#00ffcc',
          rose: '#ff007f',
          amber: '#ffb703',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'ticker': 'ticker 35s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(16px)' },
          '50%': { opacity: '0.8', filter: 'blur(24px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
