export const PLAY_STYLES = [
  { id: 'casual', name: 'カジュアル' },
  { id: 'ranked', name: 'ランク' },
  { id: 'competitive', name: '大会志向' },
  { id: 'content', name: '配信・動画' },
] as const

export type PlayStyle = (typeof PLAY_STYLES)[number]['id']
