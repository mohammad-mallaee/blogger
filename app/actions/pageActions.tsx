import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import config from '../../config.blog'
import path from "path"
import { PostData } from "../utils/types"



function readMarkdownFile(path: string, slug: string) {
    return new Promise<PostData>((resolve, reject) => {
        readFile(path, 'utf-8').then(fileData => {
            const { data }: { data: any } = matter(fileData)
            resolve({
                page: slug,
                ...data
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function getAllPages() {
    const entries = await readdir(config.pages_dir, { withFileTypes: true });
    const fileContentsResult = await Promise.all(
        entries.map((entry) => {
            if (entry.isDirectory())
                return readMarkdownFile(path.join(entry.path, entry.name, 'index.md'), entry.name).catch(e => e)
            if (entry.name.endsWith('.md'))
                return readMarkdownFile(path.join(entry.path, entry.name),
                    entry.name.slice(0, entry.name.length - 3)).catch(e => e)
            return Error("Not a markdown Entry!")
        })
    )
    return fileContentsResult.filter(result => !(result instanceof Error))
}

export async function getPage(slug: string): Promise<{ content: string, data: PostData }> {
    const markdown_index_path = path.join(config.pages_dir, slug, 'index.md')
    const markdown_file_path = path.join(config.pages_dir, slug + '.md')
    const fileData = await readFile(markdown_index_path)
        .catch(async () => await readFile(markdown_file_path))
    const { content, data }: { content: string, data: any } = matter(fileData)
    if (!content || !data)
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
            resolve({
                page: slug,
                ...data
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function getAllPages() {
    const entries = await readdir(config.pages_dir, { withFileTypes: true });
    const fileContentsResult = await Promise.all(
        entries.map((entry) => {
            if (entry.isDirectory())
                return readMarkdownFile(path.join(entry.path, entry.name, 'index.md'), entry.name).catch(e => e)
            if (entry.name.endsWith('.md'))
                return readMarkdownFile(path.join(entry.path, entry.name),
                    entry.name.slice(0, entry.name.length - 3)).catch(e => e)
            return Error("Not a markdown Entry!")
        })
    )
    return fileContentsResult.filter(result => !(result instanceof Error))
}

export async function getPage(slug: string): Promise<{ content: string, data: PostData }> {
    const markdown_index_path = path.join(config.pages_dir, slug, 'index.md')
    const markdown_file_path = path.join(config.pages_dir, slug + '.md')
    const fileData = await readFile(markdown_index_path)
        .catch(async () => await readFile(markdown_file_path))
    const { content, data }: { content: string, data: any } = matter(fileData)
    if (!content || !data)
        throw Error("The file is empty or doesn't have proper headings")
    return { content, data }
}