export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-3 mx-auto mt-6 w-min">
        <li className="px-2 border rounded-md shadow-md bg-zinc-700 border-zinc-500">
          Latest
        </li>
        <li className="px-2 border rounded-md shadow-md bg-zinc-700 border-zinc-500">
          Trending
        </li>
        <li className="px-2 border rounded-md shadow-md bg-zinc-700 border-zinc-500">
          Top
        </li>
        <li className="px-2 border rounded-md shadow-md bg-zinc-700 border-zinc-500">
          Favorites
        </li>
        <li className="px-2 border rounded-md shadow-md bg-zinc-700 border-zinc-500">
          Categories
        </li>
      </ul>
    </nav>
  )
}
