import type { Metadata } from 'next'
import './globals.css'
import './utils/colors.css'
import config from '@/config.blog'
import { Nunito } from "next/font/google"
import Providers from './components/Providers'

const nunito = Nunito({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700', '800', '900'] })

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
      <body className={'flex flex-col items-center bg-[--background] text-[--on-background] ' + nunito.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
