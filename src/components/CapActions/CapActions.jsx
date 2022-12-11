import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import Modal from '../../layout/Modal/Modal'
import LikeIcon from '../../assets/LikeIcon'
import DislikeIcon from '../../assets/DislikeIcon'
import CommentIcon from '../../assets/CommentIcon'
import SaveIcon from '../../assets/SaveIcon'
import DeleteIcon from '../../assets/DeleteIcon'

export default function CapActions({ cap }) {
  const {
    getLikeCount,
    getDislikeCount,
    getCommentCount,
    getUserReaction,
    addReaction,
    deleteReaction,
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

  const { data: userReaction } = useQuery({
    queryKey: ['userReaction', cap_id, currentUser?.id],
    queryFn: () => getUserReaction({ cap_id, user_id: currentUser?.id }),
    retry: 0,
    refetchOnWindowFocus: false
  })

  const [reaction, setReaction] = useState(null)

  useEffect(() => {
    setReaction(userReaction)
  }, [userReaction])

  const queryClient = useQueryClient()

  const { mutate: like } = useMutation({
    mutationFn: () =>
      addReaction({ cap_id, user_id: currentUser?.id, reaction: true }),
    onSuccess: () => {
      setReaction(true)
      queryClient.setQueryData(['likeCount', cap_id], (likes) => likes + 1)
      if (reaction === false) {
        queryClient.setQueryData(
          ['dislikeCount', cap_id],
          (dislikes) => dislikes - 1
        )
      }
    }
  })

  const { mutate: dislike } = useMutation({
    mutationFn: () =>
      addReaction({ cap_id, user_id: currentUser?.id, reaction: false }),
    onSuccess: () => {
      setReaction(false)
      queryClient.setQueryData(
        ['dislikeCount', cap_id],
        (dislikes) => dislikes + 1
      )
      if (reaction === true) {
        queryClient.setQueryData(['likeCount', cap_id], (likes) => likes - 1)
      }
    }
  })

  const { mutate: removeReaction } = useMutation({
    mutationFn: () => deleteReaction({ cap_id, user_id: currentUser?.id }),
    onSuccess: () => {
      setReaction(null)
      if (reaction === true) {
        queryClient.setQueryData(['likeCount', cap_id], (likes) => likes - 1)
      }
      if (reaction === false) {
        queryClient.setQueryData(
          ['dislikeCount', cap_id],
          (dislikes) => dislikes - 1
        )
      }
    }
  })

  const likeHandler = (e) => {
    e.stopPropagation()

    if (reaction === true) {
      removeReaction()
      return
    }
    like()
  }

  const dislikeHandler = (e) => {
    e.stopPropagation()

    if (reaction === false) {
      removeReaction()
      return
    }
    dislike()
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
  const deleteCapHandler = (e) => {
    e.stopPropagation()
    deleteCap({ cap_id })
  }

  const likeActiveClass =
    reaction === true ? 'fill-purple-500' : 'fill-zinc-500'
  const dislikeActiveClass =
    reaction === false ? 'fill-purple-500' : 'fill-zinc-500'

  return (
    <>
      <ul className="relative flex items-center">
        <li className="flex items-center">
          <button
            onClick={likeHandler}
            className={`p-2 md:hover:fill-purple-500 ${likeActiveClass}`}>
            <LikeIcon />
          </button>
          {likeCount > 0 && (
            <span className="mr-2 text-sm text-zinc-500">{likeCount}</span>
          )}
        </li>
        <li className="flex items-center fill-red-500">
          <button
            onClick={dislikeHandler}
            className={`p-2 md:hover:fill-purple-500 ${dislikeActiveClass}`}>
            <DislikeIcon />
          </button>
          {dislikeCount > 0 && (
            <span className="mr-2 text-sm text-zinc-500">{dislikeCount}</span>
          )}
        </li>
        <li className="flex items-center">
          <button className="p-2 fill-zinc-500 hover:fill-purple-500">
            <CommentIcon />
          </button>
          {commentCount > 0 && (
            <span className="mr-2 text-sm text-zinc-500">{commentCount}</span>
          )}
        </li>
        <li className="flex items-center">
          <button className="p-2 fill-zinc-500 hover:fill-purple-500">
            <SaveIcon />
          </button>
        </li>
        {currentUser?.id === user_id && (
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
