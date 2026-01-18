'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Upload, X, User } from 'lucide-react'
import { uploadProfileImage } from '@/app/actions/upload'

type Preset = {
  id: string
  url: string
  label: string
}

type ImageUploaderProps = {
  value?: string
  onChange: (url: string) => void
  presets?: Preset[]
  error?: string
  disabled?: boolean
}

const DEFAULT_PRESETS: Preset[] = [
  { id: 'none', url: '', label: 'なし' },
  {
    id: 'pikaru',
    url: '/assets/characters/pikaru-icon.png',
    label: 'ぴかる',
  },
  {
    id: 'neon',
    url: '/assets/characters/neon-icon.png',
    label: 'ねおん',
  },
  {
    id: 'minto',
    url: '/assets/characters/minto-icon.png',
    label: 'みんと',
  },
]

export function ImageUploader({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  error,
  disabled,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルサイズチェック（2MB）
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('ファイルサイズは2MB以下にしてください')
      return
    }

    // ファイルタイプチェック
    if (!file.type.startsWith('image/')) {
      setUploadError('画像ファイルを選択してください')
      return
    }

    setUploadError(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadProfileImage(formData)

      if (result.error) {
        setUploadError(result.error)
      } else if (result.url) {
        onChange(result.url)
      }
    } catch (err) {
      setUploadError('アップロードに失敗しました')
      console.error('Upload error:', err)
    } finally {
      setIsUploading(false)
    }

    // 同じファイルを選択できるようにリセット
    e.target.value = ''
  }

  const handlePresetClick = (preset: Preset) => {
    onChange(preset.url)
  }

  const handleClear = () => {
    onChange('')
  }

  const isCustomImage =
    value && !presets.some((p) => p.url === value) && value !== ''

  return (
    <div className="space-y-3">
      <Label>プロフィール画像</Label>

      {/* プレビュー */}
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'relative w-20 h-20 rounded-full overflow-hidden border-2 flex items-center justify-center',
            'bg-muted',
            error ? 'border-red-500' : 'border-border'
          )}
        >
          {value ? (
            <Image
              src={value}
              alt="プロフィール画像"
              fill
              className="object-cover"
              unoptimized={value.startsWith('data:')}
            />
          ) : (
            <User className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        {isCustomImage && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={disabled}
          >
            <X className="w-4 h-4 mr-1" />
            削除
          </Button>
        )}
      </div>

      {/* プリセット選択 */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handlePresetClick(preset)}
            disabled={disabled}
            className={cn(
              'relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all',
              'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              value === preset.url
                ? 'border-primary ring-2 ring-primary ring-offset-2'
                : 'border-border hover:border-primary/50',
              preset.url === '' && 'bg-muted flex items-center justify-center'
            )}
            title={preset.label}
          >
            {preset.url ? (
              <Image
                src={preset.url}
                alt={preset.label}
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        ))}

        {/* アップロードボタン */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className={cn(
            'relative w-12 h-12 rounded-full overflow-hidden border-2 border-dashed transition-all',
            'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'border-border hover:border-primary/50 bg-muted/50',
            'flex items-center justify-center'
          )}
          title="画像をアップロード"
        >
          <Upload
            className={cn(
              'w-5 h-5 text-muted-foreground',
              isUploading && 'animate-pulse'
            )}
          />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled || isUploading}
        />
      </div>

      {(error || uploadError) && (
        <p className="text-sm text-red-500">{error || uploadError}</p>
      )}

      <p className="text-xs text-muted-foreground">
        プリセットから選択するか、画像をアップロードしてください（2MB以下）
      </p>
    </div>
  )
}
