'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { PLAY_STYLES } from '@/data/playstyles'
import { cn } from '@/lib/utils'

type PlayStyleSelectorProps = {
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function PlayStyleSelector({
  value,
  onChange,
  error,
  disabled,
}: PlayStyleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="playStyle">プレイスタイル</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id="playStyle"
          className={cn(error && 'border-red-500 focus:ring-red-500')}
        >
          <SelectValue placeholder="プレイスタイルを選択" />
        </SelectTrigger>
        <SelectContent>
          {PLAY_STYLES.map((style) => (
            <SelectItem key={style.id} value={style.id}>
              {style.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
