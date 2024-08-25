import Link from "next/link"
import { PostData, PostSize } from "../utils/types"
import { getMdDirection, getMdLanguage } from "../actions/mdProperties"

const PostCard = ({ post, size = "default" }: { post: PostData, size?: PostSize }) => {
  switch (size) {
    case "compact":
      return <CompactCard post={post} />
    case "minimal":
      return <MinimalCard post={post} />
    default:
      return <DefaultCard post={post} />
  }
}

const DefaultCard = ({ post }: { post: PostData }) => {
  return (
    <Link className='group flex px-1 py-4 rounded-[4px] max-w-[680px] flex-col hover:scale-[1.01]
          ease-in-out transition-transform bg-[--surface] text-[--on-surface] border-[--outline]'
      style={{ direction: getMdDirection(post) }}
      key={post.slug} href={post.slug}>
      {post.image &&
        <img src={post.image} alt={post.title} className='rounded-sm w-full mb-3 aspect-[18/9.5]' />
      }
      <div className={`text-[20px] sm:text-[24px] font-normal group-hover:text-[--primary]`}>{post.title}</div>
      <div className='text-[--on-surface-variant] text-[13px] sm:text-sm font-normal'>
        {new Date(post.date || "").toLocaleDateString(getMdLanguage(post), {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      {post.spoiler &&
        <div className='text-[--on-surface-variant] text-[15px] sm:text-[16px]'>{post.spoiler}</div>
      }
    </Link>
  )
}

const CompactCard = ({ post }: { post: PostData }) => {
  return post.image ? (
    <Link className='group flex px-1 py-3 rounded-[4px] hover:scale-[1.01] gap-3 flex-col sm:flex-row
          ease-in-out transition-transform bg-[--surface] text-[--on-surface] border-[--outline]'
      style={{ direction: getMdDirection(post) }}
      key={post.slug} href={post.slug}>
      <div className="flex flex-col grow">
        <div className={`text-[22px] sm:text-[24px] font-normal group-hover:text-[--primary]`}>{post.title}</div>
        <div className='text-[--on-surface-variant] text-[13px] sm:text-[15px] font-normal mb-2'>
          {new Date(post.date || "").toLocaleDateString(getMdLanguage(post), {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        {post.spoiler &&
          <span className='text-[15px] sm:text-[17px] text-[--on-surface-variant]'>{post.spoiler}</span>
        }
      </div>
      <img src={post.image} alt={post.title} className='rounded w-full sm:max-w-[200px] aspect-[16/9]' />
    </Link>
  ) : <MinimalCard post={post} />
}

const MinimalCard = ({ post }: { post: PostData }) => {
  return <Link className='group flex px-1 py-3 rounded-[4px] flex-col hover:scale-[1.01]
  ease-in-out transition-transform bg-[--surface] text-[--on-surface] border-[--outline]'
    style={{ direction: getMdDirection(post) }}
    key={post.slug} href={post.slug}>
    <div className={`text-[19px] sm:text-[22px] font-normal group-hover:text-[--primary]`}>{post.title}</div>
    <div className='text-[--on-surface-variant] text-[13px] sm:text-sm font-normal'>
      {new Date(post.date || "").toLocaleDateString(getMdLanguage(post), {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
      {post.spoiler &&
        <span className="text-[14px] sm:text-[16px]"> - {post.spoiler}</span>
      }
    </div>
  </Link>
}

export default PostCard