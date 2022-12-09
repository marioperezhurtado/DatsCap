import Avatar from '../Avatar/Avatar'

export default function AccountExample({ avatar_url, username, full_name }) {
  return (
    <div className="flex gap-4 px-6 pt-5 pb-2 mx-auto border rounded-md shadow-md cursor-pointer border-zinc-600 bg-zinc-800 hover:shadow-xl">
      <Avatar path={avatar_url} size="medium" />
      <div className="flex-grow">
        <div className="flex flex-wrap mb-3 gap-x-3">
          <p className="font-bold">@{username}</p>

          <p className=" text-zinc-500">
            {'\u00B7 '}
            {full_name}
          </p>
        </div>
        <p className="mb-3 text-lg">
          This is how other users will see your posts
        </p>
      </div>
    </div>
  )
}
