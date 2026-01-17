'use client'

import Image from 'next/image'
import { Sparkles, Share2, Image as ImageIcon, Palette, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'かんたん作成',
    description: 'ゲーム内ネームやランクを入力するだけ。3秒でカードが完成!',
    color: 'purple',
  },
  {
    icon: Share2,
    title: 'SNSでシェア',
    description: 'X（Twitter）にワンクリック投稿。タイムラインで目立てる!',
    color: 'pink',
  },
  {
    icon: ImageIcon,
    title: '画像ダウンロード',
    description: 'PNG形式で保存。Instagram、Discordでも使える!',
    color: 'cyan',
  },
  {
    icon: Palette,
    title: 'カスタマイズ',
    description: '背景やテーマを自由に選択。自分だけのオリジナルカードに!',
    color: 'yellow',
  },
  {
    icon: Shield,
    title: 'ゲーム対応',
    description: 'VALORANT対応。ランク、エージェント、プレイスタイルを設定!',
    color: 'green',
  },
  {
    icon: Zap,
    title: '基本無料',
    description: '基本機能はすべて無料。気軽に試してみてね!',
    color: 'purple',
  },
]

const getColorClasses = (color: string) => {
  const colors: Record<string, { icon: string; border: string; bg: string; glow: string }> = {
    purple: {
      icon: 'text-[#A78BFA]',
      border: 'border-[#A78BFA]/20 hover:border-[#A78BFA]/60',
      bg: 'bg-[#A78BFA]/5 hover:bg-[#A78BFA]/10',
      glow: 'hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]',
    },
    pink: {
      icon: 'text-[#F472B6]',
      border: 'border-[#F472B6]/20 hover:border-[#F472B6]/60',
      bg: 'bg-[#F472B6]/5 hover:bg-[#F472B6]/10',
      glow: 'hover:shadow-[0_0_30px_rgba(244,114,182,0.2)]',
    },
    cyan: {
      icon: 'text-[#67E8F9]',
      border: 'border-[#67E8F9]/20 hover:border-[#67E8F9]/60',
      bg: 'bg-[#67E8F9]/5 hover:bg-[#67E8F9]/10',
      glow: 'hover:shadow-[0_0_30px_rgba(103,232,249,0.2)]',
    },
    yellow: {
      icon: 'text-[#FDE68A]',
      border: 'border-[#FDE68A]/20 hover:border-[#FDE68A]/60',
      bg: 'bg-[#FDE68A]/5 hover:bg-[#FDE68A]/10',
      glow: 'hover:shadow-[0_0_30px_rgba(253,230,138,0.2)]',
    },
    green: {
      icon: 'text-[#6EE7B7]',
      border: 'border-[#6EE7B7]/20 hover:border-[#6EE7B7]/60',
      bg: 'bg-[#6EE7B7]/5 hover:bg-[#6EE7B7]/10',
      glow: 'hover:shadow-[0_0_30px_rgba(110,231,183,0.2)]',
    },
  }
  return colors[color] || colors.purple
}

export function FeatureSection() {
  return (
    <section id="features" className="relative py-24 bg-[#0a0a12]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#A78BFA] rounded-full blur-[200px] opacity-5" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Sparkles and stars */}
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={28} height={28}
          className="absolute top-16 left-[10%] opacity-40 animate-sparkle" />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={24} height={24}
          className="absolute top-24 right-[15%] opacity-35 animate-sparkle" style={{ animationDelay: '0.8s' }} />
        <Image src="/assets/decorations/star-1.svg" alt="" width={18} height={18}
          className="absolute top-[40%] left-[5%] opacity-30 animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <Image src="/assets/decorations/star-2.svg" alt="" width={16} height={16}
          className="absolute top-[30%] right-[8%] opacity-25 animate-twinkle" style={{ animationDelay: '1.2s' }} />
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={22} height={22}
          className="absolute bottom-32 left-[20%] opacity-35 animate-sparkle" style={{ animationDelay: '1.5s' }} />
        <Image src="/assets/decorations/star-1.svg" alt="" width={20} height={20}
          className="absolute bottom-24 right-[25%] opacity-30 animate-twinkle" style={{ animationDelay: '0.3s' }} />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Image src="/assets/decorations/star-1.svg" alt="" width={16} height={16} className="opacity-60 animate-twinkle" />
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#A78BFA]" />
            <span className="text-sm tracking-[0.2em] text-[#A78BFA] font-medium uppercase">Features</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#A78BFA]" />
            <Image src="/assets/decorations/star-2.svg" alt="" width={16} height={16} className="opacity-60 animate-twinkle" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">GGprofileの</span>
            <span className="bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#67E8F9] bg-clip-text text-transparent">とくちょう</span>
          </h2>
          <p className="text-gray-500 text-lg">
            ゲーマーがSNSで自分をアピールするための機能
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature) => {
            const colors = getColorClasses(feature.color)
            return (
              <div
                key={feature.title}
                className={`group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 bg-[#0f0f1a]/50 ${colors.border} ${colors.glow}`}
              >
                {/* Icon */}
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${colors.bg}`}>
                  <feature.icon className={`h-6 w-6 ${colors.icon}`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Character decoration - RGB Line version */}
        <div className="hidden lg:block absolute -right-5 bottom-20 opacity-40">
          <Image
            src="/assets/characters/neon-line.png"
            alt=""
            width={180}
            height={180}
            className="drop-shadow-[0_0_20px_rgba(167,139,250,0.3)]"
          />
        </div>
      </div>
    </section>
  )
}
