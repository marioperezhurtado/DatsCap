import Header from '../../layout/Header/Header'

export default function Home() {
  return (
    <>
      <Header />
      <ul className="flex items-center gap-3 mx-auto mt-6 w-min">
        <li className="px-2 border rounded-md border-zinc-600">Latest</li>
        <li className="px-2 border rounded-md border-zinc-600">Trending</li>
        <li className="px-2 border rounded-md border-zinc-600">Top</li>
        <li className="px-2 border rounded-md border-zinc-600">Favorites</li>
        <li className="px-2 border rounded-md border-zinc-600">Categories</li>
      </ul>
    </>
  )
}
