'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Plus, ExternalLink } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

function MyPageContent() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [])

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
              <p className="text-muted-foreground">カード: 0枚</p>
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

            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <p className="text-muted-foreground mb-4">
                まだカードがありません
              </p>
              <p className="text-sm text-muted-foreground">
                カードを作成すると、ここに表示されます
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              ※ 現在はローカルストレージに保存されません。
              <br />
              Supabase連携後、カードの保存・管理機能が有効になります。
            </p>
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
