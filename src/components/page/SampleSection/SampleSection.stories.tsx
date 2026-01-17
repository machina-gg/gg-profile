import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SampleSection } from './SampleSection'

const meta = {
  title: 'Page/SampleSection',
  component: SampleSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a2e' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SampleSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
