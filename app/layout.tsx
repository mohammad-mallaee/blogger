import type { Metadata } from 'next'
import './globals.css'
import './utils/colors.css'
import './utils/variables.css'
import './utils/extra.css'
import config from '@/config'
import Providers from './components/Providers'
import font from './utils/font'

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={'flex flex-col items-center bg-background text-on-background ' + font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
