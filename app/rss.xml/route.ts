import { generateFeed } from "@/actions/feed"

export async function GET() {
    const feed = await generateFeed()
    const xml = feed.rss2()
    return new Response(xml)
}