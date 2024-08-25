import config from "@/config.blog"
import { Dirent } from "fs"
import fs from "fs/promises"
import { join, normalize, sep } from "path"

class Entry {
    path = ""
    slug = ""
    constructor(path: string, slug: string) {
        this.path = path
        this.slug = slug
    }
}

function filterEntry(e: Dirent, path: string, self: boolean) {
    if (!e.name.endsWith(".md"))
        return false
    if (!self && e.name === "index.md" && e.path == path)
        return false
    return true
}

export async function getEntries({ recursive = false, path = "", self = false }) {
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
                    slug = join(sep, slug, entry.name.replace(".md", ""))
                return new Entry(join(entry.path, entry.name), slug)
            })
    }
}