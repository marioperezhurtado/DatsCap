import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function WriteReply({ reply_to }) {
  const { currentUser } = useAuth()
  const { addComment } = useDb()

  const { id } = useParams()
  const user_id = currentUser?.id

  const formRef = useRef(null)

  const { isLoading, mutate } = useMutation({
    mutationKey: ['addComment', id],
    mutationFn: ({ text }) =>
      addComment({ cap_id: id, user_id, text, reply_to }),
    onSuccess: () => formRef.current.reset()
  })

  const addCommentHandler = (e) => {
    e.preventDefault()
    const comment = formRef.current.comment.value

    if (!comment || !currentUser) return

    mutate({ text: comment })
  }

  return (
    <form
      ref={formRef}
      onSubmit={addCommentHandler}
      className="flex flex-wrap gap-1 w-full mb-1">
      <input
        type="text"
        name="comment"
        placeholder={`Add a reply...`}
        className="flex-grow w-full px-3 py-2 text-black border rounded-md md:py-1 md:w-fit border-zinc-600"
      />
      <button
        disabled={isLoading}
        className="w-full px-4 py-2 border rounded-md md:w-fit text-md md:py-1 border-zinc-600 bg-neutral-800 hover:bg-neutral-700 transition">
        Reply
      </button>
    </form>
  )
}
