import Avatar from '../Avatar/Avatar'

export default function AccountExample({ avatar_url, username, full_name }) {
  return (
    <div className="flex flex-wrap gap-4 px-6 py-5 mx-auto border rounded-md shadow-md border-zinc-600 bg-zinc-800 hover:shadow-xl">
      <Avatar path={avatar_url} size="medium" />
      <div className="flex-grow">
        <div className="flex gap-3">
          <p className="mb-3">@{username || 'your-username'}</p>
          {full_name && (
            <p className="mb-3 text-zinc-500">
              {'\u00B7 '}
              {full_name}
            </p>
          )}
        </div>
        <p className="mb-3 text-lg">
          This is how other users will see your posts
        </p>
        <span className="block text-sm text-right">04:20</span>
      </div>
    </div>
  )
}
