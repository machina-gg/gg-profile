'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { GAMES } from '@/data/games'
import { cn } from '@/lib/utils'

type GameSelectorProps = {
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function GameSelector({
  value,
  onChange,
  error,
  disabled,
}: GameSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="game">ゲーム</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id="game"
          className={cn(error && 'border-red-500 focus:ring-red-500')}
        >
          <SelectValue placeholder="ゲームを選択" />
        </SelectTrigger>
        <SelectContent>
          {GAMES.map((game) => (
            <SelectItem key={game.id} value={game.id}>
              {game.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
