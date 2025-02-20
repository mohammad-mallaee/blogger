import { getAllPosts } from "./posts";
import config from "@/config.blog";

export async function getPagesWithSidebar() {
    const entries = await getAllPosts({ recursive: true, path: "/", self: true })
    const result = entries.reduce((acc, curr) => {
        if (curr?.sidebar === true)
            return [...acc, curr.slug]
        else
            return acc
    }, [])
    return result
}

export async function getSidebarData(slug = "/"): Promise<any> {
    const entries = await getAllPosts({ recursive: false, path: slug, self: false })
    if (entries.length === 0)
        return null
    const result = []
    for (const entry of entries) {
        const data = await getSidebarData(entry.slug)
        result.push({
            url: entry.slug,
            name: entry.title,
            children: data,
            order: entry.sidebar_order
        })
    }
    result.sort((a, b) => {
        return a.order - b.order
    })
    return result
}

export async function hasSidebar(slug: string) {
    if (config.global_sidebar)
        return "/"
    const pages: string[] = await getPagesWithSidebar()
    return pages.find(page => slug.startsWith(page))
}

