import type { Metadata } from 'next'
import './globals.css'
import './utils/colors.css'
import config from '@/config'
import Providers from './components/Providers'

import { Nunito } from "next/font/google"
const font = Nunito({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800', '900'] })

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
