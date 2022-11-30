export default function SignIn() {
  return (
    <div className="pt-20">
      <form className="flex flex-col max-w-sm gap-4 px-6 py-4 mx-auto border border-zinc-600">
        <h1 className="text-xl font-bold text-center">Sign In</h1>
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
        <button className="border border-zinc-600">Sign In</button>
      </form>
    </div>
  )
}
