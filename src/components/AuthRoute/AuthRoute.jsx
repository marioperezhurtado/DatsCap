import useAuth from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth()

  if (currentUser) return <Navigate to="/" />

  return children
}
