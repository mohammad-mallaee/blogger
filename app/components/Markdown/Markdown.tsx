import { MDXRemote } from "next-mdx-remote/rsc"
import './markdown.css'
import rehypePrettyCode from "rehype-pretty-code"
import rehypeKatex from "rehype-katex"
import 'katex/dist/katex.min.css'
import remarkMath from "remark-math"
import PostCard from "../PostCard"

export default function Markdown({ source, components }: { source: string, components: any }) {
    return <MDXRemote
        source={source}
        components={{ ...components, PostCard }}
        options={{
            mdxOptions: {
                useDynamicImport: true,
                rehypePlugins: [
                    //@ts-ignore
                    rehypeKatex,
                    //@ts-ignore
                    [rehypePrettyCode, {
                        keepBackground: false,
                        theme: {
                            dark: "github-dark",
                            light: "github-light",
                        }
                    }]
                ],
                remarkPlugins: [
                    remarkMath,
                ]
            }
        }} />
}