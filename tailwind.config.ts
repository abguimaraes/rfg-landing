import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1200px' },
    },
    extend: {
      colors: {
        rfg: {
          dark: '#246BB2',
          mid: '#3688C8',
          light: '#4CB3E6',
          DEFAULT: '#3688C8',
        },
        neutral: {
          50: '#F7F9FC',
          100: '#EEF2F8',
          200: '#DCE3ED',
          300: '#BFC9D6',
          400: '#94A3B5',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F1A2E',
        },
        success: { 50: '#F0FAF4', 500: '#16A34A', 700: '#15803D' },
        warning: { 50: '#FEF8EC', 500: '#D97706', 700: '#A35D03' },
        error: { 50: '#FEF2F2', 500: '#DC2626', 700: '#B91C1C' },
        info: { 50: '#EFF6FF', 500: '#3688C8' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        h1: ['clamp(2.25rem, 4vw + 1rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        h2: ['clamp(1.875rem, 3vw + 1rem, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        h3: ['clamp(1.5rem, 2vw + 1rem, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        h4: ['clamp(1.25rem, 1vw + 1rem, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        eyebrow: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '600' }],
        lead: ['clamp(1.125rem, 0.5vw + 1rem, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.005em', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.55', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        small: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
        // Phase B+C Tier 1 — editorial mega scale (Hero + Prova).
        // clamp() garante que escalam suavemente entre mobile e desktop sem
        // estouro horizontal em headlines com acentos pt-BR.
        mega: ['clamp(4rem, 8vw + 1rem, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-xl': ['clamp(3rem, 6vw + 1rem, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-lg': ['clamp(2.5rem, 5vw + 1rem, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        motif: ['clamp(4rem, 12vw, 12rem)', { lineHeight: '0.9', letterSpacing: '0.4em', fontWeight: '200' }],
      },
      spacing: {
        'section-mobile': '3rem',
        'section-tablet': '4rem',
        'section-desktop': '6rem',
        'section-gap': '8rem',
      },
      maxWidth: {
        container: '1200px',
        narrow: '760px',
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(36,107,178,0.06), 0 1px 3px 0 rgba(15,26,46,0.08)',
        DEFAULT: '0 4px 8px -2px rgba(36,107,178,0.08), 0 2px 4px -1px rgba(15,26,46,0.06)',
        md: '0 4px 8px -2px rgba(36,107,178,0.08), 0 2px 4px -1px rgba(15,26,46,0.06)',
        lg: '0 12px 24px -6px rgba(36,107,178,0.1), 0 4px 8px -2px rgba(15,26,46,0.06)',
        xl: '0 24px 48px -12px rgba(36,107,178,0.18), 0 8px 16px -4px rgba(15,26,46,0.08)',
        '2xl': '0 40px 80px -20px rgba(36,107,178,0.25), 0 16px 32px -8px rgba(15,26,46,0.1)',
        focus: '0 0 0 4px rgba(76,179,230,0.35)',
        cta: '0 8px 24px -4px rgba(36,107,178,0.4)',
        'cta-hover': '0 12px 32px -6px rgba(36,107,178,0.5)',
        // Phase A — shadows ousadas para cards
        'card-default':
          '0 1px 3px 0 rgba(36,107,178,0.08), 0 1px 2px -1px rgba(36,107,178,0.06)',
        'card-hover':
          '0 10px 15px -3px rgba(36,107,178,0.12), 0 4px 6px -4px rgba(36,107,178,0.10)',
        'card-featured':
          '0 25px 50px -12px rgba(36,107,178,0.25), 0 0 0 1px rgba(76,179,230,0.5)',
        'glow-brand': '0 0 40px rgba(76,179,230,0.30)',
      },
      backgroundImage: {
        'rfg-gradient': 'linear-gradient(180deg, #246BB2 0%, #3688C8 50%, #4CB3E6 100%)',
        'rfg-gradient-cta': 'linear-gradient(135deg, #246BB2 0%, #3688C8 60%, #4CB3E6 100%)',
        // Phase A — surfaces como background-image (gradients)
        'surface-brand-strong':
          'linear-gradient(180deg, #246BB2 0%, #3688C8 50%, #4CB3E6 100%)',
        'surface-brand-soft':
          'linear-gradient(180deg, rgba(36,107,178,0.04) 0%, rgba(76,179,230,0.06) 100%)',
        // Phase B+C Tier 1 — surfaces editoriais novas
        'surface-deep-rich':
          'linear-gradient(180deg, #0F1A2E 0%, #1E293B 60%, #0F1A2E 100%)',
        'surface-hero':
          'linear-gradient(180deg, rgba(36,107,178,0.05) 0%, rgba(76,179,230,0.08) 60%, rgba(255,255,255,1) 100%)',
        'surface-spotlight':
          'radial-gradient(ellipse 1200px 600px at 70% 40%, rgba(76,179,230,0.12) 0%, rgba(36,107,178,0.06) 30%, transparent 70%)',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
        slower: '600ms',
      },
    },
  },
  plugins: [typography],
};

export default config;
