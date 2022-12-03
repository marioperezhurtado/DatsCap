import useTimestamp from '../../hooks/useTimestamp'

export default function CapItem({ cap }) {
  const dateTime = useTimestamp(cap?.created_at)

  return (
    <div className="px-6 py-5 mx-auto border rounded-md shadow-md border-zinc-600 bg-zinc-800">
      <p className="mb-3 text-xl">{cap.text}</p>
      <span className="block text-sm text-right">{dateTime}</span>
    </div>
  )
}
