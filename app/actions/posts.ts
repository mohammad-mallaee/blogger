import { readFile } from "fs/promises";
import matter from "gray-matter";
import config from '../../config.blog'
import { join } from "path"
import { PostData } from "../utils/types"
import { getEntries } from "./explorer";
import { getMdPostState } from "./mdProperties";

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

export async function getAllPosts({ recursive = false, path = "", self = false }) {
    const entries = await getEntries({ recursive, path, self })
    const fileContentsResult = await Promise.all(
        entries.map(async (entry) => {
            return readMarkdownFile(entry.path, entry.slug).catch(e => e)
        })
    )
    return fileContentsResult.filter(result => !(result instanceof Error) && getMdPostState(result) !== 'draft')
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