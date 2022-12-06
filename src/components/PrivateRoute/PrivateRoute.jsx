import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  const { getProfile } = useDb()

  if (!currentUser) return <Navigate to="/signin" />

  const id = currentUser.id

  const { isLoading: profileLoading, data: profile } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile({ user_id: id })
  })

  if (profileLoading) return

  if (!profile?.username) return <Navigate to="/complete-your-account" />

  return children
}
