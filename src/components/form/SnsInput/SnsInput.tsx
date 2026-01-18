'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Twitter, MessageCircle } from 'lucide-react'

type SnsInputProps = {
  platform: 'x' | 'discord'
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

const platformConfig = {
  x: {
    label: 'X (Twitter)',
    placeholder: 'username',
    prefix: '@',
    icon: Twitter,
  },
  discord: {
    label: 'Discord',
    placeholder: 'username',
    prefix: '',
    icon: MessageCircle,
  },
}

export function SnsInput({
  platform,
  value,
  onChange,
  error,
  disabled,
}: SnsInputProps) {
  const config = platformConfig[platform]
  const Icon = config.icon

  return (
    <div className="space-y-2">
      <Label htmlFor={`sns-${platform}`}>{config.label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id={`sns-${platform}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config.placeholder}
          disabled={disabled}
          className={cn(
            'pl-10',
            error && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
        {config.prefix && (
          <span className="absolute left-9 top-1/2 -translate-y-1/2 text-muted-foreground">
            {config.prefix}
          </span>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
