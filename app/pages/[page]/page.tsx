import { notFound } from "next/navigation";
import Markdown from "../../components/Markdown/Markdown";
import { getAllPages, getPage } from "../../actions/pageActions";
import { getMdAuthors, getMdDirection } from "@/app/actions/getMdProperties";
import config from "@/config.blog";

export async function generateMetadata({ params }: { params: { page: string } }) {
  const { data } = await getPage(params.page).catch(() => notFound())

  return {
    title: data.title,
    description: data.spoiler || `${config.blog_name}'s website page`,
    keywords: data.keywords || "",
    authors: getMdAuthors(data),
    openGraph: {
      images: data.image || "",
      authors: getMdAuthors(data),
      publishedTime: data.date ? new Date(data.date).toISOString() : "",
      type: "website",
    }
  }
}

export default async function Page({ params }: { params: { page: string } }) {
  const { data, content } = await getPage(params.page).catch(() => notFound())
  return <main className="min-h-screen px-4 md:px-2 markdown max-w-2xl w-full" style={{ direction: getMdDirection(data) }}>
    <Markdown source={content} />
  </main>
}


export async function generateStaticParams() {
  const pages = await getAllPages()

  return pages.map((page) => ({
    page: page.page,
  }))
}