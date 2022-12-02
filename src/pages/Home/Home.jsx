import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'

import Header from '../../layout/Header/Header'
import Navbar from '../../layout/Navbar/Navbar'
import Loader from '../../layout/Loader/Loader'
import CapList from '../../components/CapList/CapList'

export default function Home() {
  const { getCaps } = useDb()

  const {
    isLoading,
    error,
    data: caps
  } = useQuery({
    queryKey: ['allCaps'],
    queryFn: getCaps
  })

  if (isLoading) {
    return (
      <>
        <Header />
        <Navbar />
        <Loader />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <Navbar />
        <p className="text-red-500 mt-10 text-center">
          Oops! Something went wrong...
        </p>
      </>
    )
  }
  return (
    <>
      <Header />
      <Navbar />
      <CapList caps={caps} />
    </>
  )
}
