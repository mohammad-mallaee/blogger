import { getAllPosts, getPost } from "@/actions/posts"
import { notFound } from "next/navigation"
import Markdown from "@/components/markdown"

import { getMdAuthors, getMdDirection, getMdLanguage } from "@/actions/mdProperties";
import config from "@/config";
import { PostData } from "../../types";
import path from "path";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getSidebarData, hasSidebar } from "@/actions/sidebar";
import clsx from "clsx";
import TableOfContent from "@/components/TableOfContent";

export async function generateMetadata({ params }: { params: { slug: string | string[] } }) {
    if (params.slug === undefined)
        params.slug = ""
    else if (Array.isArray(params.slug))
        params.slug = decodeURIComponent(params.slug.join(path.sep))

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
    if (params.slug === undefined)
        params.slug = ""
    if (Array.isArray(params.slug))
        params.slug = decodeURIComponent(params.slug.join(path.sep))

    const { data, content, components } = await getPost(params.slug).catch(() => { notFound() })
    const sidebarSlug = await hasSidebar("/" + params.slug)
    const showSidebar = sidebarSlug !== undefined
    let sidebarData = null
    if (sidebarSlug)
        sidebarData = await getSidebarData(sidebarSlug)

    const direction = getMdDirection(data)

    const { content: article, tableOfContent } = await Markdown({ source: content, components })

    return <div className="flex justify-center gap-12" style={{ direction: config.direction }}>
        <Sidebar data={sidebarData} show={showSidebar} direction={config.direction} />
        <div className='flex flex-col items-center grow max-w-post w-full'>
            <Header sidebar={showSidebar} />
            <main className="min-h-screen py-4 px-4 md:px-1 pt-2 pb-8 w-full" style={{ direction }}>
                {data.image && <img src={data.image} alt={data.title} className="w-full mb-4 rounded-md" />}
                {(data.title || data.date) &&
                    <div className={(data.image ? "mb-2" : "my-6")}>
                        {data.title && <h1 className="text-h2 sm:text-h1 leading-9 mb-1 block font-medium text-on-background-stronger">{data.title}</h1>}
                        {data.date &&
                            <h2 className="text-sm sm:text-base">
                                {new Date(data.date || "").toLocaleDateString(getMdLanguage(data), {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </h2>
                        }
                    </div>
                }
                <article className={clsx("markdown", direction === "rtl" && "rtl")}>
                    {article}
                </article>
            </main >
        </div>
        <TableOfContent data={tableOfContent} show={data.table_of_contents || config.table_of_contents} />
    </div>
}

export async function generateStaticParams() {
    const posts = await getAllPosts({ recursive: true, self: true, log: true })
    if (process.env.NODE_ENV === "development")
        return posts.map((post: PostData) => ({
            slug: post.slug.split(path.sep).slice(1).map(encodeURIComponent)
        }))
    else return posts.map((post: PostData) => ({
        slug: post.slug.split(path.sep).slice(1)
    }))
}

export const dynamicParams = process.env.NODE_ENV === "development"