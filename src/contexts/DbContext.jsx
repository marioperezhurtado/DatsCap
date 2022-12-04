import { createContext, useContext } from 'react'

import { supabase } from '../supabase'

const DbContext = createContext()

const useDb = () => useContext(DbContext)

export function DbProvider({ children }) {
  const getLatestCaps = async () => {
    const { data, error } = await supabase
      .from('caps')
      .select()
      .order('created_at', { ascending: false })

    if (error) throw Error('No caps could be found')

    return data
  }

  const writeCap = async ({ text, user_id }) => {
    const { error } = await supabase.from('caps').insert({
      text,
      user_id
    })

    if (error) throw Error('Failed to write cap')
  }

  const getProfile = async ({ user_id }) => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', user_id)
      .limit(1)
      .single()

    if (error) throw Error('Failed to get profile')

    return data
  }

  const dbValues = {
    getLatestCaps,
    writeCap,
    getProfile
  }

  return <DbContext.Provider value={dbValues}>{children}</DbContext.Provider>
}

export default useDb
