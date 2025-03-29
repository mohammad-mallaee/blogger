const config = {
    blog_name: 'Blogger',
    description: 'Your favorite blog template',
    theme: 'system',
    logo: "/logo.png",
    author: "Mohammad Mallaee",
    header: {
        nav_links: [],
        blog_name: true,
        logo: false,
        theme_toggle: true,
    },
    lang: 'en',
    direction: 'ltr',
    content_entry: "./public",
    global_sidebar: false,
    table_of_contents: true,
    // These are default values for metadata base. If you have your domain,
    // you can either set it in environment variables or set it here.
    // These will be used for open graph images (sharing preview).
    site_url: process.env.SITE_URL || "https://example.com"
}

module.exports = config;