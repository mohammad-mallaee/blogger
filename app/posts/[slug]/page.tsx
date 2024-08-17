import { getPost } from "@/app/actions/postActions"
import { notFound } from "next/navigation"
import Markdown from "@/app/components/Markdown/Markdown"
import { getAllPosts } from "@/app/actions/postActions";
import { getMdAuthors, getMdDirection, getMdLanguage } from "@/app/actions/getMdProperties";
import config from "@/config.blog";

export async function generateMetadata({ params }: { params: { slug: string } }) {
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

export default async function Page({ params }: { params: { slug: string } }) {
    const { data, content } = await getPost(params.slug).catch(() => notFound())

    return <main className="min-h-screen py-4 px-4 md:px-2 pt-2 pb-16  max-w-2xl w-full" style={{ direction: getMdDirection(data) }}>
        {data.image && <img src={data.image} alt={data.title} className="w-full mb-8 rounded-md aspect-[18/9.5]" />}
        <h1 className="text-4xl mt-4 mb-2 block">{data.title}</h1>
        <h1 className="text-sm sm:text-base">
            {new Date(data.date || "").toLocaleDateString(getMdLanguage(data), {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}
        </h1>
        <br />
        <br />
        <article className="markdown">
            <Markdown source={content} />
        </article>
    </main>
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}import { getPost } from "@/app/actions/postActions"
import { notFound } from "next/navigation"
import Markdown from "@/app/components/Markdown/Markdown"
import { getAllPosts } from "@/app/actions/postActions";
import { getMdAuthors, getMdDirection, getMdLanguage } from "@/app/actions/getMdProperties";
import config from "@/config.blog";

export async function generateMetadata({ params }: { params: { slug: string } }) {
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

export default async function Page({ params }: { params: { slug: string } }) {
    const { data, content } = await getPost(params.slug).catch(() => notFound())

    return <main className="min-h-screen py-4 px-4 md:px-2 pt-2 pb-16  max-w-2xl w-full" style={{ direction: getMdDirection(data) }}>
        {data.image && <img src={data.image} alt={data.title} className="w-full mb-8 rounded-md aspect-[18/9.5]" />}
        <h1 className="text-4xl mt-4 mb-2 block">{data.title}</h1>
        <h1 className="text-sm sm:text-base">
            {new Date(data.date || "").toLocaleDateString(getMdLanguage(data), {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}
        </h1>
        <br />
        <br />
        <article className="markdown">
            <Markdown source={content} />
        </article>
    </main>
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}