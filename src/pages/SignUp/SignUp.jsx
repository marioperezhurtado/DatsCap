import { useState, useRef } from 'react'

export default function SignUp() {
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  const signUpHandler = (e) => {
    e.preventDefault()

    const email = formRef.current.email.value
    const password = formRef.current.password.value
    const passwordRepeat = formRef.current.passwordRepeat.value

    if (!email || !password || !passwordRepeat) {
      setError('There are missing fields')
      return
    }
  }

  return (
    <div className="pt-20">
      <form
        ref={formRef}
        onSubmit={signUpHandler}
        className="flex flex-col max-w-sm gap-4 px-6 py-4 mx-auto border border-zinc-600">
        <h1 className="text-xl font-bold text-center">Create an account</h1>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="your-email"
            placeholder="example@email.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" autoComplete="your-password" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="passwordRepeat">Repeat Password</label>
          <input
            type="password"
            name="passwordRepeat"
            autoComplete="repeat-your-password"
          />
        </div>
        <button className="border border-zinc-600">Create account</button>
      </form>
    </div>
  )
}
