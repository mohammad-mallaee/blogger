import { getAllPosts, getPost } from "@/app/actions/posts"
import { notFound } from "next/navigation"
import Markdown from "@/app/components/Markdown/Markdown"

import { getMdAuthors, getMdDirection, getMdLanguage } from "@/app/actions/mdProperties";
import config from "@/config";
import { PostData } from "../types";
import path from "path";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getSidebarData, hasSidebar } from "../actions/sidebar";

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
    if (params.slug === undefined)
        params.slug = ""
    if (Array.isArray(params.slug))
        params.slug = params.slug.join(path.sep)

    const { data, content, components } = await getPost(params.slug).catch(() => { notFound() })
    const showSidebar = await hasSidebar("/" + params.slug)
    let sidebarData = null
    if (showSidebar)
        sidebarData = await getSidebarData(showSidebar)

    return <>
        {showSidebar &&
            <Sidebar data={sidebarData} />
        }
        <div className='flex flex-col items-center grow max-w-post w-full'>
            <Header sidebar={showSidebar !== undefined} />
            <main className="min-h-screen py-4 px-4 md:px-1 pt-2 pb-8 w-full" style={{ direction: getMdDirection(data) }}>
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
                <article className="markdown">
                    <Markdown source={content} components={components} />
                </article>
            </main >
        </div>
        {showSidebar && <div className="w-[280px] hidden xl:block"></div>}
    </>
}

export async function generateStaticParams() {
    const posts = await getAllPosts({ recursive: true, self: true, log: true })
    return posts.map((post: PostData) => ({
        slug: post.slug.split(path.sep).slice(1),
    }))
}