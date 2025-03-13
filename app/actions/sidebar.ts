import { getAllPosts, readPostData } from "./posts";
import config from "@/config.blog";
import { Dirent } from "fs";
import fs from 'fs/promises'
import { join, normalize, sep } from "path";

export async function getPagesWithSidebar() {
    const entries = await getAllPosts({ recursive: true, path: "/", self: true })
    const result = entries.reduce((acc, curr) => {
        if (curr.sidebar === true) {
            return [...acc, curr.slug]
        }
        return acc
    }, [] as string[])
    return result
}

function getSlug(entry: Dirent) {
    let slug = entry.parentPath.replace(normalize(config.content_entry), "")
    if (entry.name !== "index.md")
        slug = join(sep, slug, entry.name.replace(".md", ""))
    return slug
}

export async function getSidebarData(slug: string): Promise<any> {
    const path = join(config.content_entry, slug)
    const entries = await fs.readdir(path, { withFileTypes: true })
    const files = entries.filter(entry => entry.isFile() && entry.name.endsWith(".md"))
    const dirs = entries.filter(entry => entry.isDirectory())
    const index = await readPostData(join(config.content_entry, slug, "index.md"), slug).catch(() => null)
    if (files.length === 0 && dirs.length === 0 && !index)
        return null
    const result = []
    for (const file of files) {
        if (file.name === "index.md")
            continue
        const s = getSlug(file)
        const data = await readPostData(join(config.content_entry, slug, file.name), s)
        result.push({
            slug: s,
            url: s,
            order: data.sidebar_order || Infinity,
            name: data.title || file.name.replace(".md", ""),
            children: null,
        })
    }
    for (const dir of dirs) {
        const children = await getSidebarData(join(slug, dir.name))
        const data = await readPostData(join(config.content_entry, slug, dir.name, "index.md"), join(slug, dir.name))
            .catch(() => null)
        if (children && children.length !== 0 || data)
            result.push({
                slug: join(slug, dir.name),
                url: data ? join(slug, dir.name) : null,
                order: data ? data.sidebar_order || Infinity : Infinity,
                name: data ? data.title || dir.name : dir.name,
                children: children
            })
    }
    result.sort((a, b) => {
        return a.order - b.order
    })
    return result.length === 0 ? null : result
}

export async function hasSidebar(slug: string) {
    if (config.global_sidebar)
        return "/"
    const pages: string[] = await getPagesWithSidebar()
    return pages.find(page => slug.startsWith(page))
}