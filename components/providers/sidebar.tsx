import { createContext, useState } from "react";

const SidebarContext = createContext({
    isOpen: false,
    open: () => { },
    close: () => { },
    toggle: () => {}
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    const toggle = () => setIsOpen(!isOpen)
    return <SidebarContext.Provider value={{ isOpen, open, close, toggle }}>
        {children}
    </SidebarContext.Provider>
}

export default SidebarContext