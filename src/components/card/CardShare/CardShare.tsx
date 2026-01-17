'use client'

import { useCallback } from 'react'
import { toPng } from 'html-to-image'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Download, Copy, Share2 } from 'lucide-react'

type CardShareProps = {
  cardRef: React.RefObject<HTMLDivElement | null>
  shareUrl?: string
  shareText?: string
  playerName?: string
}

export function CardShare({
  cardRef,
  shareUrl,
  shareText,
  playerName = 'Player',
}: CardShareProps) {
  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      })

      const link = document.createElement('a')
      link.download = `ggprofile-${playerName}.png`
      link.href = dataUrl
      link.click()

      toast.success('画像をダウンロードしました')
    } catch (error) {
      console.error('Failed to download image:', error)
      toast.error('ダウンロードに失敗しました')
    }
  }, [cardRef, playerName])

  const handleCopyUrl = useCallback(async () => {
    if (!shareUrl) return

    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('URLをコピーしました')
    } catch (error) {
      console.error('Failed to copy URL:', error)
      toast.error('コピーに失敗しました')
    }
  }, [shareUrl])

  const handleShareX = useCallback(() => {
    const text = shareText || 'GGprofileでプロフィールカードを作りました！'
    const url = shareUrl || window.location.origin

    const xUrl = new URL('https://x.com/intent/tweet')
    xUrl.searchParams.set('text', text)
    xUrl.searchParams.set('url', url)

    window.open(xUrl.toString(), '_blank', 'noopener,noreferrer')
  }, [shareText, shareUrl])

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Button onClick={handleDownload} size="lg" className="w-full">
        <Download className="h-5 w-5 mr-2" />
        画像をダウンロード
      </Button>

      {shareUrl && (
        <>
          <Button
            onClick={handleCopyUrl}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Copy className="h-5 w-5 mr-2" />
            URLをコピー
          </Button>
          <p className="text-xs text-muted-foreground text-center truncate px-2">
            {shareUrl}
          </p>
        </>
      )}

      <Button
        onClick={handleShareX}
        variant="secondary"
        size="lg"
        className="w-full"
      >
        <Share2 className="h-5 w-5 mr-2" />
        Xでシェアする
      </Button>
    </div>
  )
}
