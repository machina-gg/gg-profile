'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ProfileCard } from '@/components/card/ProfileCard'
import { Button } from '@/components/ui/button'

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
      profileImage: '/assets/characters/pikaru-icon.png',
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
      profileImage: '/assets/characters/neon-icon.png',
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
      profileImage: '/assets/characters/minto-icon.png',
    },
    background: 'gradient-red' as const,
  },
]

export function SampleSection() {
  return (
    <section className="relative py-24 bg-[#0a0a12] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#A78BFA] rounded-full blur-[200px] opacity-5" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#F472B6] rounded-full blur-[200px] opacity-5" />

        {/* Sparkles - scattered throughout */}
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={32} height={32}
          className="absolute top-16 left-[12%] opacity-45 animate-sparkle" />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={28} height={28}
          className="absolute top-20 right-[15%] opacity-40 animate-sparkle" style={{ animationDelay: '0.6s' }} />
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={24} height={24}
          className="absolute top-[35%] left-[5%] opacity-35 animate-sparkle" style={{ animationDelay: '1.2s' }} />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={30} height={30}
          className="absolute top-[25%] right-[8%] opacity-40 animate-sparkle" style={{ animationDelay: '0.3s' }} />

        {/* Stars */}
        <Image src="/assets/decorations/star-1.svg" alt="" width={20} height={20}
          className="absolute top-24 left-[30%] opacity-35 animate-twinkle" />
        <Image src="/assets/decorations/star-2.svg" alt="" width={18} height={18}
          className="absolute top-[30%] right-[25%] opacity-30 animate-twinkle" style={{ animationDelay: '0.8s' }} />
        <Image src="/assets/decorations/star-1.svg" alt="" width={22} height={22}
          className="absolute bottom-32 left-[18%] opacity-35 animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <Image src="/assets/decorations/star-2.svg" alt="" width={16} height={16}
          className="absolute bottom-24 right-[20%] opacity-30 animate-twinkle" style={{ animationDelay: '0.4s' }} />

        {/* Hearts */}
        <Image src="/assets/decorations/heart.svg" alt="" width={22} height={22}
          className="absolute top-[40%] left-[8%] opacity-30 animate-float-slow" />
        <Image src="/assets/decorations/heart.svg" alt="" width={18} height={18}
          className="absolute top-[50%] right-[10%] opacity-25 animate-float" style={{ animationDelay: '-1.5s' }} />

        {/* Bottom area sparkles */}
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={26} height={26}
          className="absolute bottom-[30%] left-[25%] opacity-35 animate-sparkle" style={{ animationDelay: '0.9s' }} />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={22} height={22}
          className="absolute bottom-[35%] right-[30%] opacity-30 animate-sparkle" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Image src="/assets/decorations/heart.svg" alt="" width={16} height={16} className="opacity-60 animate-float-slow" />
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#F472B6]" />
            <span className="text-sm tracking-[0.2em] text-[#F472B6] font-medium uppercase">Samples</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#F472B6]" />
            <Image src="/assets/decorations/heart.svg" alt="" width={16} height={16} className="opacity-60 animate-float-slow" style={{ animationDelay: '-0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">こんなカードが</span>
            <span className="bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#67E8F9] bg-clip-text text-transparent">作れるよ!</span>
          </h2>
          <p className="text-gray-500 text-lg">
            実際に作れるカードのサンプル
          </p>
        </div>

        {/* Cards Display */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 mb-16">
          {sampleCards.map((card, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`
              }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#A78BFA]/10 via-[#F472B6]/10 to-[#67E8F9]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative transform transition-transform duration-300 group-hover:scale-[1.02]">
                <ProfileCard
                  data={card.data}
                  background={card.background}
                  theme="dark"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-gray-500 text-sm">
              あなたもカードを作ってみよう!
            </p>
            <Button
              size="lg"
              asChild
              className="relative text-lg px-8 py-6 bg-gradient-to-r from-[#A78BFA] to-[#F472B6] hover:from-[#A78BFA]/90 hover:to-[#F472B6]/90 text-white font-bold rounded-full shadow-[0_0_30px_rgba(167,139,250,0.3)] hover:shadow-[0_0_40px_rgba(167,139,250,0.5)] transition-all duration-300"
            >
              <Link href="/create" className="flex items-center gap-2">
                <Image
                  src="/assets/decorations/sparkle-1.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                カードを作る
              </Link>
            </Button>
          </div>
        </div>

        {/* Character decoration - RGB Line version */}
        <div className="hidden lg:block absolute -left-5 bottom-16 opacity-30">
          <Image
            src="/assets/characters/minto-line.png"
            alt=""
            width={160}
            height={160}
            className="drop-shadow-[0_0_20px_rgba(103,232,249,0.3)]"
          />
        </div>
      </div>
    </section>
  )
}
