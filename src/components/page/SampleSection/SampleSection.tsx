'use client'

import { ProfileCard } from '@/components/card/ProfileCard'

const sampleCards = [
  {
    data: {
      game: 'VALORANT',
      playerName: 'NightHawk',
      rank: 'immortal2',
      agents: ['jett', 'reyna'],
      playStyle: 'ranked',
      bio: 'イモータル目指して毎日ランク！一緒に頑張れる人募集中',
      xId: 'nighthawk_val',
    },
    background: 'gradient-purple' as const,
  },
  {
    data: {
      game: 'VALORANT',
      playerName: 'SageMain',
      rank: 'diamond1',
      agents: ['sage', 'killjoy'],
      playStyle: 'casual',
      bio: 'サポート専門です。気軽にフォローしてください！',
      discordId: 'sagemain#1234',
    },
    background: 'gradient-cyan' as const,
  },
  {
    data: {
      game: 'VALORANT',
      playerName: 'ProPlayer',
      rank: 'radiant',
      agents: ['jett', 'raze', 'neon'],
      playStyle: 'competitive',
      bio: '大会実績あり。チームメンバー募集中！',
      xId: 'proplayer_jp',
      discordId: 'proplayer#0001',
    },
    background: 'gradient-red' as const,
  },
]

export function SampleSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            サンプルカード
          </h2>
          <p className="text-muted-foreground">
            こんなカードが作れます
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {sampleCards.map((card, index) => (
            <ProfileCard
              key={index}
              data={card.data}
              background={card.background}
              theme="dark"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
