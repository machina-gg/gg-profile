'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { CardForm } from '@/components/form/CardForm'
import { CardPreview } from '@/components/card/CardPreview'
import { createClient } from '@/lib/supabase/client'
import { updateCard, getCard } from '@/app/actions/card'
import { AuthGuard } from '@/components/auth/AuthGuard'
import type { CardFormValues } from '@/lib/validations/card'

const defaultFormData: CardFormValues = {
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

function EditCardContent() {
  const router = useRouter()
  const params = useParams()
  const cardId = params.id as string
  const cardRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<CardFormValues>(defaultFormData)
  const [initialData, setInitialData] = useState<Partial<CardFormValues>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCard = async () => {
      const result = await getCard(cardId)
      if (result.error || !result.card) {
        setError('カードが見つかりません')
        setIsLoading(false)
        return
      }

      const card = result.card
      const editData: CardFormValues = {
        game: card.game,
        playerName: card.player_name,
        rank: card.rank,
        agents: card.agents,
        playStyle: card.play_style,
        bio: card.bio || '',
        xId: card.x_id || '',
        discordId: card.discord_id || '',
        profileImage: card.profile_image_url || '',
        background: card.background,
        theme: card.theme,
      }
      setInitialData(editData)
      setFormData(editData)
      setIsLoading(false)
    }

    fetchCard()
  }, [cardId])

  const handleFormChange = useCallback((data: CardFormValues) => {
    setFormData(data)
  }, [])

  const handleSubmit = async (data: CardFormValues) => {
    setIsSubmitting(true)

    try {
      const result = await updateCard(cardId, data)

      if (result.error) {
        setError(result.error)
        setIsSubmitting(false)
        return
      }

      router.push(`/cards/${cardId}`)
    } catch (err) {
      console.error('Failed to update card:', err)
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">カードを編集</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="sticky top-24 flex justify-center">
              <CardPreview ref={cardRef} data={formData} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-lg border p-6">
              <CardForm
                key={cardId}
                onSubmit={handleSubmit}
                onChange={handleFormChange}
                initialData={initialData}
                isSubmitting={isSubmitting}
                submitLabel="更新する"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditCardPage() {
  return (
    <AuthGuard>
      <EditCardContent />
    </AuthGuard>
  )
}
