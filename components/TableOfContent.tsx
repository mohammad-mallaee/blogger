'use client'
import Link from "next/link"
import { useEffect, useState } from 'react';

export default function TableOfContent({ show, data }: { show: boolean, data: any }) {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const highlightY = 2 * window.outerHeight / 3
        const handleScroll = () => {
            let currentId = '';
            data.forEach((heading: any) => {
                const element = document.getElementById(heading.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.y < highlightY) {
                        currentId = heading.id;
                    }
                }
            });

            if (currentId !== "")
                setActiveId(currentId);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            setActiveId('');
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data]);

    return <div className="top-12 pb-12 px-4 self-start sticky max-h-screen overflow-scroll no-scrollbar w-full max-w-[260px] hidden xl:block text-on-background-muted font-normal">
        {show && data && data.length > 0 &&
            <>
                <div className="text-on-background mb-2">Table Of Contents</div>
                <div className="flex flex-col gap-1">
                    {data.map((heading: any) => {
                        return <Link href={`#${heading.id}`} className={activeId === heading.id ? 'text-primary' : ''}
                            key={heading.id} style={{ marginLeft: (heading.m - 1) * 16 }}>
                            {heading.text}
                        </Link>
                    })}
                </div>
            </>
        }
    </div>
}