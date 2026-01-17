'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Github } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#050508] border-t border-[#A78BFA]/10">
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/decorations/star-1.svg"
          alt=""
          width={16}
          height={16}
          className="absolute top-10 right-[15%] opacity-20 animate-twinkle"
        />
        <Image
          src="/assets/decorations/star-2.svg"
          alt=""
          width={12}
          height={12}
          className="absolute bottom-16 left-[10%] opacity-15 animate-twinkle"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/assets/brand/logo-icon.svg"
                alt=""
                width={36}
                height={36}
                className="drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]"
              />
              <span className="text-xl font-black bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#67E8F9] bg-clip-text text-transparent">
                GGprofile
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              ゲーマーのための自己紹介カード作成サービス。
              あなたのゲーマーアイデンティティをシェアしよう!
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#A78BFA]">リンク</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/terms"
                className="text-gray-500 hover:text-[#A78BFA] transition-colors inline-flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-[#A78BFA]" />
                利用規約
              </Link>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-[#A78BFA] transition-colors inline-flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-[#F472B6]" />
                プライバシーポリシー
              </Link>
              <Link
                href="/contact"
                className="text-gray-500 hover:text-[#A78BFA] transition-colors inline-flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-[#67E8F9]" />
                お問い合わせ
              </Link>
            </nav>
          </div>

          {/* Social & Character */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#F472B6]">フォローしてね</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/ggprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 transition-colors group"
              >
                <Twitter className="h-5 w-5 text-gray-500 group-hover:text-[#A78BFA]" />
              </a>
              <a
                href="https://github.com/ggprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#F472B6]/10 hover:bg-[#F472B6]/20 transition-colors group"
              >
                <Github className="h-5 w-5 text-gray-500 group-hover:text-[#F472B6]" />
              </a>
            </div>

            {/* Mini Character - RGB Line version */}
            <div className="pt-4">
              <Image
                src="/assets/characters/minto-line.png"
                alt=""
                width={70}
                height={70}
                className="opacity-40 drop-shadow-[0_0_15px_rgba(103,232,249,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#A78BFA]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} GGprofile. Made with{' '}
            <Image
              src="/assets/decorations/heart.svg"
              alt="love"
              width={12}
              height={12}
              className="inline"
            />{' '}
            for gamers.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse shadow-[0_0_10px_rgba(110,231,183,0.5)]" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
