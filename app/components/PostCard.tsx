import Link from "next/link"
import { PostData } from "../types"
import { getMdDirection, getMdLanguage } from "../actions/mdProperties"
import { getPost } from "../actions/posts"
import clsx from "clsx"

const PostCard = async ({ post }: { post: string | PostData }) => {
    let data = typeof post === 'string' ? { ...(await getPost(post)).data, slug: post } : post
    return (
        <Link className={clsx(
            'group flex rounded-[4px] gap-4 ease-in-out transition-all bg-slate-100 dark:bg-surface',
            'my-2 hover:border-gray-600 border border-stone-300 dark:border-stone-700',
            data.image ? 'p-2' : 'px-4 py-2'
        )}
            style={{ direction: getMdDirection(data), textDecoration: "none" }}
            key={data.slug} href={data.slug}>
            {data.image &&
                <div className="max-w-[200px]">
                    <img src={data.image} alt={data.title} className='rounded-sm aspect-[18/9.5] w-full !m-0' />
                </div>
            }
            <div className={clsx("py-1 flex flex-col justify-center", !data.spoiler && "gap-1")}>
                <div className={'text-[20px] sm:text-[24px] font-normal'}>{data.title}</div>
                {data.date &&
                    <div className='text-on-surface-variant text-[13px] sm:text-sm font-normal'>
                        {new Date(data.date || "").toLocaleDateString(getMdLanguage(data), {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </div>
                }
                {data.spoiler &&
                    <div className='text-gray-600 dark:text-gray-400 text-[15px] sm:text-[16px] mt-2 leading-5 text-on-background line-clamp-2'>
                        {data.spoiler}
                    </div>
                }
            </div>
        </Link>
    )
}

export default PostCard