import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'
import useTimestamp from '../../hooks/useTimestamp'

import Avatar from '../Avatar/Avatar'

export default function CapItem({ cap }) {
  const { getProfile } = useDb()

  const id = cap.user_id

  const {
    error: profileError,
    loading: profileLoading,
    data: profile
  } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile({ user_id: id })
  })

  const dateTime = useTimestamp(cap.created_at)

  if (profileError || profileLoading) {
    return (
      <div className="px-4 py-5 mx-auto border rounded-md shadow-md border-zinc-600 bg-zinc-800">
        <p className="mb-3 text-xl">{cap.text}</p>
        <span className="block text-sm text-right">{dateTime}</span>
      </div>
    )
  }

  return (
    <div className="px-6 py-5 mx-auto border rounded-md shadow-md border-zinc-600 bg-zinc-800 flex gap-4">
      <Avatar path={profile?.avatar_url} size="small" />
      <div className="flex-grow">
        <div className="flex gap-3">
          {profile?.username && <p className="mb-3">@{profile.username}</p>}
          {profile?.full_name && (
            <p className="mb-3 text-zinc-500">{profile.full_name}</p>
          )}
        </div>
        <p className="mb-3 text-xl">{cap.text}</p>
        <span className="block text-sm text-right">{dateTime}</span>
      </div>
    </div>
  )
}
