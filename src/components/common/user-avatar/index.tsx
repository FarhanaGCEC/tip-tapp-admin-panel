import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  DEFAULT_AVATAR,
  getProfilePictureUrl,
} from '../../../utils/profilePicture'

interface UserAvatarProps {
  src?: string | null
  alt?: string
  className?: string
}

function UserAvatar({
  src,
  alt = 'User avatar',
  className,
}: UserAvatarProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  const resolved = failed ? DEFAULT_AVATAR : getProfilePictureUrl(src)

  return (
    <img
      src={resolved}
      alt={alt}
      className={clsx(
        'shrink-0 rounded-full object-cover bg-slate-100',
        className
      )}
      onError={() => {
        if (!failed) setFailed(true)
      }}
    />
  )
}

export default UserAvatar
