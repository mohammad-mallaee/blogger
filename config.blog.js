const config = {
    blog_name: 'Blogger',
    description: 'Your favorite blog template',
    theme: 'system',
    logo: "/logo.png",
    header: {
        nav_links: [],
        blog_name: true,
        logo: false,
        theme_toggle: true,
    },
    lang: 'en',
    direction: 'ltr',
    content_entry: "./public",
    // These are default values for metadata base. If you have your domain,
    // you can either set it in environment variables or set it here.
    // These will be used for open graph images (sharing preview).
    metadata_base: process.env.DOMAIN || `https://${process.env.VERCEL_URL}` || `http://localhost:${process.env.PORT || 3000}`
}

module.exports =  config;