import { z } from 'zod'

export const cardFormSchema = z.object({
  game: z.string().min(1, 'ゲームを選択してください'),
  playerName: z
    .string()
    .min(1, 'ゲーム内ネームを入力してください')
    .max(20, 'ゲーム内ネームは20文字以内で入力してください'),
  rank: z.string().min(1, 'ランクを選択してください'),
  agents: z
    .array(z.string())
    .min(1, 'メインキャラクターを1つ以上選択してください')
    .max(3, 'メインキャラクターは3つまで選択できます'),
  playStyle: z.string().min(1, 'プレイスタイルを選択してください'),
  bio: z
    .string()
    .max(100, 'ひとことは100文字以内で入力してください')
    .optional(),
  xId: z
    .string()
    .regex(/^[a-zA-Z0-9_]*$/, '英数字とアンダースコアのみ使用できます')
    .max(15, 'X IDは15文字以内で入力してください')
    .optional()
    .or(z.literal('')),
  discordId: z
    .string()
    .max(32, 'Discord IDは32文字以内で入力してください')
    .optional()
    .or(z.literal('')),
  profileImage: z.string().optional(),
  background: z.string(),
  theme: z.enum(['light', 'dark']),
})

export type CardFormValues = z.infer<typeof cardFormSchema>
