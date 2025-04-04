export type Direction = 'ltr' | 'rtl'

export type PostData = {
    title: string,
    slug: string,
    date?: string,
    dir?: Direction,
    lang?: string,
    author?: Author,
    authors?: Author[],
    image?: string,
    spoiler?: string,
    keywords?: string,
    sidebar?: boolean,
    sidebar_order?: number,
    table_of_contents?: boolean
}

export enum Theme {
    light = 'light',
    dark = 'dark',
    system = 'system'
}

export type Author = string | {
    name: string,
    email?: string,
    link?: string
}

export type NavLink = {
    name: string,
    href: string
}

export type Config = {
    blog_name: string,
    description: string,
    author?: Author,
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
    site_url: string,
    global_sidebar: boolean,
    table_of_contents: boolean
}

export type SidebarData = {
    slug: string,
    name: string,
    url: string,
    children?: SidebarData[]
}