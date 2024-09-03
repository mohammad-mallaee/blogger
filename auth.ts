import path from "path"
import { getMdPostState } from "./app/actions/mdProperties"
import { getAllPosts } from "./app/actions/posts"
import fs from "fs/promises"
import config from "./config"

const middleware = (matcher: string[]) =>
    `export { default } from "next-auth/middleware"
export const config = { matcher: [${matcher.map(m => `"${m}"`).join(", ")}] }`

const github =
    `Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })`

const route = (github = "") =>
    `import NextAuth from "next-auth/next"
import Github from "next-auth/providers/github"

const handler = NextAuth({
    providers: [
        ${github}
    ],
    callbacks: {
        async signIn({ user }) {
            const email = user.email || ""
            const whitelist = JSON.parse(process.env.WHITELIST as string) as string[] || []
            return whitelist.includes(email)
        }
    },
    pages: {
        signIn: '/signin',
        signOut: '/signout',
        error: '/auth-error'
    },
})

export { handler as GET, handler as POST }`

async function run() {
    if (config.auth.enable === true) {
        await fs.mkdir(("app/api/auth/[...nextauth]"), { recursive: true })
        await fs.writeFile("app/api/auth/[...nextauth]/route.ts", route(config.auth.provideres.github ? github : ""))
        const allPosts = await getAllPosts({ recursive: true })
        const privatePosts = allPosts.filter(post => getMdPostState(post) === 'private')
        const matcher = privatePosts.flatMap(post => [path.join(post.slug, ":path*"), post.slug + ".md"])
        fs.writeFile("middleware.ts", middleware(matcher))
    } else {
        await fs.rm("app/api", { recursive: true }).catch(e => e)
        await fs.rm("middleware.ts", { recursive: true }).catch(e => e)
    }
}

run()