import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'

import Header from '../../layout/Header/Header'
import Navbar from '../../layout/Navbar/Navbar'
import Loader from '../../layout/Loader/Loader'
import CapList from '../../components/CapList/CapList'
import WriteCap from '../../components/WriteCap/WriteCap'

export default function Home() {
  const { getLatestCaps } = useDb()

  const {
    isLoading,
    error,
    data: caps
  } = useQuery({
    queryKey: ['latestCaps'],
    queryFn: getLatestCaps
  })

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
        <p className="mt-10 text-center text-red-500">
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
