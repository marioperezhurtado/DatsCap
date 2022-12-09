export default function Modal({ children, onCancel, onConfirm }) {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen min-h-screen bg-black bg-opacity-50 text-center z-10"
        onClick={onCancel}></div>
      <div className="fixed z-10 w-11/12 max-w-lg top-20 left-1/2 -translate-x-1/2 bg-zinc-800 rounded-md px-8 py-6 border border-zinc-600 shadow-md hover:shadow-xl">
        {children}
        <div className="flex gap-2 mt-8 w-fit ml-auto">
          <button
            onClick={onCancel}
            className="border px-2 py-1 rounded-md border-zinc-600 hover:bg-slate-500 transition">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="border px-2 py-1 rounded-md border-zinc-600 bg-slate-500 transition hover:bg-slate-600">
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}
