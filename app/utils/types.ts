export type PostSize = "default" | "minimal" | "compact"
export type PostState = "draft" | "public" | "private"

export type PostList = {
    size?: PostSize,
    pagination?: boolean,
    posts_per_page?: number | "all",
    recursive?: boolean
    path?: string,
    header?: boolean
}

export type PostData = {
    title: string,
    show_title?: boolean,
    slug: string,
    date?: string,
    dir?: Direction,
    lang?: string,
    author?: Author,
    authors?: Author[],
    image?: string,
    spoiler?: string,
    keywords?: string,
    tags?: string
    posts_list?: boolean | PostList
    state?: PostState,
}

export enum Theme {
    light = 'light',
    dark = 'dark',
    system = 'system'
}

export type Author = string | {
    name: string,
    url?: string
}

export type Direction = 'ltr' | 'rtl'

export type NavLink = {
    name: string,
    href: string
}

export type Config = {
    blog_name: string,
    description: string,
    author?: string | Author,
    authors?: Author[],
    theme: 'light' | 'dark' | 'system',
    direction: Direction,
    logo: string,
    header: {
        logo: boolean,
        blog_name: boolean,
        theme_toggle: boolean,
        nav_links?: NavLink[]
    },
    content_entry: string,
    lang: string,
    posts_list: PostList
    metadata_base: string,
    auth: {
        enable: boolean,
        provideres: {
            github: boolean,
        }
    }
}