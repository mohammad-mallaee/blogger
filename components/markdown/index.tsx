import { compileMDX } from "next-mdx-remote/rsc"
import './markdown.css'
import rehypePrettyCode from "rehype-pretty-code"
import rehypeKatex from "rehype-katex"
import 'katex/dist/katex.min.css'
import remarkMath from "remark-math"
import PostCard from "../article/PostCard"
import remarkTableOfContent from "./toc"
import Heading from "./heading"

export default async function Markdown({ source, components }: { source: string, components: any }) {
    let tableOfContent;
    const { content } = await compileMDX({
        source,
        components: {
            ...components, PostCard,
            h1: (props) => <Heading depth={1} {...props} />,
            h2: (props) => <Heading depth={2} {...props} />,
            h3: (props) => <Heading depth={3} {...props} />,
        },
        options: {
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
                    [remarkTableOfContent, (value: any) => { tableOfContent = value }]
                ]
            }
        }
    })
    return { content, tableOfContent }
}