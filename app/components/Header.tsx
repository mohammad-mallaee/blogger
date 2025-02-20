'use client'
import path from "path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "@/config";
import ThemeIcon from "./ThemeIcon";
import { useTheme } from "next-themes";
import { Menu } from "lucide-react";
import { useContext } from "react";
import SidebarContext from "./providers/sidebar";

export default function Header({ sidebar }: { sidebar: boolean }) {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const context = useContext(SidebarContext)
    return <div className={`flex flex-wrap gap-4 sm:flex-row w-full justify-between sm:items-center px-4 md:px-0 pt-3 md:pt-5 pb-2 max-w-post`}
        style={{ direction: config.direction }}>
        {sidebar &&
            <button onClick={context.toggle} className="xl:hidden">
                <Menu />
            </button>
        }
        <Link className={["text-name-sm sm:text-name flex font-bold items-center gap-2 md:gap-3", pathname === '/' ? "" : "text-on-background-muted"].join(" ")}
            href={'/'}>
            {config.header.logo && <img className="w-logo h-logo sm:w-logo sm:h-logo" src={config.logo} alt="logo" />}
            {config.header.blog_name && config.blog_name}
        </Link>
        <div className="flex gap-2 sm:gap-4 justify-end text-[24px] items-center grow">
            {config.header.nav_links && config.header.nav_links.length > 0 && config.header.nav_links.map((link: { href: string, name: string }) => {
                const isHere = path.relative(pathname, link.href) === ''
                return <Link key={link.href}
                    className={["px-2 py-1 text-label block border-on-background",
                        isHere ? "text-primary font-normal" : "text-on-background-muted"].join(' ')}
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