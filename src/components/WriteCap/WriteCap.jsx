import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function WriteCap() {
  const [isOpen, setOpen] = useState(false)

  const formRef = useRef(null)

  const { currentUser } = useAuth()
  const { writeCap } = useDb()

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

  if (isOpen) {
    return (
      <form
        ref={formRef}
        onSubmit={writeCapHandler}
        className="absolute bottom-0 z-10 right-20">
        <div className="flex flex-col p-3 border rounded-br-none shadow-md rounded-2xl w-96 border-zinc-500 bg-zinc-800">
          <textarea
            type="text"
            name="capText"
            className="h-32 px-4 py-2 bg-transparent border rounded-md resize-none border-zinc-500 focus:outline-none"
          />
          <div className="flex justify-end gap-3 mt-5">
            <button type="button" onClick={toggleOpenHandler}>
              Cancel
            </button>
            <button className="text-purple-500">Create</button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div
      onClick={toggleOpenHandler}
      className="absolute bottom-0 z-10 cursor-pointer right-20">
      <p className="px-4 py-2 border rounded-br-none shadow-md bg-zinc-800 rounded-2xl border-zinc-600">
        What's on your mind? ✨
      </p>
    </div>
  )
}
