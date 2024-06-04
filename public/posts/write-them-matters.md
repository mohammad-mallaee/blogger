---
title: Let your ink flow freely
date: 2024-02-19
spoiler: how to write and publish your post
---

In this post I will show you that how can you write and use the features that this template provides.

First let's talk about configuring the blog. If you open the `config.blog.ts` you will see all the configuration :

```ts showLineNumbers
import { Config } from "./app/utils/types";
const config: Config = {
  blog_name: "Blogger",
  description: "Your favorite blog template",
  author: {
    name: "Mohammad Mallaee",
    url: "https://github.com/mohammad-mallaee",
  },
  theme: "auto",
  navLinks: [
    {
      name: "About",
      href: "/pages/about",
    },
  ],
  lang: "en",
  direction: "ltr",
  posts_dir: "./public/posts",
  pages_dir: "./public/pages",
  // These are default values for metadata base. If you have your domain,
  // you can either set it in environment variables or set it here.
  // These will be used for open graph images (sharing preview).
  metadata_base:
    process.env.DOMAIN ||
    `https://${process.env.VERCEL_URL}` ||
    `http://localhost:${process.env.PORT || 3000}`,
};

export default config;
```

You've used first three settings in the last post ([getting started](/posts/getting-started)), so I'll explain other settings.

**Theme:** This setting controls the overall visual style of your blog and accepts three options: `auto`, `dark`, or `light`.

**navLinks:** This array defines the links displayed in the navigation bar. You can modify this array to add or remove links as desired.

**lang:** Currently used for displaying dates in the preferred language. Future updates will expand this functionality.

**direction:** This setting influences the direction of post cards and post bodies, independent of the overall blog layout. You can override this direction within individual posts.

**posts_dir and pages_dir:** These settings specify the directory locations for your blog posts and pages, respectively. It's recommended to leave them unchanged unless you have a specific reason to modify them.

**metadata_base:** This setting determines the base URL used for sharing preview images and files. It's recommended to update this value with your domain (e.g., https://demo-blog.netlify.app) unless you're deploying on Vercel.

Now that you configured your blog it's time to start writing (the fun part).

## Markdown editing

If you're new to markdown, I recommend this brief crash course: [Markdown Crash Course](https://blog.webdevsimplified.com/2023-06/markdown-crash-course/)

**Blogger** utilizes "front matter" for post metadata, with the only mandatory field being the title. Your markdown files will typically resemble this structure:

```
---
title: Your post title here
data: year-month-day (2024-02-19)
key: value
---

Your content here
```

Within this front matter, you can override settings like `lang`, `direction (dir)`, and `author`. Additionally, you can include other metadata fields like `image` and more. Refer to `app/utils/types.ts` in the post data section for a complete list of available post metadata.

You can write html in your markdown files too, they will compile without additional configuration.

```html
<p className="text-orange-500">I'm an html tag</p>
```
<p className="text-orange-500">I'm an html tag</p>

You may have noticed that I used tailwind to style the element :)

## Writing Codes

Markdown allows for code inclusion, and Blogger utilizes "rehype pretty code" for enhanced features like line/word highlighting and line numbers. Explore the [Rehype Pretty Code Website](https://rehype-pretty-code.netlify.app/#meta-strings) for detailed information on these features.
