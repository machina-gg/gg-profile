'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { updateProfile } from '@/app/actions/card'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Save } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

function EditProfileContent() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      // カスタム表示名があればそれを、なければOAuthの名前を初期値に
      const name =
        user?.user_metadata?.custom_display_name ||
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email?.split('@')[0] ||
        ''
      setDisplayName(name)
      setIsLoading(false)
    }

    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    const result = await updateProfile(displayName.trim())

    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'プロフィールを更新しました' })
      setTimeout(() => {
        router.push('/mypage')
        router.refresh()
      }, 1000)
    }

    setIsSaving(false)
  }

  const avatarUrl = user?.user_metadata?.avatar_url
  // カスタム表示名 > OAuthプロバイダーの名前 > メールアドレス の優先順位
  const currentName =
    user?.user_metadata?.custom_display_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'ユーザー'

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl border p-6 text-center">
              <p className="text-muted-foreground">読み込み中...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* 戻るボタン */}
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/mypage">
              <ArrowLeft className="h-4 w-4 mr-2" />
              マイページに戻る
            </Link>
          </Button>

          <div className="bg-card rounded-xl border p-6">
            <h1 className="text-xl font-bold mb-6">プロフィール編集</h1>

            {/* 現在のプロフィール */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={avatarUrl} alt={currentName} />
                <AvatarFallback className="text-xl bg-gradient-to-br from-[#A78BFA] to-[#F472B6] text-white">
                  {currentName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentName}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            {/* 編集フォーム */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">表示名</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="表示名を入力"
                  maxLength={50}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  マイページやカードで表示される名前です
                </p>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === 'success'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/mypage')}
                  disabled={isSaving}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#A78BFA] to-[#F472B6] hover:from-[#A78BFA]/90 hover:to-[#F472B6]/90"
                  disabled={isSaving || !displayName.trim()}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? '保存中...' : '保存'}
                </Button>
              </div>
            </form>

            {/* 注意事項 */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground">
                ※ アバター画像はログインプロバイダー（Discord/Google）の設定から変更できます
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditProfilePage() {
  return (
    <AuthGuard>
      <EditProfileContent />
    </AuthGuard>
  )
}
