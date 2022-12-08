import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'
import useTimestamp from '../../hooks/useTimestamp'

import Avatar from '../Avatar/Avatar'
import CapActions from '../CapActions/CapActions'

export default function CapItem({ cap }) {
  const navigate = useNavigate()
  const { getProfile } = useDb()

  const user_id = cap.user_id

  const { data: profile } = useQuery({
    queryKey: ['profile', user_id],
    queryFn: () => getProfile({ user_id }),
    refetchOnWindowFocus: false
  })

  const dateTime = useTimestamp(cap.created_at)

  if (!profile) {
    return (
      <div className="px-4 py-5 mx-auto border rounded-md shadow-md border-zinc-600 bg-zinc-800 hover:shadow-xl">
        <p className="mb-3 text-lg">{cap.text}</p>
        <span className="block text-sm text-right">{dateTime}</span>
      </div>
    )
  }

  const goToCapHandler = () => navigate(`/cap/${cap.id}`)

  if (!profile?.username) return

  return (
    <div
      onClick={goToCapHandler}
      className="flex gap-4 px-6 pt-5 pb-2 mx-auto border rounded-md shadow-md cursor-pointer border-zinc-600 bg-zinc-800 hover:shadow-xl">
      <Avatar path={profile?.avatar_url} size="medium" />
      <div className="flex-grow">
        <div className="flex flex-wrap mb-3 gap-x-3">
          {profile?.username && (
            <p className="font-bold">@{profile.username}</p>
          )}
          {profile?.full_name && (
            <p className=" text-zinc-500">
              {'\u00B7 '}
              {profile.full_name}
            </p>
          )}
        </div>
        <p className="mb-3 text-lg">{cap.text}</p>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <span className="py-2 text-sm text-zinc-500">{dateTime}</span>
          <CapActions cap_id={cap?.id} />
        </div>
      </div>
    </div>
  )
}
