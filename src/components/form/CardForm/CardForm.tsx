'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { cardFormSchema, type CardFormValues } from '@/lib/validations/card'
import { GameSelector } from '@/components/form/GameSelector'
import { RankSelector } from '@/components/form/RankSelector'
import { AgentSelector } from '@/components/form/AgentSelector'
import { PlayStyleSelector } from '@/components/form/PlayStyleSelector'
import { BackgroundSelector } from '@/components/form/BackgroundSelector'
import { SnsInput } from '@/components/form/SnsInput'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'

type CardFormProps = {
  onSubmit: (data: CardFormValues) => void
  onChange?: (data: CardFormValues) => void
  initialData?: Partial<CardFormValues>
  isSubmitting?: boolean
}

const defaultValues: CardFormValues = {
  game: 'valorant',
  playerName: '',
  rank: '',
  agents: [],
  playStyle: '',
  bio: '',
  xId: '',
  discordId: '',
  profileImage: '',
  background: 'default',
  theme: 'dark',
}

export function CardForm({
  onSubmit,
  onChange,
  initialData,
  isSubmitting,
}: CardFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: { ...defaultValues, ...initialData },
  })

  const formValues = watch()
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const subscription = watch((value) => {
      onChangeRef.current?.(value as CardFormValues)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const handleGameChange = (game: string) => {
    setValue('game', game)
    setValue('rank', '')
    setValue('agents', [])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <GameSelector
        value={formValues.game}
        onChange={handleGameChange}
        error={errors.game?.message}
        disabled={isSubmitting}
      />

      <div className="space-y-2">
        <Label htmlFor="playerName">ゲーム内ネーム</Label>
        <Input
          id="playerName"
          {...register('playerName')}
          placeholder="プレイヤー名を入力"
          disabled={isSubmitting}
          className={cn(
            errors.playerName && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
        {errors.playerName && (
          <p className="text-sm text-red-500">{errors.playerName.message}</p>
        )}
      </div>

      <RankSelector
        game={formValues.game}
        value={formValues.rank}
        onChange={(value) => setValue('rank', value)}
        error={errors.rank?.message}
        disabled={isSubmitting}
      />

      <AgentSelector
        game={formValues.game}
        value={formValues.agents}
        onChange={(value) => setValue('agents', value)}
        max={3}
        error={errors.agents?.message}
        disabled={isSubmitting}
      />

      <PlayStyleSelector
        value={formValues.playStyle}
        onChange={(value) => setValue('playStyle', value)}
        error={errors.playStyle?.message}
        disabled={isSubmitting}
      />

      <div className="space-y-2">
        <Label htmlFor="bio">ひとこと（100文字以内）</Label>
        <Textarea
          id="bio"
          {...register('bio')}
          placeholder="自己紹介や一緒に遊びたい人への一言など"
          disabled={isSubmitting}
          className={cn(
            'resize-none',
            errors.bio && 'border-red-500 focus-visible:ring-red-500'
          )}
          rows={3}
        />
        <div className="flex justify-between">
          {errors.bio ? (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          ) : (
            <span />
          )}
          <p className="text-sm text-muted-foreground">
            {formValues.bio?.length ?? 0}/100
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SnsInput
          platform="x"
          value={formValues.xId ?? ''}
          onChange={(value) => setValue('xId', value)}
          error={errors.xId?.message}
          disabled={isSubmitting}
        />
        <SnsInput
          platform="discord"
          value={formValues.discordId ?? ''}
          onChange={(value) => setValue('discordId', value)}
          error={errors.discordId?.message}
          disabled={isSubmitting}
        />
      </div>

      <BackgroundSelector
        game={formValues.game}
        value={formValues.background}
        onChange={(value) => setValue('background', value)}
        disabled={isSubmitting}
      />

      <div className="space-y-2">
        <Label>テーマ</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={formValues.theme === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setValue('theme', 'dark')}
            disabled={isSubmitting}
            className="flex-1"
          >
            <Moon className="h-4 w-4 mr-2" />
            ダーク
          </Button>
          <Button
            type="button"
            variant={formValues.theme === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setValue('theme', 'light')}
            disabled={isSubmitting}
            className="flex-1"
          >
            <Sun className="h-4 w-4 mr-2" />
            ライト
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? '作成中...' : 'カードを作成する'}
      </Button>
    </form>
  )
}
