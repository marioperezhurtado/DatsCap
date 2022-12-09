import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useDb from '../../contexts/DbContext'

import Header from '../../layout/Header/Header'
import Navbar from '../../layout/Navbar/Navbar'
import CapItem from '../../components/CapItem/CapItem'
import CommentList from '../../components/CommentList/CommentList'
import Loader from '../../layout/Loader/Loader'

export default function Cap() {
  const { id } = useParams()

  const { getCap, getComments, commentsListener } = useDb()

  const {
    data: cap,
    isLoading: capLoading,
    error: capError
  } = useQuery({
    queryKey: ['cap', id],
    queryFn: () => getCap({ id }),
    retry: 2,
    refetchOnWindowFocus: false
  })

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    refetch
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments({ id }),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    // Subscribe to realtime comments updates (on this cap only)
    const commentsSubscription = commentsListener({
      cap_id: id,
      callback: refetch
    })
    return () => commentsSubscription.unsubscribe()
  }, [])

  if (capLoading)
    return (
      <>
        <Header />
        <Navbar />
        <Loader />
      </>
    )

  if (capError) return <Navigate to="/page-not-found" />

  if (commentsLoading)
    return (
      <>
        <Header />
        <Navbar />
        <div className="px-2 mt-10 ">
          <div className="max-w-xl mx-auto">
            <CapItem cap={cap} />
            <Loader />
          </div>
        </div>
      </>
    )

  if (commentsError)
    return (
      <>
        <Header />
        <Navbar />
        <div className="px-2 mt-10">
          <div className="max-w-xl mx-auto">
            <CapItem cap={cap} />
          </div>
        </div>
      </>
    )

  return (
    <>
      <Header />
      <Navbar />
      <div className="px-2 mt-10 ">
        <div className="max-w-xl mx-auto">
          <CapItem cap={cap} />
          <CommentList comments={comments} />
        </div>
      </div>
    </>
  )
}
