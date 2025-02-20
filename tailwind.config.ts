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
      colors: {
        'background': 'var(--background)',
        'on-background': 'var(--on-background)',
        'on-background-stronger': 'var(--on-background-stronger)',
        'on-background-muted': 'var(--on-background-muted)',
        'primary': 'var(--primary)',
        'outline': 'var(--outline)',
        'code-bg': 'var(--code-bg)',
        'on-code': 'var(--on-code)',
        'surface': 'var(--surface)',
        'code-bg-highlight': 'var(--code-bg-highlight)',
        'code-border-highlight': 'var(--code-border-highlight)',
        'inlineCode-bg': 'var(--inlineCode-bg)',
        'inlineCode-text': 'var(--inlineCode-text)',
        'link': 'var(--link)',
        'link-hover': 'var(--link-hover)',
      },
      maxWidth: {
        "post": 'var(--max-post-width)',
      },
      width: {
        "logo": "var(--logo-size)",
        "logo-sm": "var(--logo-size-sm)",
      },
      height: {
        "logo": "var(--logo-size)",
        "logo-sm": "var(--logo-size-sm)",
      },
      fontSize: {
        "body": "var(--font-body)",
        "label": "var(--font-label)",
        "label-sm": "var(--font-label-small)",
        "h1": "var(--font-h1)",
        "h2": "var(--font-h2)",
        "h3": "var(--font-h3)",
        "h4": "var(--font-h4)",
        "name": "var(--font-name)",
        "name-sm": "var(--font-name-small)",
      }
    }
  },
  plugins: [],
  darkMode: "class"
}
export default config
