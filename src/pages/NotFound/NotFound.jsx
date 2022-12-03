import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 pt-20">
      <h1 className="text-3xl font-bold text-center">
        <span className="text-purple-500">Oops!</span> This page does not exist
      </h1>
      <Link
        to="/"
        className="px-2 py-1 transition-all border rounded-md hover:bg-slate-500 border-zinc-600">
        Back to Home
      </Link>
    </div>
  )
}
