import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import Modal from '../../layout/Modal/Modal'

export default function CommentActions({ comment }) {
  const { currentUser } = useAuth()
  const { deleteComment } = useDb()

  const [deleting, setDeleting] = useState(false)
  const startDeleting = () => setDeleting(true)
  const stopDeleting = () => setDeleting(false)

  const deleteCommentHandler = () => {
    deleteComment({ comment_id: comment.id })
  }

  return (
    <>
      <ul className="flex">
        <li>
          <button>
            <img src="/reply.svg" alt="Reply" className="p-2 w-9 h-9" />
          </button>
        </li>
        {currentUser?.id === comment.user_id && (
          <li>
            <button onClick={startDeleting}>
              <img src="/delete.svg" alt="Delete" className="p-2 w-9 h-9" />
            </button>
          </li>
        )}
      </ul>

      {deleting && (
        <Modal onCancel={stopDeleting} onConfirm={deleteCommentHandler}>
          <div className="text-left text-slate-300 text-base">
            <h1 className="mb-5 text-xl">
              Are you sure you want to delete this comment?
            </h1>
            <p className="mt-3 ml-3 font-bold md:mt-5">" {comment.text} "</p>
          </div>
        </Modal>
      )}
    </>
  )
}
