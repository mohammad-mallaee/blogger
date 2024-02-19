export type PostData = {
    title: string,
    date?: string,
    dir?: Direction,
    lang?: string,
    author?: Author,
    authors?: Author[],
    image?: string,
    spoiler ?: string,
    keywords?: string,


    slug?: string,
    page?: string
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
    author?: string | Author,
    authors?: Author[],
    direction: Direction,
    posts_dir: string,
    pages_dir: string,
    lang: string,
    navLinks: NavLink[],
    metadata_base: string,
    description: string,
    theme: 'light' | 'dark' | 'auto'
}