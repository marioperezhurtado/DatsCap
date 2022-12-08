import { useState } from 'react'

const AVATAR_SIZES = {
  small: 'w-8',
  medium: 'w-12',
  large: 'w-32'
}

export default function Avatar({ path, size }) {
  const avatarSize = AVATAR_SIZES[size]

  const [pictureLoaded, setPictureLoaded] = useState(false)

  const showPictureHandler = () => setPictureLoaded(true)

  return (
    <div
      className={`${
        avatarSize || ''
      } h-min overflow-hidden  rounded-full shadow-md`}>
      <img
        src={path}
        alt="User Avatar"
        className={pictureLoaded ? 'w-full' : 'hidden'}
        onLoad={showPictureHandler}
      />
      <img
        src="/avatar.svg"
        alt="User Avatar"
        className={pictureLoaded ? 'hidden' : 'w-full bg-neutral-800'}
      />
    </div>
  )
}
