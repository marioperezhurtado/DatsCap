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

  const dbValues = {
    getCaps
  }

  return <DbContext.Provider value={dbValues}>{children}</DbContext.Provider>
}

export default useDb
