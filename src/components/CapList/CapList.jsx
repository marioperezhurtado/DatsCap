import CapItem from '../CapItem/CapItem'

export default function CapList({ caps }) {
  if (!caps || !caps.length)
    return <p className="mt-10 text-center">No caps found</p>

  const capItems = caps.map((c) => (
    <li key={c.id}>
      <CapItem cap={c} />
    </li>
  ))

  return (
    <div className="px-2">
      <ul className="flex flex-col max-w-xl gap-3 md:gap-5 w-full mx-auto mt-5 md:mt-10">
        {capItems}
      </ul>
    </div>
  )
}
