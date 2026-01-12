'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  showCreateButton?: boolean
}

export function Header({ showCreateButton = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GGprofile
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          {showCreateButton && (
            <Button asChild>
              <Link href="/create">カードを作る</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
