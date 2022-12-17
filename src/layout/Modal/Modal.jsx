import { createPortal } from 'react-dom'

export default function Modal({ children, onCancel, onConfirm }) {
  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 z-10 w-screen min-h-screen text-center bg-black bg-opacity-60"
        onClick={onCancel}></div>
      <div className="fixed z-10 w-11/12 max-w-lg p-4 -translate-x-1/2 border rounded-md shadow-md top-20 left-1/2 bg-zinc-800 md:px-8 md:py-6 border-zinc-600 hover:shadow-xl text-slate-300">
        {children}
        <div className="flex gap-2 mt-4 ml-auto md:mt-8 w-fit ">
          <button
            onClick={onCancel}
            className="px-2 py-1 transition border rounded-md border-zinc-600 hover:bg-slate-500 bg-neutral-800">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-2 py-1 transition border rounded-md border-zinc-600 bg-slate-500 hover:bg-slate-600">
            Confirm
          </button>
        </div>
      </div>
    </>,
    document.getElementById('root')
  )
}
