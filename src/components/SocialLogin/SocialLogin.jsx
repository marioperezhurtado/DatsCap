import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'

export default function SocialLogin() {
  const { signInGithub } = useAuth()

  const {
    isLoading,
    error,
    mutate: signInGithubHandler
  } = useMutation({
    mutationKey: ['signInGithub'],
    mutationFn: signInGithub
  })

  return (
    <div className="flex flex-col items-center gap-1 mt-3">
      <button
        type="button"
        onClick={signInGithubHandler}
        disabled={isLoading}
        className="flex gap-3 px-3 py-2 border rounded-md bg-zinc-900 border-zinc-900">
        <img src="/github.svg" alt="Github Logo" className="w-6"></img>Sign in
        with GitHub
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
