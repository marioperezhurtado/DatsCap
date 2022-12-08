import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import Avatar from '../Avatar/Avatar'

export default function WriteCap() {
  const [isOpen, setOpen] = useState(false)

  const formRef = useRef(null)

  const { currentUser } = useAuth()
  const { writeCap } = useDb()

  const user_id = currentUser.id

  const { data: profile } = useQuery({
    queryKey: ['profile', user_id],
    queryFn: () => getProfile({ user_id }),
    refetchOnWindowFocus: false
  })

  const toggleOpenHandler = () => setOpen((o) => !o)

  const { error, mutate } = useMutation({
    mutationKey: ['writeCap'],
    mutationFn: (text) => writeCap({ text, user_id: currentUser.id })
  })

  const writeCapHandler = (e) => {
    e.preventDefault()

    const text = formRef.current.capText.value

    if (!text) return

    mutate(text)

    if (!error) {
      formRef.current.reset()
      toggleOpenHandler()
    }
  }

  useOnClickOutside({ ref: formRef, handler: toggleOpenHandler })

  if (isOpen) {
    return (
      <form
        ref={formRef}
        onSubmit={writeCapHandler}
        className="fixed z-10 flex flex-col w-11/12 p-3 pb-0 border rounded-br-none shadow-md md:bottom-32 bottom-5 right-5 md:right-20 rounded-2xl md:w-96 border-zinc-500 bg-zinc-800 hover:shadow-lg">
        <div className="flex items-center mb-2 gap-x-2">
          <Avatar path={profile?.avatar_url} size="small" />
          {profile?.username && <p>@{profile.username}</p>}
        </div>
        <textarea
          type="text"
          name="capText"
          className="h-32 px-4 py-2 bg-transparent border rounded-md resize-none border-zinc-500 focus:outline-none"
          placeholder="Type something..."
        />
        <div className="flex gap-2 my-2 ml-auto ">
          <button
            type="button"
            onClick={toggleOpenHandler}
            className="px-2 py-1 transition border rounded-md border-zinc-600 w-fit hover:bg-slate-500 bg-neutral-800">
            Cancel
          </button>
          <button className="px-2 py-1 transition border rounded-md border-zinc-600 w-fit hover:bg-slate-500 bg-neutral-800">
            Create
          </button>
        </div>
      </form>
    )
  }

  return (
    <div
      onClick={toggleOpenHandler}
      className="fixed z-10 cursor-pointer bottom-5 md:bottom-32 right-5 md:right-20">
      <p className="px-4 py-2 transition border rounded-br-none shadow-md bg-zinc-700 border-zinc-500 rounded-2xl hover:shadow-lg hover:bg-slate-500">
        <span className="hidden md:inline">What's on your mind? </span>✨
      </p>
    </div>
  )
}
