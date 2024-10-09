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
      colors: {
        'background': 'var(--background)',
        'on-background': 'var(--on-background)',
        'on-background-stronger': 'var(--on-background-stronger)',
        'on-background-muted': 'var(--on-background-muted)',
        'primary': 'var(--primary)',
        'outline': 'var(--outline)',
        'code-bg': 'var(--code-bg)',
        'on-code': 'var(--on-code)',
        'code-bg-highlight': 'var(--code-bg-highlight)',
        'code-border-highlight': 'var(--code-border-highlight)',
        'inlineCode-bg': 'var(--inlineCode-bg)',
        'inlineCode-text': 'var(--inlineCode-text)',
        'link': 'var(--link)',
        'link-hover': 'var(--link-hover)',
      }
    }
  },
  plugins: [],
  darkMode: "class"
}
export default config
