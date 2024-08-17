import type { Metadata } from 'next'
import './globals.css'
import './utils/colors.css'
import Header from './components/Header'
import ThemeProvider from './components/ThemeProvider'
import './utils/font'
import config from '@/config.blog'

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
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
