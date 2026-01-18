'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getMyCards, deleteCard } from '@/app/actions/card'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { CardPreview } from '@/components/card/CardPreview'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Plus, Trash2, Eye, Pencil } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import type { CardFormValues } from '@/lib/validations/card'

type Card = {
  id: string
  game: string
  player_name: string
  rank: string
  agents: string[]
  play_style: string
  bio: string | null
  x_id: string | null
  discord_id: string | null
  profile_image_url: string | null
  background: string
  theme: 'light' | 'dark'
  created_at: string
}

function MyPageContent() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      const result = await getMyCards()
      if (result.cards) {
        setCards(result.cards as Card[])
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleDelete = async (cardId: string) => {
    if (!confirm('このカードを削除しますか？')) return

    const result = await deleteCard(cardId)
    if (!result.error) {
      setCards(cards.filter((card) => card.id !== cardId))
    }
  }

  // カスタム表示名 > OAuthプロバイダーの名前 > メールアドレス の優先順位
  const userName =
    user?.user_metadata?.custom_display_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'ユーザー'
  const avatarUrl = user?.user_metadata?.avatar_url

  const cardToFormValues = (card: Card): CardFormValues => ({
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


  const providers = user?.app_metadata?.providers as string[] | undefined
  const providerLabels = providers
    ?.map((p) => (p === 'discord' ? 'Discord' : p === 'google' ? 'Google' : p))
    .join(', ')

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* アカウント情報セクション */}
          <div className="bg-card rounded-xl border p-6 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarImage src={avatarUrl} alt={userName} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-[#A78BFA] to-[#F472B6] text-white">
                  {userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{userName}</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    連携: {providerLabels || '不明'}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    カード: {cards.length}枚
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/mypage/edit">
                    <Pencil className="h-4 w-4 mr-2" />
                    編集
                  </Link>
                </Button>
                <LogoutButton variant="ghost" size="sm" />
              </div>
            </div>
          </div>

          {/* 新規作成ボタン */}
          <Button
            onClick={() => router.push('/create')}
            size="lg"
            className="w-full mb-8 bg-gradient-to-r from-[#A78BFA] to-[#F472B6] hover:from-[#A78BFA]/90 hover:to-[#F472B6]/90"
          >
            <Plus className="h-5 w-5 mr-2" />
            新しいカードを作る
          </Button>

          {/* マイカードセクション */}
          <div>
            <h2 className="text-lg font-semibold mb-4">マイカード</h2>

            {isLoading ? (
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">読み込み中...</p>
              </div>
            ) : cards.length === 0 ? (
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  まだカードがありません
                </p>
                <p className="text-sm text-muted-foreground">
                  カードを作成すると、ここに表示されます
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {cards.map((card) => (
                  <div key={card.id} className="relative group">
                    {/* カードプレビュー */}
                    <div className="transform scale-[0.85] origin-top">
                      <CardPreview data={cardToFormValues(card)} />
                    </div>

                    {/* オーバーレイアクション */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/cards/${card.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            見る
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/cards/${card.id}/edit`}>
                            <Pencil className="h-4 w-4 mr-2" />
                            編集
                          </Link>
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(card.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        削除
                      </Button>
                    </div>

                    {/* 作成日 */}
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      {new Date(card.created_at).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MyPage() {
  return (
    <AuthGuard>
      <MyPageContent />
    </AuthGuard>
  )
}
