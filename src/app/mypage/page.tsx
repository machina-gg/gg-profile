'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getMyCards, deleteCard } from '@/app/actions/card'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Plus, ExternalLink, Trash2, Eye } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

type Card = {
  id: string
  game: string
  player_name: string
  rank: string
  agents: string[]
  play_style: string
  bio: string | null
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

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'ユーザー'
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback className="text-xl">
                {userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{userName}</h1>
              <p className="text-muted-foreground">カード: {cards.length}枚</p>
            </div>
          </div>

          <Button
            onClick={() => router.push('/create')}
            size="lg"
            className="w-full mb-8"
          >
            <Plus className="h-5 w-5 mr-2" />
            新しいカードを作る
          </Button>

          <div className="border-t pt-6">
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
              <div className="grid gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{card.player_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {card.rank} / {card.play_style}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(card.created_at).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/cards/${card.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(card.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-6 mt-8">
            <h2 className="text-lg font-semibold mb-4">アカウント</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">ログインプロバイダー</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.app_metadata?.provider === 'discord'
                      ? 'Discord'
                      : user?.app_metadata?.provider === 'google'
                        ? 'Google'
                        : '不明'}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>

              <LogoutButton variant="outline" className="w-full" />
            </div>
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
