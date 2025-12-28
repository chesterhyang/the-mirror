import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyber-Noir Palette
        'void': '#000000',           // Pure black background
        'neon-red': '#FF3B30',       // Trauma/Alert
        'terminal-green': '#00FF41', // System logs
        'deep-purple': '#7B2CBF',    // Mystery
        'cyber-blue': '#00D4FF',     // Accent
        'ghost-white': '#E8E8E8',    // Text
        'dim-gray': '#1A1A1A',       // Card backgrounds
        'border-harsh': '#333333',   // Borders
      },
      fontFamily: {
        'mono': ['Space Mono', 'Courier Prime', 'Courier New', 'monospace'],
        'serif': ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        'chinese': ['Noto Serif SC', 'Source Han Serif CN', 'serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'typewriter': 'typewriter 0.1s steps(1) infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'pulse-neon': {
          '0%, 100%': {
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
            opacity: '1'
          },
          '50%': {
            boxShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 10px currentColor',
            opacity: '0.8'
          },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
        'scanline': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      boxShadow: {
        'neon-red': '0 0 10px #FF3B30, 0 0 20px #FF3B30, 0 0 30px #FF3B30',
        'neon-green': '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41',
        'neon-purple': '0 0 10px #7B2CBF, 0 0 20px #7B2CBF, 0 0 30px #7B2CBF',
        'neon-blue': '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF',
      },
      borderRadius: {
        'none': '0px', // Enforce sharp edges
      },
    },
  },
  plugins: [],
}

export default config
