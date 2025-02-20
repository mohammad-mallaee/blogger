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
    metadata_base: string,
    global_sidebar: boolean
}

export type SidebarData = {
    name: string,
    url: string,
    children?: SidebarData
}[]

export type UnpackArrayType<T> = T extends (infer R)[] ? R : T;