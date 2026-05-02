import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: 'var(--term-bg)',
          surface: 'var(--term-surface)',
          border: 'var(--term-border)',
          text: 'var(--term-text)',
          dim: 'var(--term-dim)',
          accent: 'var(--term-accent)',
          muted: 'var(--term-muted)',
          error: 'var(--term-error)',
          warn: 'var(--term-warn)',
          link: 'var(--term-link)',
        },
      },
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'IBM Plex Mono',
          'Fira Code',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        flicker: {
          '0%,19.999%,22%,62.999%,64%,64.999%,70%,100%': { opacity: '1' },
          '20%,21.999%,63%,63.999%,65%,69.999%': { opacity: '0.85' },
        },
        scan: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(100%)' },
        },
        glitch: {
          '0%,100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        glow: {
          '0%,100%': { textShadow: '0 0 4px var(--term-accent)' },
          '50%': { textShadow: '0 0 12px var(--term-accent)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        flicker: 'flicker 6s infinite',
        scan: 'scan 8s linear infinite',
        glitch: 'glitch 200ms linear',
        glow: 'glow 2.5s ease-in-out infinite',
      },
      boxShadow: {
        terminal: '0 0 80px -20px var(--term-accent), inset 0 0 0 1px var(--term-border)',
      },
    },
  },
  plugins: [],
};

export default config;
