'use client'

import { useRef, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CardPreview } from '@/components/card/CardPreview'
import { CardShare } from '@/components/card/CardShare'
import { Button } from '@/components/ui/button'
import { Pencil, Plus, LayoutDashboard } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getCard } from '@/app/actions/card'
import type { CardFormValues } from '@/lib/validations/card'

export default function CardPage() {
  const params = useParams()
  const router = useRouter()
  const cardId = params.id as string
  const cardRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<CardFormValues | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      const result = await getCard(cardId)
      if (result.error || !result.card) {
        setError('カードが見つかりません')
        setIsLoading(false)
        return
      }

      const card = result.card
      setFormData({
        game: card.game,
        playerName: card.player_name,
        rank: card.rank,
        agents: card.agents,
        playStyle: card.play_style,
        bio: card.bio || '',
        xId: card.x_id || '',
        discordId: card.discord_id || '',
        profileImage: card.profile_image_url || '',
        background: card.background,
        theme: card.theme,
      })

      // カードの所有者かどうかを確認
      if (session?.user && card.user_id === session.user.id) {
        setIsOwner(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [cardId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    )
  }

  if (error || !formData) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'カードが見つかりません'}</p>
          <Button onClick={() => router.push('/')}>トップに戻る</Button>
        </div>
      </div>
    )
  }

  const shareText = `${formData.playerName}のプロフィールカード #GGprofile`

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{formData.playerName}</h1>
          <p className="text-muted-foreground">プロフィールカード</p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
          <CardPreview ref={cardRef} data={formData} />

          <CardShare
            cardRef={cardRef}
            shareText={shareText}
            playerName={formData.playerName}
          />

          {/* 所有者の場合は編集・マイページボタンを表示 */}
          {isOwner && (
            <div className="w-full space-y-3">
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href={`/cards/${cardId}/edit`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  編集する
                </Link>
              </Button>
              <Button asChild className="w-full" size="lg">
                <Link href="/mypage">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  マイページを見る
                </Link>
              </Button>
            </div>
          )}

          <div className="w-full border-t pt-6 mt-4">
            <Button
              variant="outline"
              onClick={() => router.push('/create')}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isOwner ? '新しいカードを作る' : '自分のカードを作る'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
