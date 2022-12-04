import { useState } from 'react'

const AVATAR_SIZES = {
  small: 'w-12 h-12',
  medium: 'w-20 h-20',
  big: 'w-32 h-32'
}

export default function Avatar({ path, size }) {
  const avatarSize = AVATAR_SIZES[size]

  const [pictureLoaded, setPictureLoaded] = useState(false)

  const showPictureHandler = () => setPictureLoaded(true)

  return (
    <div
      className={`${
        avatarSize || ''
      } overflow-hidden border rounded-full border-zinc-600`}>
      <img
        src={path}
        alt="User Avatar"
        className={pictureLoaded ? '' : 'hidden'}
        onLoad={showPictureHandler}
      />
    </div>
  )
}
