export type CardTheme = 'light' | 'dark'

export type ProfileCardData = {
  game: string
  playerName: string
  rank: string
  agents: string[]
  playStyle: string
  bio: string
  xId?: string
  discordId?: string
  profileImage?: string
}

export type CardFormData = ProfileCardData & {
  background: string
  theme: CardTheme
}
