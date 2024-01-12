'use client'

import { Plus } from 'lucide-react'
import { ActionTooltip } from '~/components/action-tolltip'

export const NavigationAction = () => (
  <div>
    <ActionTooltip side="right" align="center" label="Add a server">
      <button className="group flex items-center">
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:neutral-700 group-hover:bg-emerald-500">
          <Plus
            size={25}
            className="group-hover:text-white transition text-emerald-500"
          />
        </div>
      </button>
    </ActionTooltip>
  </div>
)
