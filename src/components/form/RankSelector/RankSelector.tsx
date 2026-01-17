'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { VALORANT_RANKS } from '@/data/valorant'
import { cn } from '@/lib/utils'

type RankSelectorProps = {
  game: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function RankSelector({
  game,
  value,
  onChange,
  error,
  disabled,
}: RankSelectorProps) {
  const getRanks = () => {
    switch (game) {
      case 'valorant':
        return VALORANT_RANKS
      default:
        return []
    }
  }

  const ranks = getRanks()

  return (
    <div className="space-y-2">
      <Label htmlFor="rank">ランク</Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled || !game}
      >
        <SelectTrigger
          id="rank"
          className={cn(error && 'border-red-500 focus:ring-red-500')}
        >
          <SelectValue placeholder="ランクを選択" />
        </SelectTrigger>
        <SelectContent>
          {ranks.map((rank) => (
            <SelectItem key={rank.id} value={rank.id}>
              {rank.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
