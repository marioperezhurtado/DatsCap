import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'

export default function Header() {
  const { signOut } = useAuth()

  const {
    isLoading,
    error: signOutError,
    mutate
  } = useMutation({ mutationFn: signOut })

  const signOutHandler = () => mutate()

  return (
    <header
      className="flex items-center justify-between px-32 py-6 border-b shadow-md bg-neutral-800 border-zinc-600 text-slate-200">
      <h1 className="text-2xl font-semibold">
        Dats<span className="text-purple-500">Cap</span>
      </h1>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-2 py-1 text-sm border rounded-md shadow-md border-zinc-600">
          @mario123
          <img src="private.svg" alt="manage account" className="w-4 h-4" />
        </button>
        <button
          onClick={signOutHandler}
          disabled={isLoading}
          className="flex items-center gap-2 px-2 py-1 text-sm border rounded-md shadow-md border-zinc-600">
          Logout
          <img src="logout.svg" alt="logout" className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
