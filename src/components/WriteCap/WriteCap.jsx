import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'
import useOnClickOutside from '../../hooks/useOnClickOutside'

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

  useOnClickOutside({ ref: formRef, handler: toggleOpenHandler })

  if (isOpen) {
    return (
      <form
        ref={formRef}
        onSubmit={writeCapHandler}
        className="absolute bottom-0 z-10 right-20">
        <div className="flex flex-col p-3 pb-0 border rounded-br-none shadow-md rounded-2xl w-96 border-zinc-500 bg-zinc-800 hover:shadow-lg">
          <textarea
            type="text"
            name="capText"
            className="h-32 px-4 py-2 bg-transparent border rounded-md resize-none border-zinc-500 focus:outline-none"
          />
          <button className="ml-auto text-purple-500 w-fit">
            <img src="/send.svg" alt="Send" className="w-10 p-2" />
          </button>
        </div>
      </form>
    )
  }

  return (
    <div
      onClick={toggleOpenHandler}
      className="fixed z-10 cursor-pointer bottom-5 md:bottom-32 right-5 md:right-20">
      <p className="px-4 py-2 border rounded-br-none shadow-md bg-zinc-800 rounded-2xl border-zinc-600 hover:shadow-lg">
        <span className="hidden md:inline">What's on your mind? </span>✨
      </p>
    </div>
  )
}
