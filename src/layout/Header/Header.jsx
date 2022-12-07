import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function Header() {
  const navigate = useNavigate()
  const { currentUser, signOut } = useAuth()
  const { getProfile } = useDb()

  const id = currentUser.id

  const { data: profile } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile({ user_id: id })
  })

  const username = (profile?.username && `@${profile?.username}`) || 'Account'

  const { isLoading, mutate: logOut } = useMutation({ mutationFn: signOut })

  return (
    <header className="flex items-center justify-between px-10 py-6 border-b shadow-md bg-zinc-800 border-zinc-600 text-slate-200 md:px-32">
      <Link to="/">
        <h1 className="text-2xl font-semibold">
          Dats<span className="text-purple-500">Cap</span>
        </h1>
      </Link>
      <div className="flex gap-3">
        <Link to="/account">
          <button className="flex items-center gap-2 px-2 py-2 text-sm border rounded-md shadow-md border-zinc-600 hover:shadow-lg">
            <span className="hidden sm:block">{username}</span>
            <img src="account.svg" alt="Manage account" className="w-4 h-4" />
          </button>
        </Link>
        <button
          onClick={logOut}
          disabled={isLoading}
          className="flex items-center gap-2 px-2 py-2 text-sm border rounded-md shadow-md border-zinc-600 hover:shadow-lg">
          <span className="hidden sm:block">Logout</span>
          <img src="logout.svg" alt="Logout" className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
