import { Hash } from 'lucide-react'
import { UserAvatar } from '../user-avatar'
import { MobileToggle } from '../mobile-toggle'

type Props = {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

export const ChatHeader = ({ name, serverId, type, imageUrl }: Props) => (
  <div>
    <MobileToggle serverId={serverId} />
    <Hash />
    <UserAvatar src={imageUrl} className="w-8 h-8 md:w-8 md:h-8 mr-2" />
    <p>{name}</p>
    <div></div>
  </div>
)
