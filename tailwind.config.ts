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
      fontWeight: {
        lighter: '300',
        light: '350',
        normal: '400',
        medium: '450',
        semibold: '500',
        bold: '600',
        extrabold: '700',
      }
    },
  },
  plugins: [],
}
export default config
