export default function App() {
  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-300">
      <header className="flex items-center justify-between px-32 py-6 mb-8 border-b border-zinc-600">
        <h1 className="text-2xl font-semibold">
          Dats<span className="text-yellow-500">Cap</span>
        </h1>
        <button className="px-2 py-1 text-sm border rounded-md border-zinc-600">
          Sign in
        </button>
      </header>
      <ul className="flex items-center gap-3 mx-auto w-min">
        <li className="px-2 border rounded-md border-zinc-600">Latest</li>
        <li className="px-2 border rounded-md border-zinc-600">Trending</li>
        <li className="px-2 border rounded-md border-zinc-600">Top</li>
        <li className="px-2 border rounded-md border-zinc-600">Favorites</li>
        <li className="px-2 border rounded-md border-zinc-600">Categories</li>
      </ul>
    </div>
  )
}
