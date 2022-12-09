import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function WriteComment() {
  const { currentUser } = useAuth()
  const { addComment } = useDb()

  const { id } = useParams()
  const user_id = currentUser?.id

  const formRef = useRef(null)

  const { isLoading, mutate } = useMutation({
    mutationKey: ['addComment', id],
    mutationFn: ({ text }) => addComment({ cap_id: id, user_id, text }),
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
      className="flex flex-wrap gap-1">
      <input
        type="text"
        name="comment"
        placeholder="Add a comment..."
        className="flex-grow px-3 py-1 border rounded-md border-zinc-600 text-black"
      />
      <button
        disabled={isLoading}
        className="px-4 py-1 text-sm border rounded-md border-zinc-600 bg-neutral-800">
        Comment
      </button>
    </form>
  )
}
