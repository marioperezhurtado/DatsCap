import { useQuery } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function CapActions({ cap_id }) {
  const { getLikes, getDislikes, addReaction } = useDb()

  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', cap_id],
    queryFn: () => getLikes({ cap_id: cap_id }),
    retry: 0,
    refetchOnWindowFocus: false
  })

  const { data: dislikeCount } = useQuery({
    queryKey: ['dislikeCount', cap_id],
    queryFn: () => getDislikes({ cap_id: cap_id }),
    retry: 0,
    refetchOnWindowFocus: false
  })

  const { currentUser } = useAuth()

  const likeHandler = () => {
    addReaction({ cap_id, user_id: currentUser?.id, reaction: true })
  }
  const dislikeHandler = () => {
    addReaction({ cap_id, user_id: currentUser?.id, reaction: false })
  }

  return (
    <>
      <ul className="relative flex items-center gap-2">
        <li className="flex items-center group">
          <button onClick={likeHandler}>
            <img src="/like.svg" alt="Like" className="w-8 h-8 p-2" />
          </button>
          <span className="text-sm text-zinc-500">
            {likeCount > 0 && likeCount}
          </span>
        </li>
        <li className="flex items-center group">
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
