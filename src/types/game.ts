export type Rank = {
  id: string
  name: string
  tier?: number
  icon?: string
}

export type Agent = {
  id: string
  name: string
  role: string
  icon?: string
}

export type Background = {
  id: string
  name: string
  url: string
  color?: string
}

export type Game = {
  id: string
  name: string
  icon?: string
}
