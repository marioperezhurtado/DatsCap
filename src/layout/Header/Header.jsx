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
      className="flex items-center justify-between px-32 py-6 border-b bg-neutral-800 border-zinc-600 text-slate-200
      shadow-md">
      <h1 className="text-2xl font-semibold">
        Dats<span className="text-yellow-500">Cap</span>
      </h1>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-2 py-1 text-sm border rounded-md border-zinc-600 shadow-md">
          @mario123
          <img src="secure.svg" alt="manage account" className="w-3 h-3" />
        </button>
        <button
          onClick={signOutHandler}
          disabled={isLoading}
          className="flex items-center gap-2 px-2 py-1 text-sm border rounded-md border-zinc-600 shadow-md">
          Logout
          <img src="logout.svg" alt="logout" className="w-3 h-3" />
        </button>
      </div>
    </header>
  )
}
