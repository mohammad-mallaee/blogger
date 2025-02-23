import type { Metadata } from 'next'
import './globals.css'
import './utils/colors.css'
import './utils/variables.css'
import './utils/extra.css'
import config from '@/config'
import Providers from './components/providers'
import fonts from './utils/font'

export const metadata: Metadata = {
  metadataBase: new URL(config.metadata_base),
  title: {
    default: config.blog_name,
    template: `%s | ${config.blog_name}`,
  },
  icons: {
    icon: '/logo.png',
  },
  description: config.description
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontFamily = Array.isArray(fonts)
    ? fonts.map(f => f.style.fontFamily.split(",")[0]).join(", ")
    : fonts.style.fontFamily
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={'flex bg-background text-on-background justify-center gap-8'}
        style={{ fontFamily }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
