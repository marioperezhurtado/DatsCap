import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'

import SocialLogin from '../../components/SocialLogin/SocialLogin'

export default function SignUp() {
  const [success, setSuccess] = useState(null)
  const [validationError, setValidationError] = useState(null)
  const formRef = useRef(null)

  const { signUp } = useAuth()

  const {
    isLoading,
    error: signUpError,
    mutate
  } = useMutation({
    mutationFn: ({ fullName, username, email, password }) =>
      signUp({
        fullName,
        username,
        email,
        password
      }),
    onSuccess: () => {
      setSuccess('Check your email for the confirmation link')
      formRef.current.reset()
    }
  })

  const signUpHandler = (e) => {
    e.preventDefault()

    const email = formRef.current.email.value
    const password = formRef.current.password.value
    const passwordRepeat = formRef.current.passwordRepeat.value

    if (!email || !password || !passwordRepeat) {
      setValidationError('There are missing fields')
      return
    }

    mutate({ email, password })
  }

  return (
    <div className="px-2 pt-10 md:pt-20">
      <form
        ref={formRef}
        onSubmit={signUpHandler}
        className="flex flex-col max-w-sm gap-4 px-6 py-4 mx-auto border rounded-md shadow-md border-zinc-600 bg-zinc-800">
        <h1 className="text-xl font-bold text-center">Create an account</h1>
        <SocialLogin />
        {success && <p className="text-green-500">{success}</p>}
        {validationError && <p className="text-red-400">{validationError}</p>}
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
        <div className="flex flex-col gap-1">
          <label htmlFor="passwordRepeat">Repeat Password</label>
          <input
            type="password"
            name="passwordRepeat"
            autoComplete="repeat-your-password"
            className="px-3 py-1 text-black rounded-md"
          />
        </div>
        <button
          disabled={isLoading}
          className="px-3 py-1 transition-all border rounded-md shadow-md border-zinc-600 hover:bg-slate-500">
          Create account
        </button>
        {signUpError && (
          <p className="mt-4 text-red-400">{signUpError.message}</p>
        )}
      </form>
      <p className="mt-4 text-center">
        Already have an Account?{' '}
        <span className="font-bold text-purple-500 underline">
          <Link to="/signin">Sign in</Link>
        </span>
      </p>
    </div>
  )
}
