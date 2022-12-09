import CommentItem from '../CommentItem/CommentItem'
import WriteComment from '../WriteComment/WriteComment'

export default function CommentList({ comments }) {
  if (!comments || !comments.length)
    return (
      <ul className="px-6 py-4 mt-10 border rounded-md shadow-md bg-zinc-800 border-zinc-600 hover:shadow-xl">
        <h2 className="mb-5 text-lg">
          There are <span className="text-purple-500">no comments</span> yet...
        </h2>
        <p className="mb-4">Be the first to share what you think!</p>
        <WriteComment />
      </ul>
    )

  const commentCount = comments.length

  const commentItems = comments.map((c) => (
    <li key={c.id}>
      <CommentItem comment={c} />
    </li>
  ))

  return (
    <ul className="flex flex-col gap-3 px-6 py-4 mt-10 border rounded-md shadow-md bg-zinc-800 border-zinc-600 hover:shadow-xl">
      <h2 className="mb-2 text-xl">
        Comments : <span className="ml-1 text-purple-500">{commentCount}</span>
      </h2>
      <WriteComment />
      {commentItems}
    </ul>
  )
}
