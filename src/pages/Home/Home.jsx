import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'

import Header from '../../layout/Header/Header'
import Navbar from '../../layout/Navbar/Navbar'
import Loader from '../../layout/Loader/Loader'
import CapList from '../../components/CapList/CapList'
import WriteCap from '../../components/WriteCap/WriteCap'

export default function Home() {
  const { getLatestCaps, capsListener } = useDb()

  const {
    isLoading,
    error,
    data: caps,
    refetch
  } = useQuery({
    queryKey: ['latestCaps'],
    queryFn: getLatestCaps
  })

  useEffect(() => {
    // Subscribe to realtime caps updates
    const capsSubscription = capsListener(refetch)
    return () => capsSubscription.unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <>
        <Header />
        <Navbar />
        <Loader />
        <WriteCap />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <Navbar />
        <p className="mt-10 text-center text-red-400">
          Oops! Something went wrong...
        </p>
        <WriteCap />
      </>
    )
  }

  return (
    <>
      <Header />
      <Navbar />
      <CapList caps={caps} />
      <WriteCap />
    </>
  )
}
