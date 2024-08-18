import { Config } from "./app/utils/types"
const config: Config = {
    blog_name: 'Blogger',
    description: 'Your favorite blog template',
    author: { name: 'Mohammad Mallaee', url: 'https://github.com/mohammad-mallaee' },
    theme: 'auto',
    logo: "/logo.png",
    header: {
        nav_links: [
            {
                name: 'About',
                href: '/about'
            }
        ],
        blog_name: true,
        logo: false,
        theme_toggle: false,
    },
    lang: 'en',
    direction: 'ltr',
    content_entry: "./public",
    posts_list: {
        size: "default",
        pagination: false,
        posts_per_page: "all",
        path: "",
        recursive: true
    },
    // These are default values for metadata base. If you have your domain,
    // you can either set it in environment variables or set it here.
    // These will be used for open graph images (sharing preview).
    metadata_base: process.env.DOMAIN || `https://${process.env.VERCEL_URL}` || `http://localhost:${process.env.PORT || 3000}`
}

export default config