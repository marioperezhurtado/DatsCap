import { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'

import { supabase } from '../supabase'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signUp = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) throw Error('Failed to create account')
  }

  const signIn = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw Error('Failed to sign in')
  }

  const signInGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) throw Error('Failed to sign in with GitHub')
  }

  const signInGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) throw Error('Failed to sign in with Google')
  }

  const signInDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord'
    })
    if (error) throw Error('Failed to sign in with Discord')
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw Error('Failed to sign out')
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user)
      setLoading(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const authValues = {
    currentUser,
    signUp,
    signIn,
    signInGoogle,
    signInGithub,
    signInDiscord,
    signOut
  }

  return (
    <AuthContext.Provider value={authValues}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default useAuth
