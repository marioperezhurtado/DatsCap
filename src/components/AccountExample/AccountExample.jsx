import Avatar from '../Avatar/Avatar'

export default function AccountExample({ avatar_url, username, full_name }) {
  return (
    <div className="relative flex gap-4 px-2 pt-3 pb-1 mx-auto border rounded-md shadow-md cursor-pointer md:px-6 md:pt-5 md:pb-2 border-zinc-600 bg-zinc-800 hover:shadow-xl">
      <Avatar path={avatar_url} size="medium" />
      <div className="flex-grow">
        <div className="flex flex-wrap mb-3 gap-x-3">
          <p className="font-bold">@{username}</p>
          <p className=" text-zinc-500">
            {'\u00B7 '}
            {full_name}
          </p>
        </div>
        <p className="mb-3">This is how other users will see your caps</p>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <span className="py-2 text-sm text-zinc-500">04:20</span>
        </div>
      </div>
    </div>
  )
}
