import { readFile } from "fs/promises";
import matter from "gray-matter";
import config from '../../config.blog'
import { join } from "path"
import { PostData } from "../utils/types"
import { getEntries } from "./explorer";

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

export async function getAllPosts(path: string | undefined = undefined) {
    const entries = await getEntries(true, path)
    const fileContentsResult = await Promise.all(
        entries.map((entry) => {
            return readMarkdownFile(entry.path, entry.slug).catch(e => e)
        })
    )
    return fileContentsResult.filter(result => !(result instanceof Error))
}

export async function getLatestPosts(path: string | undefined = undefined) {
    const posts: PostData[] = await getAllPosts(path)
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
}import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import config from '../../config.blog'
import path from "path"
import { PostData } from "../utils/types"

function readMarkdownFile(path: string, slug: string) {
    return new Promise<PostData>((resolve, reject) => {
        readFile(path, 'utf-8').then(fileData => {
            const { data }: { data: any } = matter(fileData)
            if (!data.title || !data.date)
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

export async function getAllPosts() {
    const entries = await readdir(config.posts_dir, { withFileTypes: true });
    const fileContentsResult = await Promise.all(
        entries.map((entry) => {
            if (entry.isDirectory())
                return readMarkdownFile(path.join(entry.path, entry.name, 'index.md'), entry.name).catch(e => e)
            if (entry.name.endsWith('.md'))
                return readMarkdownFile(path.join(entry.path, entry.name),
                    entry.name.slice(0, -3)).catch(e => e)
            return Error("Not a markdown Entry!")
        })
    )
    return fileContentsResult.filter(result => !(result instanceof Error))
}

export async function getLatestPosts() {
    const posts: PostData[] = await getAllPosts()
    posts.sort((a: PostData, b: PostData) => {
        if (a.date && b.date)
            return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
        else return 0
    });
    return posts
}

export async function getPost(slug: string): Promise<{ content: string, data: PostData }> {
    const markdown_index_path = path.join(config.posts_dir, slug, 'index.md')
    const markdown_file_path = path.join(config.posts_dir, slug + '.md')
    const fileData = await readFile(markdown_index_path)
        .catch(async () => await readFile(markdown_file_path))
    const { content, data }: { content: string, data: any } = matter(fileData)
    if (!data || !data.title)
        throw Error("The file is empty or doesn't have proper headings")
    return { content, data }
}