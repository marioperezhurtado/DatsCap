import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'

export default function SignUp() {
  const [validationError, setValidationError] = useState(null)
  const formRef = useRef(null)
  const navigate = useNavigate()

  const { signUp } = useAuth()

  const {
    isLoading,
    error: signUpError,
    mutate
  } = useMutation({
    mutationFn: ({ email, password }) => signUp({ email, password }),
    onSuccess: () => navigate('/')
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
    <div className="pt-20">
      <form
        ref={formRef}
        onSubmit={signUpHandler}
        className="flex flex-col max-w-sm gap-4 px-6 py-4 mx-auto border rounded-md border-zinc-600">
        <h1 className="text-xl font-bold text-center">Create an account</h1>
        {validationError && <p className="text-red-500">{validationError}</p>}
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
          className="px-3 py-1 border rounded-md  border-zinc-600">
          Create account
        </button>
        {signUpError && <p className="mt-4 text-red-500">{signUpError}</p>}
      </form>
    </div>
  )
}
