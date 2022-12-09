import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'
import useTimestamp from '../../hooks/useTimestamp'

import Avatar from '../Avatar/Avatar'
import CommentActions from '../CommentActions/CommentActions'

export default function CommentItem({ comment }) {
  if (!comment) return

  const { getProfile } = useDb()

  const user_id = comment.user_id
  const date = useTimestamp(comment.created_at)

  const { data: profile } = useQuery({
    queryKey: ['profile', user_id],
    queryFn: () => getProfile({ user_id }),
    refetchOnWindowFocus: false
  })

  if (!profile) {
    return (
      <div className="px-6 py-4 border rounded-md shadow-md border-zinc-500 bg-neutral-800">
        <p>{comment.text}</p>
      </div>
    )
  }

  if (!profile?.username) return

  return (
    <div className="flex flex-wrap items-center gap-x-2 px-2 pt-4 pb-1 border rounded-md shadow-md border-zinc-600 bg-neutral-800 md:px-6">
      <Avatar path={profile.avatar_url} size="small" />
      <p className="font-bold">@{profile.username}</p>
      <p className="ml-3">{comment.text}</p>
      <div className="w-full text-zinc-500 text-right text-sm flex justify-between items-center">
        <p>{date}</p>
        <CommentActions comment={comment} />
      </div>
    </div>
  )
}