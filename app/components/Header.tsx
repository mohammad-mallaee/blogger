'use client'
import path from "path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "@/config";
import ThemeIcon from "./ThemeIcon";
import { useTheme } from "next-themes";

export default function Header() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    return <div className={`flex flex-wrap gap-4 sm:flex-row w-full justify-between sm:items-center px-4 md:px-0 pt-5 md:pt-8 pb-6 max-w-[740px]`}
        style={{ direction: config.direction }}>
        <Link className={["text-2xl sm:text-3xl flex font-bold items-center gap-2 md:gap-3", pathname === '/' ? "" : "text-on-background-variant"].join(" ")}
            href={'/'}>
            {config.header.logo && <img className="size-8 sm:size-11" src={config.logo} alt="logo" />}
            {config.header.blog_name && config.blog_name}
        </Link>
        <div className="flex gap-2 sm:gap-4 justify-end text-[24px] items-center grow">
            {config.header.nav_links && config.header.nav_links.length > 0 && config.header.nav_links.map((link: { href: string, name: string }) => {
                const isHere = path.relative(pathname, link.href) === ''
                return <Link key={link.href}
                    className={["px-2 py-1 text-[16px] block font-light border-on-background",
                        isHere ? "text-on-background border-b-2 border-dashed" : "text-on-background-variant"].join(' ')}
                    href={link.href}>{link.name}
                </Link>
            })}
            {
                config.header.theme_toggle &&
                <button className="cursor-pointer outline-none" onClick={() => {
                    setTheme(theme === "system" ? "dark" : theme === "dark" ? "light" : "system")
                }}>
                    <ThemeIcon theme={theme} />
                </button>
            }
        </div>
    </div>
}