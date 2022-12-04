export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-3 mx-auto mt-6 w-min">
        <li className="px-2 border rounded-md shadow-md cursor-pointer bg-zinc-700 border-zinc-500 hover:shadow-lg">
          Home
        </li>
        <li className="px-2 border rounded-md shadow-md cursor-pointer bg-zinc-700 border-zinc-500 hover:shadow-lg">
          Trending
        </li>
        <li className="px-2 border rounded-md shadow-md cursor-pointer bg-zinc-700 border-zinc-500 hover:shadow-lg">
          Favorites
        </li>
        <li className="px-2 border rounded-md shadow-md cursor-pointer bg-zinc-700 border-zinc-500 hover:shadow-lg">
          Categories
        </li>
      </ul>
    </nav>
  )
}
