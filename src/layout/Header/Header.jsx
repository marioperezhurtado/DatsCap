export default function Header() {
  return (
    <header className="flex items-center justify-between px-32 py-6 border-b bg-neutral-800 border-zinc-600 text-slate-200">
      <h1 className="text-2xl font-semibold">
        Dats<span className="text-yellow-500">Cap</span>
      </h1>
      <button className="px-2 py-1 text-sm border rounded-md border-zinc-600">
        @mario123
      </button>
    </header>
  )
}
