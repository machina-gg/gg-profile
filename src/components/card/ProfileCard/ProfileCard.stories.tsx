import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProfileCard } from './ProfileCard'

const meta = {
  title: 'Card/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    background: {
      control: 'select',
      options: ['default', 'gradient-purple', 'gradient-red', 'gradient-cyan'],
    },
  },
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = {
  game: 'VALORANT',
  playerName: 'GamerTag123',
  rank: 'diamond2',
  agents: ['jett', 'reyna'],
  playStyle: 'ranked',
  bio: '一緒にランク回れる人募集中！気軽にフォローしてください。',
  xId: 'gamer_x',
  discordId: 'gamer#1234',
}

export const Default: Story = {
  args: {
    data: sampleData,
    background: 'default',
    theme: 'dark',
  },
}

export const WithImage: Story = {
  args: {
    data: {
      ...sampleData,
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer',
    },
    background: 'default',
    theme: 'dark',
  },
}

export const PurpleBackground: Story = {
  args: {
    data: sampleData,
    background: 'gradient-purple',
    theme: 'dark',
  },
}

export const RedBackground: Story = {
  args: {
    data: sampleData,
    background: 'gradient-red',
    theme: 'dark',
  },
}

export const CyanBackground: Story = {
  args: {
    data: sampleData,
    background: 'gradient-cyan',
    theme: 'dark',
  },
}

export const MultipleAgents: Story = {
  args: {
    data: {
      ...sampleData,
      agents: ['jett', 'reyna', 'sage'],
    },
    background: 'default',
    theme: 'dark',
  },
}

export const HighRank: Story = {
  args: {
    data: {
      ...sampleData,
      rank: 'radiant',
      bio: 'プロ志望です。大会で結果を残したい！',
      playStyle: 'competitive',
    },
    background: 'gradient-purple',
    theme: 'dark',
  },
}

export const MinimalInfo: Story = {
  args: {
    data: {
      game: 'VALORANT',
      playerName: 'CasualPlayer',
      rank: 'gold1',
      agents: ['sage'],
      playStyle: 'casual',
      bio: '',
    },
    background: 'default',
    theme: 'dark',
  },
}
