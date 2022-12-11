import { useState } from 'react'

import CommentItem from '../CommentItem/CommentItem'

export default function Replies({ replies, comments }) {
  const [showReplies, setShowReplies] = useState(false)

  const toggleReplies = () => setShowReplies((s) => !s)

  if (!showReplies && replies.length > 0) {
    return (
      <button
        onClick={toggleReplies}
        className="block rounded-md mt-2 border border-zinc-600 px-2 py-1 w-fit ml-auto text-sm bg-neutral-800 shadow-md hover:shadow-xl hover:bg-neutral-700 transition">
        Show replies
      </button>
    )
  }

  return (
    <ul className="pl-3 ml-auto mt-3">
      {replies.map((r) => (
        <li key={r.id}>
          <CommentItem comment={r} comments={comments} />
        </li>
      ))}
    </ul>
  )
}
