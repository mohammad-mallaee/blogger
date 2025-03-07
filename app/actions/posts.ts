import { readFile } from "fs/promises";
import matter from "gray-matter";
import config from '../../config'
import { join, dirname } from "path"
import { PostData } from "../types"
import { getEntries } from "./explorer";
import { z } from "zod";

const authorSchema = z.union([
    z.string(),
    z.object({
        name: z.string(),
        email: z.string().email().optional(),
        link: z.string().url().optional(),
    }),
]);

const frontmatterSchema = z.object({
    title: z.string({ message: "invalid title" }),
    spoiler: z.coerce.string().optional(),
    keywords: z.coerce.string().optional(),
    date: z.date().optional(),
    image: z.string({ message: "invalide img url" }).optional(),
    author: authorSchema.optional(),
    authors: z.array(authorSchema).optional(),
    language: z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/, "invalid language code").optional(),
    dir: z.enum(["ltr", "rtl"], { message: "invalid document direction" }).optional(),
}).refine((data) => !(data.author && data.authors), {
    message: "both author and authors cannot be used",
    path: ["author", "authors"],
});

function readPostData(path: string, slug: string, log: boolean = false) {
    return new Promise<PostData>((resolve, reject) => {
        readFile(path, 'utf-8').then(fileData => {
            const { data }: { data: any } = matter(fileData)
            const result = frontmatterSchema.safeParse(data)
            if (!result.success) {
                if (log)
                    console.error(`>> Error in ${path}: ${result.error.errors.map(e => e.message).join(" - ")}`)
                reject(result.error)
                return
            }
            resolve({
                slug: slug,
                ...data
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function getAllPosts({ recursive = false, path = "", self = false, log = false }) {
    const entries = await getEntries({ recursive, path, self })
    if (log)
        console.log()
    const fileContentsResult = await Promise.all(
        entries.map(async (entry) => {
            return readPostData(entry.path, entry.slug, log).catch(e => e)
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

export async function getPost(slug: string, fetchComponents = true): Promise<{ content: string, data: PostData, components: any }> {
    const markdown_index_path = join(config.content_entry, slug, 'index.md')
    const markdown_file_path = join(config.content_entry, slug + '.md')
    let isIndex = true
    const fileData = await readFile(markdown_index_path)
        .catch(async (e) => {
            isIndex = false
            return await readFile(markdown_file_path)
        })
    const { content, data }: { content: string, data: any } = matter(fileData)

    if (!fetchComponents)
        return { content, data, components: {} }

    const componentsPath = isIndex ? join(slug, "components") : join(dirname(slug), "components")
    let components = {}
    try {
        components = await import(`../../public/${componentsPath}.js`)
    } catch (e: any) {
        if (!e || e.code !== "MODULE_NOT_FOUND") {
            throw e
        }
    }
    if (!data)
        throw Error("The file is empty")
    return { content, data, components }
}