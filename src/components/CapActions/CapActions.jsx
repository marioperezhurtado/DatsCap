import { useQuery } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function CapActions({ cap_id }) {
  const { getLikeCount, getDislikeCount, addReaction, getCommentCount } =
    useDb()

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

  return (
    <>
      <ul className="relative flex items-center gap-2">
        <li className="flex items-center">
          <button onClick={likeHandler}>
            <img src="/like.svg" alt="Like" className="w-8 h-8 p-2" />
          </button>
          <span className="text-sm text-zinc-500">
            {likeCount > 0 && likeCount}
          </span>
        </li>
        <li className="flex items-center">
          <button onClick={dislikeHandler}>
            <img src="/dislike.svg" alt="Dislike" className="w-8 h-8 p-2" />
          </button>
          <span className="text-sm text-zinc-500">
            {dislikeCount > 0 && dislikeCount}
          </span>
        </li>
        <li className="flex items-center">
          <button>
            <img src="/comment.svg" alt="Comment" className="p-2 w-9 h-9" />
          </button>
          <span className="text-sm text-zinc-500">
            {commentCount > 0 && commentCount}
          </span>
        </li>
        <li className="flex items-center">
          <button>
            <img src="/save.svg" alt="Save" className="p-2 w-9 h-9" />
          </button>
        </li>
      </ul>
    </>
  )
}
