import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import Modal from '../../layout/Modal/Modal'

export default function CapActions({ cap }) {
  const {
    getLikeCount,
    getDislikeCount,
    getCommentCount,
    addReaction,
    deleteCap
  } = useDb()

  const cap_id = cap?.id
  const user_id = cap?.user_id

  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', cap_id],
    queryFn: () => getLikeCount({ cap_id }),
    retry: 0,
    refetchOnWindowFocus: false
  })

  const { data: dislikeCount } = useQuery({
    queryKey: ['dislikeCount', cap_id],
    queryFn: () => getDislikeCount({ cap_id }),
    retry: 0,
    refetchOnWindowFocus: false
  })

  const { data: commentCount } = useQuery({
    queryKey: ['commentCount', cap_id],
    queryFn: () => getCommentCount({ cap_id }),
    retry: 0,
    refetchOnWindowFocus: false
  })

  const { currentUser } = useAuth()

  const likeHandler = (e) => {
    e.stopPropagation()
    addReaction({ cap_id, user_id: currentUser?.id, reaction: true })
  }
  const dislikeHandler = (e) => {
    e.stopPropagation()
    addReaction({ cap_id, user_id: currentUser?.id, reaction: false })
  }
  const deleteCapHandler = (e) => {
    e.stopPropagation()
    deleteCap({ cap_id })
  }

  const [deleting, setDeleting] = useState(false)
  const startDeleting = (e) => {
    e.stopPropagation()
    setDeleting(true)
  }
  const stopDeleting = (e) => {
    e.stopPropagation()
    setDeleting(false)
  }

  return (
    <>
      <ul className="relative flex items-center">
        <li className="flex items-center">
          <button onClick={likeHandler}>
            <img src="/like.svg" alt="Like" className="w-8 h-8 p-2" />
          </button>
          {likeCount > 0 && (
            <span className="mr-2 text-sm text-zinc-500">{likeCount}</span>
          )}
        </li>
        <li className="flex items-center">
          <button onClick={dislikeHandler}>
            <img src="/dislike.svg" alt="Dislike" className="w-8 h-8 p-2" />
          </button>
          {dislikeCount > 0 && (
            <span className="mr-2 text-sm text-zinc-500">{dislikeCount}</span>
          )}
        </li>
        <li className="flex items-center">
          <button>
            <img src="/comment.svg" alt="Comment" className="p-2 w-9 h-9" />
          </button>
          {commentCount > 0 && (
            <span className="mr-2 text-sm text-zinc-500">{commentCount}</span>
          )}
        </li>
        <li className="flex items-center">
          <button>
            <img src="/save.svg" alt="Save" className="p-2 w-9 h-9" />
          </button>
        </li>
        {currentUser?.id === user_id && (
          <li className="flex items-center">
            <button onClick={startDeleting}>
              <img src="/delete.svg" alt="Delete" className="p-2 w-9 h-9" />
            </button>
          </li>
        )}
      </ul>

      {deleting && (
        <Modal onCancel={stopDeleting} onConfirm={deleteCapHandler}>
          <h1 className="mb-5 text-xl">
            Are you sure you want to delete this cap?
          </h1>
          <p className="text-lg">
            This cap will be
            <span className=" text-purple-500"> permanently </span>
            deleted
          </p>
          <p className="mt-3 ml-3 font-bold md:mt-5">" {cap.text} "</p>
        </Modal>
      )}
    </>
  )
}
