import { getLatestPosts } from '@/app/actions/postActions'
import PostCard from './components/PostCard'
import { Fragment } from 'react'

export default async function Home() {
  const posts = await getLatestPosts()
  return (
    <main className="flex min-h-screen flex-col gap-4 py-4 px-4 md:px-2 pb-24 max-w-2xl w-full">
      {posts.length > 0 ? posts.map((post) => {
        return <Fragment key={post.slug}>
          <PostCard post={post} />
          <hr className='border-[--outline] border-dashed' />
        </Fragment>
      }) : <h1 className='text-2xl'>There is nothing here ...</h1>}
    </main>
  )
}
import { getLatestPosts } from '@/app/actions/postActions'
import PostCard from './components/PostCard'
import { Fragment } from 'react'

export default async function Home() {
  const posts = await getLatestPosts()
  return (
    <main className="flex min-h-screen flex-col gap-4 py-4 px-4 md:px-2 pb-24 max-w-2xl w-full">
      {posts.length > 0 ? posts.map((post) => {
        return <Fragment key={post.slug}>
          <PostCard post={post} />
          <hr className='border-[--outline] border-dashed' />
        </Fragment>
      }) : <h1 className='text-2xl'>There is nothing here ...</h1>}
    </main>
  )
}
