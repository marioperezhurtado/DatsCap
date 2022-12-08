export default function WriteComment() {
  return (
    <form className="flex gap-1">
      <input
        type="text"
        name="comment"
        placeholder="Add a comment..."
        className="flex-grow px-3 py-1 border rounded-md border-zinc-600 "
      />
      <button className="px-4 text-sm border rounded-md border-zinc-600 bg-neutral-800">
        Comment
      </button>
    </form>
  )
}
