'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gamepad2 } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm">
            <Gamepad2 className="h-4 w-4 text-purple-500" />
            <span>ゲーマーのためのプロフィールカード</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              GGprofile
            </span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            ランク、メインキャラ、プレイスタイルを
            <br className="hidden sm:block" />
            カード形式でまとめて、SNSでシェアしよう
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="min-w-[200px]">
              <Link href="/create">カードを作る</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[200px]">
              <Link href="#features">サービスを詳しく見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
