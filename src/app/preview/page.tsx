'use client'

import { useRef, Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CardPreview } from '@/components/card/CardPreview'
import { CardShare } from '@/components/card/CardShare'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Save, LogIn, Loader2, Check, Pencil } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { saveCard, getCard } from '@/app/actions/card'
import type { CardFormValues } from '@/lib/validations/card'
import type { User } from '@supabase/supabase-js'

function PreviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [formData, setFormData] = useState<CardFormValues | null>(null)
  const [cardId, setCardId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const id = searchParams.get('id')

    const fetchData = async () => {
      // ユーザー情報を取得
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      // カードIDがある場合はDBから取得
      if (id) {
        setCardId(id)
        const result = await getCard(id)
        if (result.card) {
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
        }
      } else {
        // クエリパラメータから取得（未ログインユーザー用）
        setFormData({
          game: searchParams.get('game') || 'valorant',
          playerName: searchParams.get('playerName') || '',
          rank: searchParams.get('rank') || '',
          agents: searchParams.get('agents')?.split(',').filter(Boolean) || [],
          playStyle: searchParams.get('playStyle') || '',
          bio: searchParams.get('bio') || '',
          xId: searchParams.get('xId') || '',
          discordId: searchParams.get('discordId') || '',
          profileImage: searchParams.get('profileImage') || '',
          background: searchParams.get('background') || 'default',
          theme: (searchParams.get('theme') as 'light' | 'dark') || 'dark',
        })
      }

      setIsLoading(false)
    }

    fetchData()
  }, [searchParams])

  const shareText = formData ? `${formData.playerName}のプロフィールカードを作りました！ #GGprofile` : ''

  const handleSave = async () => {
    if (!formData) return
    setIsSaving(true)
    setSaveError(null)

    const result = await saveCard(formData)

    if (result.error) {
      setSaveError(result.error)
      setIsSaving(false)
      return
    }

    // 保存後はカードIDで表示
    if (result.cardId) {
      setCardId(result.cardId)
    }
    setIsSaving(false)
  }

  // カードIDがあれば保存済み
  const isSaved = !!cardId

  if (isLoading || !formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
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

          {/* 保存状態によって表示を切り替え */}
          <div className="w-full space-y-2">
            {saveError && (
              <p className="text-sm text-red-500 text-center">{saveError}</p>
            )}
            {isSaved ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 py-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>保存済み</span>
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1" size="lg">
                    <Link href={`/create?id=${cardId}`}>
                      <Pencil className="h-4 w-4 mr-2" />
                      編集する
                    </Link>
                  </Button>
                  <Button asChild className="flex-1" size="lg">
                    <Link href="/mypage">マイページを見る</Link>
                  </Button>
                </div>
              </div>
            ) : user ? (
              <Button
                onClick={handleSave}
                className="w-full"
                size="lg"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Save className="h-5 w-5 mr-2" />
                )}
                {isSaving ? '保存中...' : 'マイページに保存'}
              </Button>
            ) : (
              <Button asChild variant="secondary" className="w-full" size="lg">
                <Link
                  href={`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  ログインして保存
                </Link>
              </Button>
            )}
          </div>

          <div className="w-full border-t pt-6 mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {!isSaved && (
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  戻って編集する
                </Button>
              )}
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
