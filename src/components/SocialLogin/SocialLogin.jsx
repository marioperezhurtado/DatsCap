import { useMutation } from '@tanstack/react-query'
import useAuth from '../../contexts/AuthContext'

export default function SocialLogin() {
  const { signInGoogle, signInGithub, signInDiscord } = useAuth()

  const {
    isLoading: isGoogleLoading,
    error: googleError,
    mutate: signInGoogleHandler
  } = useMutation({
    mutationKey: ['signInGoogle'],
    mutationFn: signInGoogle
  })

  const {
    isLoading: isGithubLoading,
    error: githubError,
    mutate: signInGithubHandler
  } = useMutation({
    mutationKey: ['signInGithub'],
    mutationFn: signInGithub
  })

  const {
    isLoading: isDiscordLoading,
    error: discordError,
    mutate: signInDiscordHandler
  } = useMutation({
    mutationKey: ['signInDiscord'],
    mutationFn: signInDiscord
  })

  const isLoading = isGithubLoading || isGoogleLoading || isDiscordLoading
  const error =
    googleError?.message || githubError?.message || discordError?.message

  return (
    <div className="flex flex-col items-center gap-2 mt-3">
      <button
        type="button"
        onClick={signInGoogleHandler}
        disabled={isLoading}
        className="flex items-center gap-3 px-3 py-2 bg-white border rounded-md shadow-md w-60 text-zinc-900">
        <img src="/google.svg" alt="Google Logo" className="w-5"></img>Sign in
        with Google
      </button>
      <button
        type="button"
        onClick={signInGithubHandler}
        disabled={isLoading}
        className="flex items-center gap-3 px-3 py-2 border rounded-md shadow-md w-60 bg-zinc-900 border-zinc-900">
        <img src="/github.svg" alt="Github Logo" className="w-5"></img>Sign in
        with GitHub
      </button>
      <button
        type="button"
        onClick={signInGithubHandler}
        disabled={isLoading}
        className="flex items-center gap-3 px-3 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-md shadow-md w-60">
        <img src="/discord.svg" alt="Discord Logo" className="w-5"></img>Sign in
        with Discord
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
