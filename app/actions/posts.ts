import { readFile } from "fs/promises";
import matter from "gray-matter";
import config from '../../config.blog'
import { join, normalize } from "path"
import { PostData } from "../utils/types"
import fs from 'fs/promises'
import { Dirent } from "fs";

class Entry {
    path = ""
    slug = ""
    constructor(path: string, slug: string) {
        this.path = path
        this.slug = slug
    }
}


function readMarkdownFile(path: string, slug: string) {
    return new Promise<PostData>((resolve, reject) => {
        readFile(path, 'utf-8').then(fileData => {
            const { data }: { data: any } = matter(fileData)
            if (!data.title)
                reject(Error("This file doesn't have proper headings."))
            resolve({
                slug: slug,
                ...data
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

function filterEntry(e: Dirent, path: string, self: boolean) {
    if (!e.name.endsWith(".md"))
        return false
    if (!self && e.name === "index.md" && e.path == path)
        return false
    return true
}

async function getEntries({ recursive = false, path = "", self = false }) {
    path = join(config.content_entry, path)
    if (!recursive) {
        const entries = await fs.readdir(path, { withFileTypes: true }).catch(e => [])
        const files: Entry[] = []
        let slug = path.replace(normalize(config.content_entry), "")
        for (const entry of entries) {
            if (entry.name.endsWith(".md") && entry.name !== "index.md") {
                files.push(new Entry(join(path, entry.name), join(slug, entry.name.replace(".md", ""))))
            } else if (entry.isDirectory()) {
                try {
                    if ((await fs.stat(join(path, entry.name, "index.md"))).isFile())
                        files.push(new Entry(join(path, entry.name, "index.md"), join(slug, entry.name)))
                } catch { }
            }
        }
        return files
    } else {
        const entries = await fs.readdir(path, { withFileTypes: true, recursive: true }).catch(e => [])
        return entries
            .filter(entry => filterEntry(entry, path, self))
            .map((entry) => {
                let slug = entry.path.replace(normalize(config.content_entry), "")
                if (entry.name !== "index.md")
                    slug = join(slug, entry.name.replace(".md", ""))
                return new Entry(join(entry.path, entry.name), slug)
            })
    }
}

export async function getAllPosts({ recursive = false, path = "", self = false }) {
    const entries = await getEntries({ recursive, path, self })
    const fileContentsResult = await Promise.all(
        entries.map((entry) => {
            return readMarkdownFile(entry.path, entry.slug).catch(e => e)
        })
    )
    return fileContentsResult.filter(result => !(result instanceof Error))
}

export async function getLatestPosts({ recursive = false, path = "", self = false }) {
    const posts: PostData[] = await getAllPosts({ recursive, path, self })
    posts.sort((a: PostData, b: PostData) => {
        if (a.date && b.date)
            return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
        else return 0
    });
    return posts
}

export async function getPost(slug: string): Promise<{ content: string, data: PostData }> {
    const markdown_index_path = join(config.content_entry, slug, 'index.md')
    const markdown_file_path = join(config.content_entry, slug + '.md')
    const fileData = await readFile(markdown_index_path)
        .catch(async (e) => await readFile(markdown_file_path))
    const { content, data }: { content: string, data: any } = matter(fileData)
    if (!data || !data.title)
        throw Error("The file is empty or doesn't have proper headings")
    return { content, data }
}