import { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'

import { supabase } from '../supabase'

const DbContext = createContext()

const useDb = () => useContext(DbContext)

export function DbProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const dbValues = {}

  return (
    <DbContext.Provider value={dbValues}>
      {!loading && children}
    </DbContext.Provider>
  )
}

export default useDb
