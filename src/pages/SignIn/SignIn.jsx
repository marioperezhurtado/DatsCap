import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'

import SocialLogin from '../../components/SocialLogin/SocialLogin'

export default function SignIn() {
  const formRef = useRef()

  const { signIn } = useAuth()

  const {
    isLoading,
    error: signInError,
    mutate
  } = useMutation({
    mutationFn: ({ email, password }) => signIn({ email, password })
  })

  const signInHandler = (e) => {
    e.preventDefault()

    const email = formRef.current.email.value
    const password = formRef.current.password.value

    if (!email || !password) return

    mutate({ email, password })
  }

  return (
    <div className="pt-20">
      <form
        ref={formRef}
        onSubmit={signInHandler}
        className="flex flex-col max-w-sm gap-4 px-6 py-4 mx-auto border rounded-md shadow-md border-zinc-600">
        <h1 className="text-xl font-bold text-center">Welcome Back</h1>
        <SocialLogin />
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="your-email"
            placeholder="example@email.com"
            className="px-3 py-1 text-black rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="your-password"
            className="px-3 py-1 text-black rounded-md"
          />
        </div>
        <button
          disabled={isLoading}
          className="px-3 py-1 transition-all border rounded-md shadow-md border-zinc-600 hover:bg-slate-500">
          Sign In
        </button>
        {signInError && <p className="text-red-400">{signInError.message}</p>}
      </form>
      <p className="mt-4 text-center">
        Need an Account?{' '}
        <span className="font-bold text-purple-500 underline">
          <Link to="/signup">Sign up</Link>
        </span>
      </p>
    </div>
  )
}
