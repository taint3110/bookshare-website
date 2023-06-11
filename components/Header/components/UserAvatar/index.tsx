import { Avatar } from '@chakra-ui/react'
import { backgroundSecondary } from 'theme/globalStyles'
const defaultAvatar: string = '/assets/icons/green-default-avatar.svg'

export interface IUserAvatar {
  avatarUrl?: string
  name?: string
}

const UserAvatar = (props: IUserAvatar) => {
  const { avatarUrl, name } = props

  return (
    <Avatar
      name={avatarUrl ? '' : name}
      colorScheme="teal"
      src={avatarUrl ?? name ?? defaultAvatar}
      size="sm"
      border={avatarUrl || name ? `2px solid ${backgroundSecondary}` : ''}
    />
  )
}

export default UserAvatar
