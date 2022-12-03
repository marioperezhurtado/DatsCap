import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'
import useTimestamp from '../../hooks/useTimestamp'

import Loader from '../../layout/Loader/Loader'

export default function MyProfile() {
  const { currentUser } = useAuth()
  const { getProfile } = useDb()

  const id = currentUser?.id
  const dateTime = useTimestamp(currentUser?.created_at)

  const {
    isLoading,
    error,
    data: profile
  } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile({ user_id: id })
  })

  const [pictureLoaded, setPictureLoaded] = useState(false)
  const showPictureHandler = () => setPictureLoaded(true)

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto mt-20 ">
        <h1 className="mb-10 text-2xl ">
          Your personal <span className="text-purple-500">account</span>
        </h1>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-20 ">
        <h1 className="mb-10 text-2xl ">
          Your personal <span className="text-purple-500">account</span>
        </h1>
        <p className="text-red-500">
          Sorry, we could not get your profile. Try again later
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-20 ">
      <h1 className="mb-10 text-2xl ">
        Your personal <span className="text-purple-500">account</span>
      </h1>
      <div className="flex justify-between p-4 border rounded-md shadow-md border-zinc-600 bg-zinc-800">
        <div className="flex flex-col gap-2 ml-5">
          {profile?.username && (
            <p className="mb-3 text-2xl text-purple-500">@{profile.username}</p>
          )}
          {profile?.full_name && (
            <p className="flex items-center gap-3 text-lg">
              <img src="/account.svg" alt="Account name" className="w-4" />
              {profile.full_name}
            </p>
          )}
          <p className="flex items-center gap-3 text-lg">
            <img src="/email.svg" alt="Email" className="w-4" />
            {currentUser?.email}
          </p>
          <p className="flex items-center gap-3">
            <img src="/history.svg" alt="Created at" className="w-4" />
            {dateTime}
          </p>
        </div>
        <div className="w-32 h-32 border rounded-md border-zinc-600 ">
          <img
            src={profile?.avatar_url}
            alt="Profile picture"
            className={pictureLoaded ? '' : 'hidden'}
            onLoad={showPictureHandler}
          />
        </div>
      </div>
    </div>
  )
}
