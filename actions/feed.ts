import config from '@/config'
import { Feed } from 'feed'
import { basename, join } from 'path'
import { getLatestPosts } from './posts'

const feedOptions = {
    title: config.blog_name,
    description: config.description,
    id: config.site_url,
    link: config.site_url,
    language: config.lang,
    image: new URL(config.logo, config.site_url).href,
    favicon: config.lang,
    copyright: "All rights reserved",
    feedLinks: {
        atom: new URL("atom.xml", config.site_url).href,
        rss: new URL("rss.xml", config.site_url).href
    },
    author: typeof config.author === 'string' ? { name: config.author } : config.author
}

export async function generateFeed() {
    const feed = new Feed(feedOptions)
    let posts = await getLatestPosts({ recursive: true, self: true })
    posts = posts.slice(0, 20)
    for (const post of posts) {
        feed.addItem({
            title: post.title || basename(post.slug),
            id: post.slug,
            link: new URL(post.slug, config.site_url).href,
            description: post.spoiler || "",
            date: post.date ? new Date(post.date) : new Date(),
            image: post.image ? new URL(post.image, config.site_url).href : undefined,
        })
    }
    return feed
}

generateFeed()