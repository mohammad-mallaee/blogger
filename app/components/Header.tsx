'use client'
import path from "path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "@/config.blog";

export default function Header() {
    const pathname = usePathname()
    return <div className={`flex flex-col-reverse sm:flex-row w-full justify-between sm:items-center px-3 sm:px-0 py-4 max-w-2xl`}>
        <Link className={["text-[52px]", pathname === '/' ? "" : "text-[--on-background-variant]"].join(" ")}
            style={{ fontFamily: 'Lobster Two' }} href={'/'}>
            {config.blog_name}
        </Link>
        <div className="flex gap-2 sm:gap-4 justify-end text-[24px]">
            {config.navLinks && config.navLinks.length > 0 && config.navLinks.map((link: { href: string, name: string }) => {
                const isHere = path.relative(pathname, link.href) === ''
                return <Link key={link.href}
                    className={["px-2 py-1 text-[17px] block font-light text-[--on-background-variant] border-[--on-background]",
                        isHere ? "text-[--on-background] border-b-2 border-dashed" : ""].join(' ')}
                    href={link.href}>{link.name}
                </Link>
            })}
        </div>
    </div>
}