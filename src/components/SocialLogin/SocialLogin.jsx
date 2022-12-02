import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'

export default function SocialLogin() {
  const { signInGoogle, signInGithub } = useAuth()

  const {
    isLoading: isGoogleLoading,
    error: isGoogleError,
    mutate: signInGoogleHandler
  } = useMutation({
    mutationKey: ['signInGoogle'],
    mutationFn: signInGoogle
  })

  const {
    isLoading: isGithubLoading,
    error: isGithubError,
    mutate: signInGithubHandler
  } = useMutation({
    mutationKey: ['signInGithub'],
    mutationFn: signInGithub
  })

  const isLoading = isGithubLoading || isGoogleLoading
  const error = isGithubError?.message || isGoogleError?.message

  return (
    <div className="flex flex-col items-center gap-2 mt-3">
      <button
        type="button"
        onClick={signInGoogleHandler}
        disabled={isLoading}
        className="flex gap-3 px-3 py-2 bg-white border rounded-md shadow-md text-zinc-900">
        <img src="/google.svg" alt="Google Logo" className="w-6"></img>Sign in
        with Google
      </button>
      <button
        type="button"
        onClick={signInGithubHandler}
        disabled={isLoading}
        className="flex gap-3 px-3 py-2 border rounded-md shadow-md bg-zinc-900 border-zinc-900">
        <img src="/github.svg" alt="Github Logo" className="w-6"></img>Sign in
        with GitHub
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
