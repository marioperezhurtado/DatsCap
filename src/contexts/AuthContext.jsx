import { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'

import supabase from '../supabase'

const AuthContext = createContext()

export default useAuth = useContext(AuthContext)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)

  const signUp = ({ email, password }) => {
    return supabase.auth.signUp({ email, password })
  }

  const signIn = ({ email, password }) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = () => {
    return supabase.auth.signOut()
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const authValues = {
    session,
    signUp,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  )
}
