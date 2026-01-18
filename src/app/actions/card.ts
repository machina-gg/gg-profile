'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { CardFormValues } from '@/lib/validations/card'

export async function saveCard(data: CardFormValues) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'ログインが必要です' }
  }

  const { error } = await supabase.from('cards').insert({
    user_id: user.id,
    game: data.game,
    player_name: data.playerName,
    rank: data.rank,
    agents: data.agents,
    play_style: data.playStyle,
    bio: data.bio || null,
    x_id: data.xId || null,
    discord_id: data.discordId || null,
    profile_image_url: data.profileImage || null,
    background: data.background,
    theme: data.theme,
  })

  if (error) {
    console.error('[saveCard] Error:', error)
    return { error: 'カードの保存に失敗しました' }
  }

  revalidatePath('/mypage')
  return { success: true }
}

export async function getMyCards() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'ログインが必要です', cards: [] }
  }

  const { data: cards, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getMyCards] Error:', error)
    return { error: 'カードの取得に失敗しました', cards: [] }
  }

  return { cards }
}

export async function deleteCard(cardId: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'ログインが必要です' }
  }

  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', cardId)
    .eq('user_id', user.id)

  if (error) {
    console.error('[deleteCard] Error:', error)
    return { error: 'カードの削除に失敗しました' }
  }

  revalidatePath('/mypage')
  return { success: true }
}
