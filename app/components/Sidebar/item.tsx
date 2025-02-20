'use client'
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarData, UnpackArrayType } from "@/app/types";

export default function Main({ data }: { data: SidebarData }) {
    return <div className="flex flex-col gap-2 text-body font-medium text-on-background-muted">
        {data.map((item: UnpackArrayType<SidebarData>) => {
            return <SidebarItem key={item.name} item={item} />
        })}
    </div>
}

function SidebarItem({ item }: { item: UnpackArrayType<SidebarData> }) {
    const pathname = usePathname()
    const [open, setOpen] = useState(pathname.startsWith(item.url))
    const toggleOpen = () => {
        setOpen(!open)
    }
    return <>
        <SidebarMainItem item={item} open={open} toggleOpen={toggleOpen} />
        {open && item.children &&
            <div className="ml-4 -mt-1 mb-2 border-l py-1 px-2 gap-1 border-outline text-label flex flex-col text-on-background-muted">
                {item.children.map((item) => {
                    return <SidebarSubItem key={item.name} item={item} />
                })}
            </div>
        }
    </>
}

function SidebarSubItem({ item }: { item: UnpackArrayType<SidebarData> }) {
    const pathname = usePathname()
    const [open, setOpen] = useState(pathname.startsWith(item.url))
    return <>
        <div className={clsx("w-full py-[0.35rem] px-3 rounded",
            pathname === item.url && "bg-surface text-primary cursor-default")}>
            <div className="flex justify-between items-center">
                <Link href={item.url} className="grow">{item.name}</Link>
                {item.children &&
                    <button className="border-l pl-3 border-outline cursor-pointer" onClick={() => setOpen(!open)}>
                        {open
                            ? <ChevronDown width={20} height={20} />
                            : <ChevronRight width={20} height={20} />
                        }
                    </button>
                }
            </div>
        </div>
        {open && item.children &&
            <div className="text-label pl-2">
                {item.children.map((item) => {
                    return <SidebarSubItem key={item.name} item={item} />
                })}
            </div>
        }
    </>
}

function SidebarMainItem({ item, open, toggleOpen }:
    { item: UnpackArrayType<SidebarData>, open: boolean, toggleOpen: () => void }) {
    const pathname = usePathname()
    return <div className={clsx("w-[280px] py-2 px-4 rounded",
        pathname === item.url && "bg-surface text-primary cursor-default")}>
        <div className="flex justify-between items-center">
            <Link href={item.url} className="grow">{item.name}</Link>
            {item.children &&
                <button className="border-l pl-3 border-outline cursor-pointer" onClick={toggleOpen}>
                    {open
                        ? <ChevronDown width={20} height={20} />
                        : <ChevronRight width={20} height={20} />
                    }
                </button>
            }
        </div>
    </div>
}