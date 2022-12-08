import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'

import Avatar from '../Avatar/Avatar'

export default function CommentItem({ comment }) {
  if (!comment) return

  const { getProfile } = useDb()

  const user_id = comment.user_id

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
    <div className="flex flex-wrap items-center gap-2 px-6 py-4 border rounded-md shadow-md border-zinc-600 bg-neutral-800">
      <Avatar path={profile.avatar_url} size="small" />
      <p className="font-bold">@{profile.username}</p>
      <p className="ml-3">{comment.text}</p>
    </div>
  )
}
