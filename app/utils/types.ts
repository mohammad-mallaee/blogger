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
    posts_list: boolean | {
        size?: "default" | "minimal" | "compact",
        pagination?: boolean,
        posts_per_page?: number | "all",
        recursive?: boolean
        path?: string
    }
}

export enum Theme {
    light = 'light',
    dark = 'dark',
    auto = 'auto'
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
    theme: 'light' | 'dark' | 'auto',
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
    posts_list: {
        size: "default" | "minimal" | "compact",
        pagination: boolean,
        posts_per_page: number | "all",
        path: string,
        recursive: boolean
    }
    metadata_base: string,
}