import Link from "next/link"
import { PostData } from "../utils/types"
import { getMdDirection, getMdLanguage } from "../actions/getMdProperties"

const PostCard = ({ post }: { post: PostData }) => {
  return (
    <Link className='group flex px-1 py-4 rounded-[4px] flex-col hover:scale-[1.01] ease-in-out transition-transform bg-[--surface] text-[--on-surface] border-[--outline]'
      style={{ direction: getMdDirection(post) }}
      key={post.slug} href={'/posts/' + post.slug}>
      {post.image &&
        <img src={post.image} alt={post.title} className='rounded-sm w-full mb-3 aspect-[18/9.5]' />
      }
      <div className={`text-[24px] sm:text-[28px] font-normal group-hover:text-[--primary]`}>{post.title}</div>
      <div className='text-[--on-surface-variant] text-[13px] sm:text-sm font-normal'>
        {new Date(post.date || "").toLocaleDateString(getMdLanguage(post), {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      {post.spoiler &&
        <div className='text-[--on-surface-variant2] text-[15px] sm:text-[16px] mt-1'>{post.spoiler}</div>
      }
    </Link>
  )
}

export default PostCard