import type { FC } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { htmlToText } from 'services'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export interface Props
  extends Pick<IPost, 'title' | 'content' | 'created_at' | 'id'> {}
interface State {}

const Post: FC<Props> = ({ id, title, content, created_at }) => {
  return (
    <Link href={`/${id}`}>
      <a className="group">
        <h2 className="line-clamp-1 group-hover:underline md:text-lg md:line-clamp-2">
          {title}
        </h2>
        <p className="mt-2.5 text-sm text-neutral-500 line-clamp-3 md:text-base">
          {htmlToText(content).content}
        </p>
        <div className="mt-2 text-sm text-neutral-300">
          {dayjs(created_at).locale('ko').fromNow()}
        </div>
      </a>
    </Link>
  )
}

export default Post
