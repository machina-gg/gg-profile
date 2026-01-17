'use client'

import { useRef, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CardPreview } from '@/components/card/CardPreview'
import { CardShare } from '@/components/card/CardShare'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import type { CardFormValues } from '@/lib/validations/card'

function PreviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)

  const formData = useMemo<CardFormValues>(() => {
    const game = searchParams.get('game') || 'valorant'
    const playerName = searchParams.get('playerName') || ''
    const rank = searchParams.get('rank') || ''
    const agents = searchParams.get('agents')?.split(',').filter(Boolean) || []
    const playStyle = searchParams.get('playStyle') || ''
    const bio = searchParams.get('bio') || ''
    const xId = searchParams.get('xId') || ''
    const discordId = searchParams.get('discordId') || ''
    const profileImage = searchParams.get('profileImage') || ''
    const background = searchParams.get('background') || 'default'
    const theme = (searchParams.get('theme') as 'light' | 'dark') || 'dark'

    return {
      game,
      playerName,
      rank,
      agents,
      playStyle,
      bio,
      xId,
      discordId,
      profileImage,
      background,
      theme,
    }
  }, [searchParams])

  const shareText = `${formData.playerName}のプロフィールカードを作りました！ #GGprofile`

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">カードが完成しました！</h1>
          <p className="text-muted-foreground">
            画像をダウンロードしたり、SNSでシェアできます
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
          <CardPreview ref={cardRef} data={formData} />

          <CardShare
            cardRef={cardRef}
            shareText={shareText}
            playerName={formData.playerName}
          />

          <div className="w-full border-t pt-6 mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻って編集する
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/create')}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                新しいカードを作る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  )
}
