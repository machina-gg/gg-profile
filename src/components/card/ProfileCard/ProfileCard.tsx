'use client'

import { forwardRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ProfileCardData, CardTheme } from '@/types'
import { VALORANT_RANKS } from '@/data/valorant'
import { VALORANT_AGENTS } from '@/data/valorant'
import { VALORANT_BACKGROUNDS } from '@/data/valorant'
import { PLAY_STYLES } from '@/data/playstyles'
import { Twitter, MessageCircle } from 'lucide-react'

type ProfileCardProps = {
  data: ProfileCardData
  background?: string
  theme?: CardTheme
  className?: string
}

export const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ data, background = 'default', theme = 'dark', className }, ref) => {
    const getRankName = (rankId: string) => {
      return VALORANT_RANKS.find((r) => r.id === rankId)?.name ?? rankId
    }

    const getAgentNames = (agentIds: string[]) => {
      return agentIds.map(
        (id) => VALORANT_AGENTS.find((a) => a.id === id)?.name ?? id
      )
    }

    const getPlayStyleName = (styleId: string) => {
      return PLAY_STYLES.find((s) => s.id === styleId)?.name ?? styleId
    }

    const getBackgroundClass = (bgId: string) => {
      const bg = VALORANT_BACKGROUNDS.find((b) => b.id === bgId)
      return bg?.color ?? 'from-slate-900 to-slate-800'
    }

    const isDark = theme === 'dark'

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-[360px] overflow-hidden rounded-2xl shadow-2xl',
          isDark ? 'text-white' : 'text-slate-900',
          className
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            getBackgroundClass(background)
          )}
        />

        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-2 border-white/20">
              <AvatarImage src={data.profileImage} alt={data.playerName} />
              <AvatarFallback className="bg-white/10 text-xl font-bold">
                {data.playerName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold truncate">{data.playerName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-inherit"
                >
                  {data.game}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-inherit"
                >
                  {getPlayStyleName(data.playStyle)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-70">ランク</span>
              <span className="font-semibold">{getRankName(data.rank)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm opacity-70">メイン</span>
              <div className="flex flex-wrap justify-end gap-1">
                {getAgentNames(data.agents).map((name) => (
                  <Badge
                    key={name}
                    variant="outline"
                    className="border-white/30 text-inherit bg-white/10"
                  >
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {data.bio && (
            <div className="mt-4 p-3 rounded-lg bg-white/10">
              <p className="text-sm leading-relaxed">{data.bio}</p>
            </div>
          )}

          {(data.xId || data.discordId) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {data.xId && (
                <div className="flex items-center gap-1.5 text-sm opacity-80">
                  <Twitter className="h-4 w-4" />
                  <span>@{data.xId}</span>
                </div>
              )}
              {data.discordId && (
                <div className="flex items-center gap-1.5 text-sm opacity-80">
                  <MessageCircle className="h-4 w-4" />
                  <span>{data.discordId}</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs opacity-50">GGprofile</span>
            <span className="text-xs opacity-50">ggprofile.com</span>
          </div>
        </div>
      </div>
    )
  }
)

ProfileCard.displayName = 'ProfileCard'
