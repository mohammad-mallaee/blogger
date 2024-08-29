import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx,md}',
    './components/**/*.{js,ts,jsx,tsx,mdx,md}',
    './app/**/*.{js,ts,jsx,tsx,mdx,md}',
    './public/**/*.{js,ts,jsx,tsx,mdx,md}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'background': 'var(--background)',
      'on-background': 'var(--on-background)',
      'on-background-variant': 'var(--on-background-variant)',
      'background-hover': 'var(--background-hover)',
      'primary': 'var(--primary)',
      'on-primary': 'var(--on-primary)',
      'surface': 'var(--surface)',
      'on-surface': 'var(--on-surface)',
      'on-surface-variant': 'var(--on-surface-variant)',
      'on-surface-variant2': 'var(--on-surface-variant2)',
      'surface-hover': 'var(--surface-hover)',
      'outline': 'var(--outline)',
      'icon-button': 'var(--icon-button)',
      'code-bg': 'var(--code-bg)',
      'on-code': 'var(--on-code)',
      'code-bg-highlight': 'var(--code-bg-highlight)',
      'code-border-highlight': 'var(--code-border-highlight)',
      'inlineCode-bg': 'var(--inlineCode-bg)',
      'inlineCode-text': 'var(--inlineCode-text)',
      'link': 'var(--link)',
    }
  },
  plugins: [],
}
export default config
