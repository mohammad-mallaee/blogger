'use client'
import path from "path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "@/config.blog";

export default function Header({ theme, setTheme }: { theme: string, setTheme: (theme: string) => void }) {
    const pathname = usePathname()
    return <div className={`flex flex-col-reverse sm:flex-row w-full justify-between sm:items-center px-3 sm:px-0 py-6 max-w-[720px]`}
        style={{ direction: config.direction }}>
        <Link className={["text-3xl flex font-bold items-center gap-2", pathname === '/' ? "" : "text-[--on-background-variant]"].join(" ")}
            href={'/'}>
            {config.header.logo && <img className="size-11" src={config.logo} alt="logo" />}
            {config.header.blog_name && config.blog_name}
        </Link>
        <div className="flex gap-2 sm:gap-4 justify-end text-[24px]">
            {config.header.nav_links && config.header.nav_links.length > 0 && config.header.nav_links.map((link: { href: string, name: string }) => {
                const isHere = path.relative(pathname, link.href) === ''
                return <Link key={link.href}
                    className={["px-2 py-1 text-[16px] block font-light text-[--on-background-variant] border-[--on-background]",
                        isHere ? "text-[--on-background] border-b-2 border-dashed" : ""].join(' ')}
                    href={link.href}>{link.name}
                </Link>
            })}
            <button className="text-sm border rounded px-3" onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }}>{theme}</button>
        </div>
    </div>
}