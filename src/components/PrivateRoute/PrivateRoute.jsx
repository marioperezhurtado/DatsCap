import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, Navigate } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

export default function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const { currentUser, signOut } = useAuth()
  const { getProfile } = useDb()

  const id = currentUser?.id

  const {
    isLoading: profileLoading,
    error: profileError,
    data: profile
  } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile({ user_id: id }),
    retry: false
  })

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin')
    }
  }, [currentUser])

  useEffect(() => {
    if (profileError) {
      signOut()
    }
  }, [profileError])

  if (profileLoading) return

  if (!profile?.username) return <Navigate to="/complete-your-account" />

  return children
}
