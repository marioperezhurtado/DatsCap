import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import AccountExample from '../../components/AccountExample/AccountExample'

export default function CompleteAccount() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { getProfile, updateProfile } = useDb()

  const id = currentUser?.id

  const { data: profile, refetch } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile({ user_id: id })
  })

  const {
    error: completeProfileError,
    isLoading: isCompletingProfile,
    mutate: completeProfile
  } = useMutation({
    mutationKey: ['editProfile', id],
    mutationFn: ({ id, username, full_name }) =>
      updateProfile({ id, username, full_name }),
    onSuccess: async () => {
      await refetch()
      navigate('/')
    }
  })

  const [usernameInput, setUsernameInput] = useState(profile?.username || '')
  const [fullNameInput, setFullNameInput] = useState(profile?.full_name || '')
  const [validationError, setValidationError] = useState(null)

  const changeUsernameHandler = (e) =>
    setUsernameInput(e.target.value.toLowerCase())
  const changeFullNameHandler = (e) => setFullNameInput(e.target.value)

  const completeAccountHandler = (e) => {
    e.preventDefault()

    if (!usernameInput) {
      setValidationError('Username is required')
      return
    }
    if (usernameInput.length < 5) {
      setValidationError('Username must be at least 5 characters long')
      return
    }

    completeProfile({
      id: id,
      username: usernameInput,
      full_name: fullNameInput
    })
  }

  useEffect(() => {
    if (profile?.username) setUsernameInput(profile.username)
    if (profile?.full_name) setFullNameInput(profile.full_name)
  }, [profile])

  useEffect(() => {
    if (!currentUser) navigate('/signin')
  }, [currentUser])

  return (
    <>
      <div className="max-w-xl p-10 mx-auto mt-20 mb-10 border rounded-md shadow-md border-zinc-600 bg-zinc-800 hover:shadow-xl">
        <h1 className="mb-6 text-2xl text-center">
          You are <span className="text-purple-500">almost done!</span>
        </h1>
        <p className="mb-10 text-lg text-center">
          Please complete your account to get started
        </p>
        <form
          onSubmit={completeAccountHandler}
          className="flex flex-col max-w-xs gap-5 mx-auto">
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              name="username"
              onChange={changeUsernameHandler}
              value={usernameInput}
              className="px-3 py-1 text-black rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              onChange={changeFullNameHandler}
              value={fullNameInput}
              className="px-3 py-1 text-black rounded-md"
            />
          </div>
          <button
            disabled={isCompletingProfile}
            className="px-2 py-1 mx-auto border rounded-md border-zinc-600 w-fit hover:bg-slate-500">
            Complete account
          </button>
          {validationError && (
            <p className="text-red-400 text-center">{validationError}</p>
          )}
          {completeProfileError && (
            <p className="text-red-400 text-center">
              {completeProfileError.message}
            </p>
          )}
        </form>
      </div>
      <div className="max-w-xl mx-auto">
        <AccountExample
          avatar_url={profile?.avatar_url}
          username={usernameInput}
          full_name={fullNameInput}
        />
      </div>
    </>
  )
}
