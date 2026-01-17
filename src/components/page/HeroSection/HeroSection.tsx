'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a12]">
      {/* Background with gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#12121f] to-[#0a0a12]" />
        {/* RGB Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#A78BFA] rounded-full blur-[200px] opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#F472B6] rounded-full blur-[200px] opacity-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-[#67E8F9] rounded-full blur-[200px] opacity-5 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Sparkle Particles Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large sparkles */}
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={40} height={40}
          className="absolute top-[10%] left-[15%] opacity-70 animate-sparkle" />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={35} height={35}
          className="absolute top-[15%] right-[20%] opacity-60 animate-sparkle" style={{ animationDelay: '0.5s' }} />
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={30} height={30}
          className="absolute top-[25%] left-[8%] opacity-50 animate-sparkle" style={{ animationDelay: '1s' }} />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={45} height={45}
          className="absolute top-[20%] right-[10%] opacity-65 animate-sparkle" style={{ animationDelay: '1.5s' }} />
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={25} height={25}
          className="absolute top-[35%] left-[25%] opacity-55 animate-sparkle" style={{ animationDelay: '2s' }} />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={38} height={38}
          className="absolute top-[40%] right-[30%] opacity-60 animate-sparkle" style={{ animationDelay: '0.3s' }} />

        {/* Stars scattered */}
        <Image src="/assets/decorations/star-1.svg" alt="" width={24} height={24}
          className="absolute top-[12%] left-[40%] opacity-50 animate-twinkle" />
        <Image src="/assets/decorations/star-2.svg" alt="" width={20} height={20}
          className="absolute top-[18%] right-[35%] opacity-45 animate-twinkle" style={{ animationDelay: '0.7s' }} />
        <Image src="/assets/decorations/star-1.svg" alt="" width={18} height={18}
          className="absolute top-[30%] left-[5%] opacity-40 animate-twinkle" style={{ animationDelay: '1.2s' }} />
        <Image src="/assets/decorations/star-2.svg" alt="" width={22} height={22}
          className="absolute top-[22%] right-[5%] opacity-50 animate-twinkle" style={{ animationDelay: '1.8s' }} />
        <Image src="/assets/decorations/star-1.svg" alt="" width={16} height={16}
          className="absolute top-[45%] left-[12%] opacity-35 animate-twinkle" style={{ animationDelay: '2.2s' }} />
        <Image src="/assets/decorations/star-2.svg" alt="" width={20} height={20}
          className="absolute top-[38%] right-[15%] opacity-45 animate-twinkle" style={{ animationDelay: '0.4s' }} />

        {/* Bottom area sparkles */}
        <Image src="/assets/decorations/sparkle-1.svg" alt="" width={32} height={32}
          className="absolute bottom-[35%] left-[20%] opacity-50 animate-sparkle" style={{ animationDelay: '0.8s' }} />
        <Image src="/assets/decorations/sparkle-2.svg" alt="" width={28} height={28}
          className="absolute bottom-[40%] right-[25%] opacity-55 animate-sparkle" style={{ animationDelay: '1.3s' }} />
        <Image src="/assets/decorations/star-1.svg" alt="" width={18} height={18}
          className="absolute bottom-[30%] left-[35%] opacity-40 animate-twinkle" style={{ animationDelay: '1.6s' }} />
        <Image src="/assets/decorations/star-2.svg" alt="" width={22} height={22}
          className="absolute bottom-[45%] right-[8%] opacity-45 animate-twinkle" style={{ animationDelay: '2s' }} />

        {/* Hearts */}
        <Image src="/assets/decorations/heart.svg" alt="" width={20} height={20}
          className="absolute top-[28%] left-[30%] opacity-40 animate-float-slow" />
        <Image src="/assets/decorations/heart.svg" alt="" width={16} height={16}
          className="absolute top-[50%] right-[22%] opacity-35 animate-float" style={{ animationDelay: '-1s' }} />

        {/* Gaming decorations - subtle */}
        <Image src="/assets/decorations/gamepad.svg" alt="" width={50} height={50}
          className="absolute top-24 left-[6%] opacity-15 animate-float" />
        <Image src="/assets/decorations/keyboard.svg" alt="" width={45} height={45}
          className="absolute top-[40%] right-[3%] opacity-10 animate-float-slow" />
        <Image src="/assets/decorations/headset.svg" alt="" width={48} height={48}
          className="absolute bottom-[35%] left-[3%] opacity-10 animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="container relative mx-auto px-4 pt-24 pb-12 md:pt-32 md:pb-20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Sparkle around logo */}
            <Image src="/assets/decorations/sparkle-1.svg" alt="" width={24} height={24}
              className="absolute -top-4 -left-6 opacity-80 animate-sparkle" />
            <Image src="/assets/decorations/sparkle-2.svg" alt="" width={20} height={20}
              className="absolute -top-2 -right-5 opacity-70 animate-sparkle" style={{ animationDelay: '0.5s' }} />
            <Image
              src="/assets/brand/logo.svg"
              alt="GGprofile"
              width={280}
              height={70}
              className="drop-shadow-[0_0_30px_rgba(167,139,250,0.5)]"
              priority
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A78BFA]/20 to-[#F472B6]/20 border border-[#A78BFA]/30 px-5 py-2.5 text-sm mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#67E8F9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#67E8F9]"></span>
            </span>
            <span className="text-[#A78BFA] font-medium">ゲーマーのための自己紹介カード</span>
            <Image src="/assets/decorations/sparkle-1.svg" alt="" width={16} height={16} className="animate-sparkle" />
          </div>

          {/* Tagline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            <span className="block mb-2">ランク、メインキャラ、プレイスタイルを</span>
            <span className="bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#67E8F9] bg-clip-text text-transparent">
              かわいいカード
            </span>
            <span className="text-white">にまとめて</span>
            <span className="bg-gradient-to-r from-[#67E8F9] to-[#6EE7B7] bg-clip-text text-transparent">
              SNSでシェア
            </span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Button
              size="lg"
              asChild
              className="relative min-w-[220px] text-lg py-6 px-8 bg-gradient-to-r from-[#A78BFA] to-[#F472B6] hover:from-[#A78BFA]/90 hover:to-[#F472B6]/90 text-white font-bold rounded-full shadow-[0_0_30px_rgba(167,139,250,0.4)] hover:shadow-[0_0_40px_rgba(167,139,250,0.6)] transition-all duration-300"
            >
              <Link href="/create" className="flex items-center gap-2">
                <Image
                  src="/assets/decorations/sparkle-1.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="animate-sparkle"
                />
                カードを作る
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="min-w-[180px] border-[#A78BFA]/50 text-[#A78BFA] hover:bg-[#A78BFA]/10 hover:border-[#A78BFA] rounded-full transition-all duration-300"
            >
              <Link href="#features">もっと見る</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 md:gap-10 mb-12">
            <div className="text-center relative">
              <Image src="/assets/decorations/star-1.svg" alt="" width={14} height={14}
                className="absolute -top-2 -right-2 opacity-60 animate-twinkle" />
              <div className="text-2xl md:text-3xl font-black text-[#FDE68A] drop-shadow-[0_0_10px_rgba(253,230,138,0.5)]">FREE</div>
              <div className="text-xs text-gray-500">基本無料</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#A78BFA]/50 to-transparent" />
            <div className="text-center relative">
              <Image src="/assets/decorations/sparkle-1.svg" alt="" width={12} height={12}
                className="absolute -top-1 -right-3 opacity-70 animate-sparkle" />
              <div className="text-2xl md:text-3xl font-black text-[#F472B6] drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]">3秒</div>
              <div className="text-xs text-gray-500">でカード生成</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#A78BFA]/50 to-transparent" />
            <div className="text-center relative">
              <Image src="/assets/decorations/star-2.svg" alt="" width={14} height={14}
                className="absolute -top-2 -left-2 opacity-60 animate-twinkle" style={{ animationDelay: '0.5s' }} />
              <div className="text-2xl md:text-3xl font-black text-[#67E8F9] drop-shadow-[0_0_10px_rgba(103,232,249,0.5)]">SNS</div>
              <div className="text-xs text-gray-500">シェア対応</div>
            </div>
          </div>
        </div>

        {/* Characters Hero Image */}
        <div className="relative flex justify-center mt-4">
          <div className="relative">
            {/* Sparkles around characters */}
            <Image src="/assets/decorations/sparkle-1.svg" alt="" width={36} height={36}
              className="absolute -top-8 left-[20%] opacity-70 animate-sparkle z-10" />
            <Image src="/assets/decorations/sparkle-2.svg" alt="" width={32} height={32}
              className="absolute -top-4 right-[25%] opacity-65 animate-sparkle z-10" style={{ animationDelay: '0.7s' }} />
            <Image src="/assets/decorations/star-1.svg" alt="" width={24} height={24}
              className="absolute top-[10%] -left-4 opacity-55 animate-twinkle z-10" style={{ animationDelay: '0.3s' }} />
            <Image src="/assets/decorations/star-2.svg" alt="" width={22} height={22}
              className="absolute top-[15%] -right-2 opacity-50 animate-twinkle z-10" style={{ animationDelay: '1s' }} />
            {/* Glow behind characters */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#A78BFA]/20 via-[#F472B6]/10 to-transparent blur-3xl scale-110" />
            <Image
              src="/assets/characters/characters-hero.png"
              alt="GGprofile キャラクター"
              width={900}
              height={400}
              className="relative drop-shadow-[0_0_50px_rgba(167,139,250,0.3)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a12] to-transparent" />
    </section>
  )
}
