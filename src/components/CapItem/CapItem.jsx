export default function CapItem({ cap }) {
  const initialDate = new Date(Date.parse(cap.created_at))
  const date = initialDate.toLocaleDateString()
  const time = initialDate.toLocaleTimeString(navigator.language, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })

  const today = new Date(Date.now()).toLocaleDateString()

  const displayDate = today === date ? '' : date

  return (
    <div className="w-fit mx-auto border px-6 py-5 border-zinc-600 rounded-md shadow-md">
      <p className="mb-3">{cap.text}</p>
      <span className="block text-right text-sm">
        {displayDate} {time}
      </span>
    </div>
  )
}
