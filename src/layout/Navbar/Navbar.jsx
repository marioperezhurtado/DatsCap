export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-3 mx-auto mt-6 w-min">
        <li className="px-2 border rounded-md border-zinc-600 shadow-md">
          Latest
        </li>
        <li className="px-2 border rounded-md border-zinc-600 shadow-md">
          Trending
        </li>
        <li className="px-2 border rounded-md border-zinc-600 shadow-md">
          Top
        </li>
        <li className="px-2 border rounded-md border-zinc-600 shadow-md">
          Favorites
        </li>
        <li className="px-2 border rounded-md border-zinc-600 shadow-md">
          Categories
        </li>
      </ul>
    </nav>
  )
}
