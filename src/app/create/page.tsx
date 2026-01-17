'use client'

import { useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CardForm } from '@/components/form/CardForm'
import { CardPreview } from '@/components/card/CardPreview'
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

export default function CreatePage() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<CardFormValues>(defaultFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormChange = useCallback((data: CardFormValues) => {
    setFormData(data)
  }, [])

  const handleSubmit = async (data: CardFormValues) => {
    setIsSubmitting(true)

    try {
      const params = new URLSearchParams()
      params.set('game', data.game)
      params.set('playerName', data.playerName)
      params.set('rank', data.rank)
      params.set('agents', data.agents.join(','))
      params.set('playStyle', data.playStyle)
      if (data.bio) params.set('bio', data.bio)
      if (data.xId) params.set('xId', data.xId)
      if (data.discordId) params.set('discordId', data.discordId)
      if (data.profileImage) params.set('profileImage', data.profileImage)
      params.set('background', data.background)
      params.set('theme', data.theme)

      router.push(`/preview?${params.toString()}`)
    } catch (error) {
      console.error('Failed to create card:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          プロフィールカードを作成
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="sticky top-24 flex justify-center">
              <CardPreview ref={cardRef} data={formData} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-lg border p-6">
              <CardForm
                onSubmit={handleSubmit}
                onChange={handleFormChange}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
