import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import Modal from '../../layout/Modal/Modal'
import ReplyIcon from '../../assets/ReplyIcon'
import DeleteIcon from '../../assets/DeleteIcon'

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
        <li className="flex items-center">
          <button className="p-2 fill-zinc-500 hover:fill-purple-500">
            <ReplyIcon />
          </button>
        </li>
        {currentUser?.id === comment.user_id && (
          <li className="flex items-center">
            <button
              onClick={startDeleting}
              className="p-2 fill-zinc-500 hover:fill-purple-500">
              <DeleteIcon />
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
