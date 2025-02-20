'use client'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { SidebarProvider } from './sidebar'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme='system' attribute='class' enableSystem>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default Providers
