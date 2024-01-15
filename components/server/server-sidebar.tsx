import { redirect } from 'next/navigation'
import { db } from '~/lib/db'
import { currentProfile } from '~/lib/current-profile'

import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'
import { ServerHeader } from './server-header'

type Props = {
  serverId: string
}

export const ServerSidebar = async ({ serverId }: Props) => {
  const profile = await currentProfile()

  if (!profile) return redirect('/')

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) return redirect('/')

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role

  return (
    <div className="flex flex-col h-full text-primary w-full bg-[#f2f3f5] dark:bg-[#2b2d31]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">ServerSearch</div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        <div className="mb-2">
          ServerSection
          <div className="space-y-[2px]">ServerChannel</div>
        </div>
        <div className="mb-2">
          ServerSection
          <div className="space-y-[2px]">ServerChannel</div>
        </div>
        <div className="mb-2">
          ServerSection
          <div className="space-y-[2px]">ServerChannel</div>
        </div>
      </ScrollArea>
    </div>
  )
}
