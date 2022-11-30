import useAuth from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const { session } = useAuth()

  if (!session) return <Navigate to="/signin" />

  return children
}
