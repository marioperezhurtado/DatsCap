import { createContext, useContext } from 'react'

import { supabase } from '../supabase'

const DbContext = createContext()

const useDb = () => useContext(DbContext)

export function DbProvider({ children }) {
  const getCaps = async () => {
    const { data, error } = await supabase
      .from('caps')
      .select('created_at,text,id')

    if (error) throw Error('No notes could be found')

    return data
  }

  const writeCap = async ({ text, user_id }) => {
    const { error } = await supabase.from('caps').insert({
      text,
      user_id
    })

    if (error) throw Error('Failed to write cap')
  }

  const dbValues = {
    getCaps,
    writeCap
  }

  return <DbContext.Provider value={dbValues}>{children}</DbContext.Provider>
}

export default useDb
