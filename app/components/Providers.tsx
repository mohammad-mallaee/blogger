'use client'
import { ReactNode } from 'react'
import Header from './Header'
import { ThemeProvider } from 'next-themes'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme='system' attribute='class' enableSystem>
      <Header />
      {children}
    </ThemeProvider>
  )
}

export default Providers
