'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import { User, LogOut, LayoutDashboard } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

type HeaderProps = {
  showCreateButton?: boolean
}

export function Header({ showCreateButton = true }: HeaderProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'ユーザー'
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <header className="fixed top-0 z-50 w-full bg-[#0a0a12]/90 backdrop-blur-md border-b border-[#A78BFA]/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <Image
              src="/assets/brand/logo-icon.svg"
              alt=""
              width={32}
              height={32}
              className="group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
            />
          </div>
          <span className="text-xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#67E8F9] bg-clip-text text-transparent">
              GGprofile
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {showCreateButton && (
            <Button
              asChild
              className="text-sm px-5 py-2 bg-gradient-to-r from-[#A78BFA] to-[#F472B6] hover:from-[#A78BFA]/90 hover:to-[#F472B6]/90 text-white font-bold rounded-full shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.5)] transition-all duration-300"
            >
              <Link href="/create" className="flex items-center gap-2">
                <Image
                  src="/assets/decorations/sparkle-1.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span className="hidden sm:inline">カードを作る</span>
                <span className="sm:hidden">作成</span>
              </Link>
            </Button>
          )}

          {/* 認証状態によって表示を切り替え */}
          {isLoading ? (
            <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 hover:ring-2 hover:ring-[#A78BFA]/50"
                >
                  <Avatar className="h-9 w-9 border border-white/20">
                    <AvatarImage src={avatarUrl} alt={userName} />
                    <AvatarFallback className="bg-gradient-to-br from-[#A78BFA] to-[#F472B6] text-white text-sm">
                      {userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/mypage" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    マイページ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="text-sm text-white/80 hover:text-white hover:bg-white/10"
            >
              <Link href="/login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">ログイン</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
