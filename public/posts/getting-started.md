---
title: Getting Started - Create your own blog
date: 2024-02-19
author: { name: mohammad mallaee, url: https://github.com/mohammad-mallaee }
keywords: create blog, blog, get started
---

As you may have seen in the first post ( [Here begins the journey](/posts/hello-world) ) you have to take these steps to get started with this blog:

- Clone or Fork the repository
- Configure the blog with proper data
- Create your first article or post
- Deploy it wherever you want

But alternatively you can use deploy buttons below to deploy without hassle and get your blog up and running in no time and your steps will be:

- Deploy the blog
- Clone your own repoistory
- Configure the blog with proper data
- Create your first article or post

The good thing about the second approach is that your repository will be connected to a platform which will build and publish your blog automaticly with every commit but don't worry, you can do that in the first approach too.

I will explain both of them so you can start however you want.

## First approach

#### 1. Clone the repository

Open your command line or terminal and run:

```bash
git clone https://github.com/mohammad-mallaee/blogger.git
```

```bash
cd blogger
```

then run these commands to install the dependencies:

```bash
npm install
```

**Note: you have to have NodeJs installed on your computer.**

now that you have a copy of the template on your computer, open it on the text editor of your choice so we can proceed to the next step.

#### 2. Configure the blog

open the `config.blog.ts` and change these values:

```ts
const config: Config = {
    blog_name: 'NameOfYourBlog',
    description: 'Descriptoin of your blog',
    author: { name: 'Your Name', url: 'A link to your page or website' },
    ...
}
```

Not that you can write author like this too if you don't want to use the url:

```ts {4}
const config: Config = {
    blog_name: 'NameOfYourBlog',
    description: 'Descriptoin of your blog',
    author: 'Your Name',
    ...
}
```

Now go ahead and run the project to see if everything works as expected:

```bash
npm run dev
```

Your header will now update to reflect the name you used in `config.blog.ts`

#### 3. Create your first post

Open the `public` folder and within the `posts` directory create a markdown file named `my-first-post.md` (or anything you prefer). Write your first post content following the provided format:

```
---
title: My First Post
date: 2024-02-19
---

Hello World !!
```

Don't worry about the initial part for now; we'll discuss it later. Refresh the page, and you should see your post displayed on the homepage. Congratulations, you've created your first post!

Feel free to write as much as you like.

#### 4. Deployment

This step assumes you have some basic knowledge of GitHub. If not, consider a quick tutorial before proceeding.

1. Visit your GitHub page and create a new repository.
2. Push your project files to the newly created repository.
3. To publish your blog on platforms like Netlify or Vercel, create a new project and connect it with your GitHub repository.

**Note:** on Netlify you have to set `NETLIFY_NEXT_PLUGIN_SKIP` to `true` in environment variables

## Second approach

#### 1. Deploy the blog

Use the buttons below to deploy your blog directly

- Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mohammad-mallaee/blogger#NETLIFY_NEXT_PLUGIN_SKIP=true)

- Vercel

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmohammad-mallaee%2Fblogger"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

#### 2. Clone your own repository

```bash
git clone https://path-to-your-repository
```

```bash
cd your-repository
```

#### 3. Configure the blog
This step remains the same as the second step in the first approach.

#### 4. Create your first post
This remains identical to the previous approach. Once you've written and tested your post, push your changes, and the service will automatically build and publish your blog.
