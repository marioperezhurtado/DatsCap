import CapItem from '../CapItem/CapItem'

export default function CapList({ caps }) {
  if (!caps || !caps.length) return <p>No caps found</p>

  const capItems = caps.map((c) => (
    <li key={c.id}>
      <CapItem cap={c} />
    </li>
  ))

  return <ul className="mt-10 flex flex-col gap-5">{capItems}</ul>
}
