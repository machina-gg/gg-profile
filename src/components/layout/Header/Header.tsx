'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  showCreateButton?: boolean
}

export function Header({ showCreateButton = true }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full bg-[#0a0a12]/90 backdrop-blur-md border-b border-[#A78BFA]/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          {/* Logo Icon */}
          <div className="relative">
            <Image
              src="/assets/brand/logo-icon.svg"
              alt=""
              width={32}
              height={32}
              className="group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
            />
          </div>
          {/* Logo Text */}
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
        </nav>
      </div>
    </header>
  )
}
