import config from '@/config'
import { Feed } from 'feed'
import { join } from 'path'
import { getLatestPosts, getPost } from './posts'

const feedOptions = {
    title: `${config.blog_name} feed`,
    description: config.description,
    id: config.site_url,
    link: config.site_url,
    language: config.lang,
    image: config.logo,
    favicon: config.lang,
    copyright: "All rights reserved",
    feedLinks: {
        atom: join(config.site_url, "atom.xml"),
        rss: join(config.site_url, "rss.xml")
    },
    author: typeof config.author === 'string' ? { name: config.author } : config.author
}

export async function generateFeed() {
    const feed = new Feed(feedOptions)
    let posts = await getLatestPosts({ recursive: true, self: true })
    posts = posts.slice(0, 20)
    for (const post of posts) {
        const data = await getPost(post.slug, false)
        feed.addItem({
            title: post.title,
            id: post.slug,
            link: join(config.site_url, post.slug),
            description: post.spoiler || "",
            date: post.date ? new Date(post.date) : new Date(),
            image: post.image ? join(config.site_url, post.image) : undefined,
            content: data.content,
        })
    }
    return feed
}

generateFeed()