'use client'
import { ReactNode, useEffect, useState } from 'react'
import config from '@/config.blog'

const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const themeConfig = config.theme
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    if (themeConfig === 'auto') {
      setTheme(getOsTheme())
    } else {
      setTheme(themeConfig)
    }
  }, [themeConfig])

  const getOsTheme = () => {
    const media = '(prefers-color-scheme: dark)'
    if (window.matchMedia(media).matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }


  return (
    <div id="theme-provider"
      className='flex flex-col items-center gap-3 sm:gap-6 bg-[--background] text-[--on-background]'
      data-theme={theme}>
      {children}
    </div>
  )
}

export default ThemeProvider
