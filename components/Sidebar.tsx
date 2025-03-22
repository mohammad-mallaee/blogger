'use client'
import { Direction, SidebarData } from "@/types";
import { useContext, useState } from "react";
import SidebarContext from "./providers/sidebar";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar({ data, direction = "ltr" }: { data: SidebarData[], direction?: Direction }) {
    const context = useContext(SidebarContext)
    return <>
        <div className='top-8 pb-12 self-start sticky max-h-screen overflow-scroll no-scrollbar w-full max-w-[260px] hidden xl:block'>
            <Main data={data} direction={direction} />
        </div>
        <div className={clsx("fixed top-0 lef-0 transition-opacity duration-300",
            context.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                onClick={() => context.close()}></div>
            <div className={clsx(
                context.isOpen ? 'translate-x-0' : direction === "rtl" ? 'translate-x-full' : "-translate-x-full",
                direction === "rtl" ? 'right-0' : 'left-0',
                "fixed top-0 z-10 h-screen max-h-screen overflow-scroll no-scrollbar w-full max-w-[320px] xl:hidden bg-background px-4 pb-8 pt-4 transform transition-transform duration-300"
            )}>
                <button className="block ml-auto mb-6 text-on-background-muted" onClick={() => context.close()}>
                    <X />
                </button>
                <Main data={data} direction={direction} />
            </div>
        </div>
    </>
}

function Main({ data, direction = "ltr" }: { data: SidebarData[], direction?: Direction }) {
    return <div className="flex flex-col gap-1 text-label font-medium text-on-background-muted">
        {data.map((item: SidebarData) => {
            return <SidebarItem key={item.name + item.url + item.slug} item={item} direction={direction}
                render={(children) => {
                    return <div className={clsx(
                        "-mt-1 mb-2 py-1 px-2 gap-1 border-outline flex flex-col text-on-background-muted",
                        direction === "ltr" ? "border-l ml-4" : "border-r mr-4"
                    )}>
                        {children}
                    </div>
                }} />
        })}
    </div>
}

function SidebarItem({ item, direction = "ltr", render }:
    { item: SidebarData, direction?: Direction, render: (children: React.ReactNode) => React.ReactNode }) {
    const pathname = decodeURIComponent(usePathname())
    const [open, setOpen] = useState(pathname.startsWith(item.slug))
    return <>
        <div className={clsx("w-full py-2 px-4 rounded",
            pathname === item.url + "/" && "bg-sidebar-active text-primary cursor-default")}>
            <div className="flex justify-between items-center">
                {item.url ?
                    <Link href={item.url || ""} className="grow">{item.name}</Link>
                    : <span className="grow cursor-pointer" onClick={() => setOpen(prev => !prev)}>{item.name}</span>
                }
                {item.children &&
                    <button
                        className={clsx(
                            "border-outline cursor-pointer",
                            item.url && (direction === "ltr" ? "pl-3 border-l" : "pr-3 border-r")
                        )}
                        onClick={() => setOpen(prev => !prev)}>
                        {direction === "ltr" ?
                            <ChevronRight width={20} height={20}
                                className={clsx("transition-transform duration-300", open && "rotate-90")} />
                            : <ChevronLeft width={20} height={20}
                                className={clsx("transition-transform duration-300", open && "-rotate-90")} />
                        }
                    </button>
                }
            </div>
        </div>
        {open && item.children &&
            render(item.children.map((item) => {
                return <SidebarItem key={item.name + item.url + item.slug} item={item} direction={direction}
                    render={(children) => {
                        return <div className="pl-2">
                            {children}
                        </div>
                    }} />
            }))
        }
    </>
}