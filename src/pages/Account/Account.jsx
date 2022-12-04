import { useQuery } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'
import useTimestamp from '../../hooks/useTimestamp'

import Avatar from '../../components/Avatar/Avatar'
import Loader from '../../layout/Loader/Loader'

export default function Account() {
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
        <p className="text-red-400">
          Sorry, we could not get your profile. Try again later
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-xl mx-auto mt-20 ">
        <h1 className="mb-10 text-2xl ">
          Your personal <span className="text-purple-500">account</span>
        </h1>
        <div className="p-4 border rounded-md shadow-md border-zinc-600 bg-zinc-800">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 ml-5">
              <p className="mb-3 text-2xl text-purple-500">
                @
                {(profile?.username && profile.username) || (
                  <span className="text-zinc-500">unnamed-user</span>
                )}
              </p>

              <p className="flex items-center gap-3 text-lg">
                <img src="/account.svg" alt="Account name" className="w-4" />
                {(profile?.full_name && profile?.full_name) || (
                  <span className="text-zinc-500">Your Name</span>
                )}
              </p>

              <p className="flex items-center gap-3 text-lg">
                <img src="/email.svg" alt="Email" className="w-4" />
                {currentUser?.email}
              </p>

              <p className="flex items-center gap-3">
                <img src="/history.svg" alt="Created at" className="w-4" />
                {dateTime}
              </p>
            </div>
            <Avatar path={profile?.avatar_url} size="big" />
          </div>
          <button className="block px-2 py-1 mt-5 ml-5 text-sm transition-all border rounded-md border-zinc-600 hover:bg-slate-500">
            Save changes
          </button>
        </div>
      </div>

      {!profile?.username && (
        <p className="max-w-md mx-auto mt-10 text-lg text-center">
          If you want your caps to be visible, and your friends to be able to
          search for you,{' '}
          <span className="text-red-400">you must have a user name.</span>
        </p>
      )}
    </>
  )
}
