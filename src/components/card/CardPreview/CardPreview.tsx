'use client'

import { forwardRef } from 'react'
import { ProfileCard } from '@/components/card/ProfileCard'
import type { CardFormValues } from '@/lib/validations/card'
import type { ProfileCardData } from '@/types'

type CardPreviewProps = {
  data: CardFormValues
  className?: string
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ data, className }, ref) => {
    const profileData: ProfileCardData = {
      game: data.game === 'valorant' ? 'VALORANT' : data.game,
      playerName: data.playerName || 'プレイヤー名',
      rank: data.rank,
      agents: data.agents,
      playStyle: data.playStyle,
      bio: data.bio ?? '',
      xId: data.xId,
      discordId: data.discordId,
      profileImage: data.profileImage,
    }

    return (
      <div className={className}>
        <ProfileCard
          ref={ref}
          data={profileData}
          background={data.background}
          theme={data.theme}
        />
      </div>
    )
  }
)

CardPreview.displayName = 'CardPreview'
