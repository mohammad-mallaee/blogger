---
title: Welcome to your new home
image: /pink-sky.webp
---
Imagine having a space where your thoughts, stories, and ideas flow effortlessly into the world where you can share what matters to you. With many features that blogger provides, you just write the Markdown and blogger will do the rest for you.

As you read this post and think to yourself, "Oh, I'm going to write some cool articles and show them to the world," many things are happening in the world of which you are a part.
Some of them change your life a bit, and some of them turn your whole story in another direction. And here you are, on your way to creating a new blog, who knows what it will turn into?

## Getting Started
*Grab a snack and settle in for a bit as we continue your blogging journey!*

Blogger is a template that lets you create your own blog.
You have complete creative control over its design and function.
If your main focus is writing, however, you can simply create a directory for your blog with a subdirectory called "content" to hold your blog posts.
For now, here's a basic directory structure (with "index.md" as your first blog entry):
```
-- myblog
	-- content
		-- index.md
```
Open "index.md" and start writing! Here's an example:
```
# Hello World
here begins the hourney or so-called `hello world`.
```

Congratulation! You created your first post. Now it's time to configure your blog.

Create a `config.blog.js` in your `settings` directory and fill it with your information:
```js {2,3}
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
```
For now, change the highlighted properties only. Leave the others as they are.

You will have something like this:
```
-- myblog
	-- content
		-- index.md
    -- settings
        -- config.blog.json
```

### Deployment
You can deploy your blog wherever you choose, but make sure these settings are configured correctly:

- **Install command:**
```bash
npx -y degit --force mohammad-mallaee/blogger && node merge.js && npm install
```

- **Build command:**
```bash
next build
```

- **Output directory:**
```bash
out
```

Here are Vercel settings for example :

![Vercel settings](/vercel-settings.png)

<span className="font-medium text-green-600 dark:text-green-400 text-xl">Congrats!</span> 🎉 

Now you have your own blog.
Happy writing :)