import { cn } from '~/lib/utils'
import { Avatar, AvatarImage } from '~/components/ui/avatar'

type Props = {
  src?: string
  className?: string
}

export const UserAvatar = ({ src, className }: Props) => (
  <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
    <AvatarImage src={src} />
  </Avatar>
)
