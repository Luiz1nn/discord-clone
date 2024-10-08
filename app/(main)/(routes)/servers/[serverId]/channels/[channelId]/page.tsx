import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'

import { ChatHeader } from '~/components/chat/chat-header'
import { ChannelType } from '@prisma/client'
import { ChatInput } from '~/components/chat/chat-input'
import { ChatMessages } from '~/components/chat/chat-messages'

type Props = {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelIdPage = async ({ params }: Props) => {
  const profile = await currentProfile()

  if (!profile) return redirectToSignIn()

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) redirect('/')

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />

      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            apiUrl="/api/messages"
            chatId={channel.id}
            member={member}
            name={channel.name}
            paramKey="channelId"
            paramValue={channel.id}
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            socketUrl="/api/socket/messages"
            type="channel"
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
    </div>
  )
}

export default ChannelIdPage
