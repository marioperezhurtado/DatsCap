import { createContext, useContext } from 'react'

import { supabase } from '../supabase'

const DbContext = createContext()

const useDb = () => useContext(DbContext)

export function DbProvider({ children }) {
  const getCap = async ({ id }) => {
    const { data, error } = await supabase
      .from('caps')
      .select()
      .eq('id', id)
      .limit(1)
      .single()
    if (error) throw Error('The requested note could not be found')
    return data
  }

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

  const deleteCap = async ({ cap_id }) => {
    const { error } = await supabase.from('caps').delete().eq('id', cap_id)

    if (error) throw Error('Failed to delete cap')
  }

  const getComments = async ({ id }) => {
    const { data, error } = await supabase
      .from('comments')
      .select()
      .eq('cap_id', id)
      .order('created_at', { ascending: false })

    if (error) throw Error('No comments could be found')
    return data
  }

  const addComment = async ({ cap_id, user_id, text }) => {
    const { error } = await supabase.from('comments').insert({
      cap_id,
      user_id,
      text
    })

    if (error) throw Error('Failed to add comment')
  }

  const deleteComment = async ({ comment_id }) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', comment_id)

    if (error) throw Error('Failed to delete comment')
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

  const updateProfile = async ({ id, username, full_name }) => {
    const { error } = await supabase
      .from('profiles')
      .update({ username, full_name })
      .eq('id', id)

    if (error) throw Error('Failed to update profile')
  }

  const addReaction = async ({ cap_id, user_id, reaction }) => {
    const { error } = await supabase.from('reactions').upsert({
      cap_id,
      user_id,
      reaction
    })
    if (error) throw Error('Failed to add reaction')
  }

  const getLikeCount = async ({ cap_id }) => {
    const { count, error } = await supabase
      .from('reactions')
      .select('*', { count: 'exact', head: true })
      .match({ cap_id, reaction: true })

    if (error) throw Error('Failed to get like count')
    return count
  }

  const getDislikeCount = async ({ cap_id }) => {
    const { count, error } = await supabase
      .from('reactions')
      .select('*', { count: 'exact', head: true })
      .match({ cap_id, reaction: false })

    if (error) throw Error('Failed to get dislike count')
    return count
  }

  const getCommentCount = async ({ cap_id }) => {
    const { count, error } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('cap_id', cap_id)

    if (error) throw Error('Failed to get comment count')
    return count
  }

  const capsListener = (callback) => {
    return supabase
      .channel('public:caps')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'caps' },
        callback
      )
      .subscribe()
  }

  const commentsListener = ({ cap_id, callback }) => {
    return supabase
      .channel(`public:comments:cap_id=eq.${cap_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `cap_id=eq.${cap_id}`
        },
        callback
      )
      .subscribe()
  }

  const dbValues = {
    getCap,
    getLatestCaps,
    writeCap,
    deleteCap,
    getComments,
    addComment,
    deleteComment,
    getProfile,
    updateProfile,
    addReaction,
    getLikeCount,
    getDislikeCount,
    getCommentCount,
    capsListener,
    commentsListener
  }

  return <DbContext.Provider value={dbValues}>{children}</DbContext.Provider>
}

export default useDb
