'use client'
import { ReactNode, useState } from 'react'
import config from '@/config.blog'
import Header from './Header'

const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const themeConfig = config.theme
  const [theme, setTheme] = useState(themeConfig)

  const getTheme = (theme: string) => {
    if (theme === 'auto') {
      return getOsTheme()
    } else {
      return theme
    }
  }

  const getOsTheme = () => {
    const media = '(prefers-color-scheme: dark)'
    if (window.matchMedia(media).matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  return (
    <body id="theme-provider"
      className='flex flex-col items-center bg-[--background] text-[--on-background]'
      data-theme={getTheme(theme)}>
      <Header theme={theme} setTheme={setTheme} />
      {children}
    </body>
  )
}

export default ThemeProvider
