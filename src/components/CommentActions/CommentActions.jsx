import useAuth from '../../contexts/AuthContext'

export default function CommentActions({ comment }) {
  const { currentUser } = useAuth()

  return (
    <ul className="flex">
      <li>
        <button>
          <img src="/reply.svg" alt="Reply" className="p-2 w-9 h-9" />
        </button>
      </li>
      {currentUser?.id === comment.user_id && (
        <li>
          <button>
            <img src="/delete.svg" alt="Delete" className="p-2 w-9 h-9" />
          </button>
        </li>
      )}
    </ul>
  )
}
