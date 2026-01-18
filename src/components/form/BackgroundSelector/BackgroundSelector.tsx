'use client'

import { Label } from '@/components/ui/label'
import { VALORANT_BACKGROUNDS } from '@/data/valorant'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

type BackgroundSelectorProps = {
  game: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function BackgroundSelector({
  game,
  value,
  onChange,
  disabled,
}: BackgroundSelectorProps) {
  const getBackgrounds = () => {
    switch (game) {
      case 'valorant':
        return VALORANT_BACKGROUNDS
      default:
        return []
    }
  }

  const backgrounds = getBackgrounds()

  return (
    <div className="space-y-2">
      <Label>背景</Label>
      <div className="flex flex-wrap gap-2">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            type="button"
            onClick={() => onChange(bg.id)}
            disabled={disabled || !game}
            className={cn(
              'relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all',
              value === bg.id
                ? 'border-primary ring-2 ring-primary ring-offset-2'
                : 'border-transparent hover:border-muted-foreground/30'
            )}
          >
            <div
              className={cn('absolute inset-0 bg-gradient-to-br', bg.color)}
            />
            {value === bg.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
