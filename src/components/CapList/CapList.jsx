import CapItem from '../CapItem/CapItem'

export default function CapList({ caps }) {
  if (!caps || !caps.length)
    return <p className="text-center mt-10">No caps found</p>

  const capItems = caps.map((c) => (
    <li key={c.id}>
      <CapItem cap={c} />
    </li>
  ))

  return (
    <ul className="mt-10 max-w-xl mx-auto flex flex-col gap-5">{capItems}</ul>
  )
}
