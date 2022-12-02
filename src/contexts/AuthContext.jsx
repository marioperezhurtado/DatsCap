import { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'

import { supabase } from '../supabase'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const signUp = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw Error('Failed to create account')
  }

  const signIn = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw Error('Failed to sign in')
  }

  const signInGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) throw Error('Failed to sign in with GitHub')
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw Error('Failed to sign out')
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const authValues = {
    session,
    signUp,
    signIn,
    signInGithub,
    signOut
  }

  return (
    <AuthContext.Provider value={authValues}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default useAuth
