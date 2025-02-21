'use client'
import { SidebarData } from "@/app/types";
import Main from "./item";
import { useContext } from "react";
import SidebarContext from "../providers/sidebar";
import { X } from "lucide-react";

export default function Sidebar({ data }: { data: SidebarData }) {
    const context = useContext(SidebarContext)
    return <>
        <div className='my-20 top-8 self-start sticky max-h-screen overflow-scroll no-scrollbar w-full max-w-[280px] hidden xl:block'>
            <Main data={data} />
        </div>
        <div className={`fixed top-0 lef-0 transition-opacity duration-300 ${context.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                onClick={() => context.close()}></div>
            <div className={`fixed top-0 left-0 z-10 h-screen max-h-screen overflow-scroll no-scrollbar w-full max-w-[320px] xl:hidden bg-background px-4 pb-8 pt-4 transform transition-transform duration-300 ${context.isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button className="block ml-auto mb-6 text-on-background-muted" onClick={() => context.close()}>
                    <X />
                </button>
                <Main data={data} />
            </div>
        </div>

    </>
}