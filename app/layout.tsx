import type { Metadata } from 'next'
import '../utils/globals.css'
import '../utils/colors.css'
import '../utils/variables.css'
import '../utils/extra.css'
import config from '@/config'
import Providers from '@/components/providers'
import fonts from '../utils/font'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import Head from 'next/head'

export const metadata: Metadata = {
  metadataBase: new URL(config.site_url),
  title: {
    default: config.blog_name,
    template: `%s | ${config.blog_name}`,
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
      <Head>
        <GoogleAnalytics />
        <link rel="icon" href={config.logo} />
      </Head>
      <body className={'bg-background text-on-background'}
        style={{ fontFamily }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
