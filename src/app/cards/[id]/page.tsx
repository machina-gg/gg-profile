import { notFound } from 'next/navigation'
import { ProfileCard } from '@/components/card/ProfileCard'
import { Button } from '@/components/ui/button'
import { VALORANT_RANKS, VALORANT_AGENTS } from '@/data/valorant'
import { PLAY_STYLES } from '@/data/playstyles'
import Link from 'next/link'
import { Twitter, MessageCircle, ExternalLink } from 'lucide-react'
import type { ProfileCardData, CardTheme } from '@/types'

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function parseCardData(
  searchParams: Record<string, string | string[] | undefined>
): { data: ProfileCardData; background: string; theme: CardTheme } | null {
  const getString = (key: string): string => {
    const value = searchParams[key]
    return typeof value === 'string' ? value : ''
  }

  const playerName = getString('playerName')
  if (!playerName) return null

  const game = getString('game') || 'valorant'
  const rank = getString('rank')
  const agents = getString('agents').split(',').filter(Boolean)
  const playStyle = getString('playStyle')
  const bio = getString('bio')
  const xId = getString('xId')
  const discordId = getString('discordId')
  const profileImage = getString('profileImage')
  const background = getString('background') || 'default'
  const theme = (getString('theme') as CardTheme) || 'dark'

  return {
    data: {
      game: game === 'valorant' ? 'VALORANT' : game,
      playerName,
      rank,
      agents,
      playStyle,
      bio,
      xId,
      discordId,
      profileImage,
    },
    background,
    theme,
  }
}

export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams
  const cardInfo = parseCardData(params)

  if (!cardInfo) {
    return {
      title: 'カードが見つかりません | GGprofile',
    }
  }

  const { data } = cardInfo
  const rankName =
    VALORANT_RANKS.find((r) => r.id === data.rank)?.name || data.rank

  return {
    title: `${data.playerName}のプロフィール | GGprofile`,
    description: `${data.playerName} - ${data.game} ${rankName}`,
    openGraph: {
      title: `${data.playerName}のプロフィール | GGprofile`,
      description: `${data.playerName} - ${data.game} ${rankName}`,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.playerName}のプロフィール | GGprofile`,
      description: `${data.playerName} - ${data.game} ${rankName}`,
    },
  }
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const params = await searchParams
  const cardInfo = parseCardData(params)

  if (!cardInfo) {
    notFound()
  }

  const { data, background, theme } = cardInfo

  const getRankName = (rankId: string) =>
    VALORANT_RANKS.find((r) => r.id === rankId)?.name || rankId
  const getAgentNames = (agentIds: string[]) =>
    agentIds.map((id) => VALORANT_AGENTS.find((a) => a.id === id)?.name || id)
  const getPlayStyleName = (styleId: string) =>
    PLAY_STYLES.find((s) => s.id === styleId)?.name || styleId

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <ProfileCard data={data} background={background} theme={theme} />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{data.playerName}</h1>
                <p className="text-muted-foreground">{data.game}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ランク</p>
                    <p className="font-semibold">{getRankName(data.rank)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      プレイスタイル
                    </p>
                    <p className="font-semibold">
                      {getPlayStyleName(data.playStyle)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    メインキャラクター
                  </p>
                  <p className="font-semibold">
                    {getAgentNames(data.agents).join('、')}
                  </p>
                </div>

                {data.bio && (
                  <div>
                    <p className="text-sm text-muted-foreground">ひとこと</p>
                    <p className="font-semibold">{data.bio}</p>
                  </div>
                )}

                {(data.xId || data.discordId) && (
                  <div className="pt-4 border-t space-y-3">
                    <p className="text-sm text-muted-foreground">SNS</p>
                    <div className="flex flex-wrap gap-3">
                      {data.xId && (
                        <a
                          href={`https://twitter.com/${data.xId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                          <span>@{data.xId}</span>
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </a>
                      )}
                      {data.discordId && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                          <MessageCircle className="h-4 w-4" />
                          <span>{data.discordId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t">
                <Button asChild size="lg" className="w-full">
                  <Link href="/create">自分もカードを作る</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
