import { Popover, PopoverTrigger } from './ui/popover'
import { Smile } from 'lucide-react'

export const EmojiPicker = () => (
  <Popover>
    <PopoverTrigger>
      <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
    </PopoverTrigger>
  </Popover>
)
