import { getAllPosts, getLatestPosts, getPost } from "@/app/actions/posts"
import { notFound } from "next/navigation"
import Markdown from "@/app/components/Markdown/Markdown"

import { getMdAuthors, getMdDirection, getMdLanguage, getMdPostsList } from "@/app/actions/mdProperties";
import config from "@/config";
import PostCard from "../components/PostCard";
import { PostData } from "../utils/types";
import path from "path";

export async function generateMetadata({ params }: { params: { slug: string | string[] } }) {
    if (params.slug === undefined)
        params.slug = ""
    else if (Array.isArray(params.slug))
        params.slug = params.slug.join(path.sep)

    const { data } = await getPost(params.slug).catch(() => notFound())

    return {
        title: data.title,
        description: data.spoiler || `${config.blog_name}'s post`,
        keywords: data.keywords || "",
        authors: getMdAuthors(data),
        openGraph: {
            images: data.image || "",
            publishedTime: data.date ? new Date(data.date).toISOString() : "",
            type: "article",
            authors: getMdAuthors(data)
        }
    }
}

export default async function Page({ params }: { params: { slug: string | string[] } }) {
    if (Array.isArray(params.slug))
        params.slug = params.slug.join(path.sep)

    const { data, content } = await getPost(params.slug || "").catch(() => { notFound() })
    const postsList = getMdPostsList(data)
    const posts = postsList ? await getLatestPosts({ recursive: postsList.recursive, path: postsList.path }) : []

    return <main className="min-h-screen py-4 px-6 md:px-1 pt-2 pb-16 max-w-[740px] w-full" style={{ direction: getMdDirection(data) }}>
        {data.image && <img src={data.image} alt={data.title} className="w-full mb-6 rounded-md aspect-[18/9.5]" />}
        {data.show_title !== false &&
            <div className={(data.image ? "mb-6" : "my-6")}>
                <h1 className="text-4xl mb-1 block font-medium">{data.title}</h1>
                <h1 className="text-sm sm:text-base">
                    {new Date(data.date || "").toLocaleDateString(getMdLanguage(data), {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </h1>
            </div>
        }
        <article className="markdown">
            <Markdown source={content} />
        </article>
        {
            postsList &&
            <div>
                {posts.map((post) => {
                    return <PostCard size={postsList.size} post={post} key={post.slug} />
                })}
            </div>
        }
    </main >
}

export async function generateStaticParams() {
    const posts = await getAllPosts({ recursive: true, self: true })
    return posts.map((post: PostData) => ({
        slug: post.slug.split(path.sep).slice(1),
    }))
}