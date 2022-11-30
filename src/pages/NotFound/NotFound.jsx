export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 pt-20">
      <h1 className="text-3xl font-bold">Oops! This page does not exist</h1>
      <button className="border rounded-md border-zinc-600">
        Back to Home
      </button>
    </div>
  )
}
