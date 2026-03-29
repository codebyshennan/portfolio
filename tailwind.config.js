/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-kaisei)'],
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
        DEFAULT: {
          css: {
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#111827',
            '--tw-prose-links': '#111827',
            lineHeight: '1.8',
            h1: {
              fontWeight: '700',
              letterSpacing: '-0.025em',
              lineHeight: '1.2',
            },
            h2: {
              fontWeight: '600',
              letterSpacing: '-0.02em',
              lineHeight: '1.3',
              marginTop: '2em',
              marginBottom: '0.75em',
            },
            h3: {
              fontWeight: '600',
              letterSpacing: '-0.015em',
              lineHeight: '1.4',
            },
            p: {
              lineHeight: '1.8',
            },
            'ul > li': {
              paddingLeft: '0.375em',
            },
            'ul > li::marker': {
              color: '#9ca3af',
            },
            'ol > li::marker': {
              color: '#9ca3af',
            },
            hr: {
              borderColor: '#e5e7eb',
              marginTop: '3em',
              marginBottom: '3em',
            },
            table: {
              fontSize: '0.875em',
            },
            'thead th': {
              fontWeight: '600',
              backgroundColor: '#f9fafb',
            },
            'tbody tr': {
              borderBottomColor: '#f3f4f6',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
