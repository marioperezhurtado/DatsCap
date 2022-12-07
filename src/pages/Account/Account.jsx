import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'
import useTimestamp from '../../hooks/useTimestamp'

import Header from '../../layout/Header/Header'
import Loader from '../../layout/Loader/Loader'
import Avatar from '../../components/Avatar/Avatar'
import AccountExample from '../../components/AccountExample/AccountExample'

export default function Account() {
  const { currentUser } = useAuth()
  const { getProfile, updateProfile } = useDb()

  const id = currentUser?.id
  const dateTime = useTimestamp(currentUser?.created_at)

  const {
    isLoading,
    error,
    data: profile,
    refetch
  } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile({ user_id: id })
  })

  const [isEditing, setIsEditing] = useState(false)
  const [validationError, setValidationError] = useState(null)

  const formRef = useRef(null)

  const startEditingHandler = () => setIsEditing(true)
  const cancelEditingHandler = () => setIsEditing(false)

  const {
    error: editError,
    isLoading: isEditingProfile,
    mutate: editProfile
  } = useMutation({
    mutationKey: ['editProfile', id],
    mutationFn: ({ id, username, full_name }) =>
      updateProfile({ id, username, full_name }),
    onSuccess: () => {
      setIsEditing(false)
      refetch()
    }
  })

  const editProfileHandler = (e) => {
    e.preventDefault()

    const username = formRef.current.username.value
    const full_name = formRef.current.fullName.value

    if (!username) {
      setValidationError('Username is required')
      return
    }
    if (username.length < 5) {
      setValidationError('Username must be at least 5 characters long')
      return
    }

    editProfile({ id, username, full_name })
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="max-w-xl mx-auto mt-20 ">
          <h1 className="mb-10 text-2xl ">
            Your personal <span className="text-purple-500">account</span>
          </h1>
          <Loader />
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-xl px-8 py-6 mx-auto mt-20 mb-10 border rounded-md shadow-md border-zinc-600 bg-zinc-800">
          <h1 className="mb-10 text-2xl ">
            Your personal <span className="text-purple-500">account</span>
          </h1>
          <p className="text-red-400">
            Sorry, we could not get your profile. Try again later
          </p>
        </div>
      </>
    )
  }

  if (isEditing) {
    return (
      <>
        <Header />
        <div className="max-w-xl mx-auto mt-20 ">
          <form
            ref={formRef}
            className="px-8 py-6 mb-10 border rounded-md shadow-md border-zinc-600 bg-zinc-800">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="mb-5 text-2xl">
                  Your personal <span className="text-purple-500">account</span>
                </h1>
                <div className="flex items-center mb-3 text-xl text-purple-500 border-b border-slate-400">
                  @
                  <input
                    name="username"
                    className="bg-transparent focus:outline-none"
                    defaultValue={profile.username}
                  />
                </div>
                <div className="flex items-center gap-3 text-lg border-b border-slate-400">
                  <img src="/account.svg" alt="Account name" className="w-5" />
                  <input
                    name="fullName"
                    className="w-full bg-transparent focus:outline-none "
                    defaultValue={profile?.full_name || 'Your Name'}
                  />
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <img src="/email.svg" alt="Email" className="w-5" />
                  {currentUser.email}
                </div>
                <div className="flex items-center gap-3">
                  <img src="/calendar.svg" alt="Created at" className="w-5" />
                  {dateTime}
                </div>
              </div>
              <div className="mt-12">
                <Avatar path={profile?.avatar_url} size="large" />
              </div>
            </div>
            <div className="flex">
              <button
                onClick={cancelEditingHandler}
                type="button"
                className="block px-2 py-1 mt-5 text-sm transition-all border rounded-md border-zinc-600 hover:bg-slate-500">
                Cancel
              </button>
              <button
                disabled={isEditingProfile}
                onClick={editProfileHandler}
                className="block px-2 py-1 mt-5 ml-2 text-sm transition-all border rounded-md border-zinc-600 hover:bg-slate-500">
                Save changes
              </button>
            </div>
            {validationError && (
              <p className="mt-3 text-red-400">{validationError}</p>
            )}
            {editError && (
              <p className="mt-3 text-red-400">{editError.message}</p>
            )}
          </form>
          <AccountExample
            avatar_url={profile?.avatar_url}
            username={profile?.username}
            full_name={profile?.full_name}
          />
          <Link to="/">
            <button className="block px-2 py-1 mx-auto mt-10 transition-all border rounded-md border-zinc-600 hover:bg-slate-500">
              Back to Home
            </button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto mt-20">
        <div className="px-8 py-6 mb-10 border rounded-md shadow-md border-zinc-600 bg-zinc-800">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="mb-5 text-2xl">
                Your personal <span className="text-purple-500">account</span>
              </h1>
              <p className="mb-3 text-xl text-purple-500 border-b border-transparent">
                @{profile.username}
              </p>

              <p className="flex items-center gap-3 text-lg border-b border-transparent">
                <img src="/account.svg" alt="Account name" className="w-5" />
                {(profile?.full_name && profile?.full_name) || (
                  <span className="text-zinc-500">Your Name</span>
                )}
              </p>

              <p className="flex items-center gap-3 text-lg">
                <img src="/email.svg" alt="Email" className="w-5" />
                {currentUser.email}
              </p>

              <p className="flex items-center gap-3">
                <img src="/calendar.svg" alt="Created at" className="w-5" />
                {dateTime}
              </p>
            </div>
            <div className="mt-12">
              <Avatar path={profile?.avatar_url} size="large" />
            </div>
          </div>
          <button
            onClick={startEditingHandler}
            className="block px-2 py-1 mt-5 text-sm transition-all border rounded-md border-zinc-600 hover:bg-slate-500">
            Edit account
          </button>
        </div>
        <AccountExample
          avatar_url={profile?.avatar_url}
          username={profile?.username}
          full_name={profile?.full_name}
        />
        <Link to="/">
          <button className="block px-2 py-1 mx-auto mt-10 transition-all border rounded-md border-zinc-600 hover:bg-slate-500">
            Back to Home
          </button>
        </Link>
      </div>
    </>
  )
}
