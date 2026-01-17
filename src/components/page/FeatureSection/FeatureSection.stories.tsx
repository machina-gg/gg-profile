import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FeatureSection } from './FeatureSection'

const meta = {
  title: 'Page/FeatureSection',
  component: FeatureSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a2e' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
