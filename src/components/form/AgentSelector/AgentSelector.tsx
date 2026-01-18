'use client'

import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { VALORANT_AGENTS } from '@/data/valorant'
import { cn } from '@/lib/utils'
import { X, Plus } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

type AgentSelectorProps = {
  game: string
  value: string[]
  onChange: (value: string[]) => void
  max?: number
  error?: string
  disabled?: boolean
}

export function AgentSelector({
  game,
  value,
  onChange,
  max = 3,
  error,
  disabled,
}: AgentSelectorProps) {
  const [open, setOpen] = useState(false)

  const getAgents = () => {
    switch (game) {
      case 'valorant':
        return VALORANT_AGENTS
      default:
        return []
    }
  }

  const agents = getAgents()

  const groupedAgents = agents.reduce(
    (acc, agent) => {
      if (!acc[agent.role]) {
        acc[agent.role] = []
      }
      acc[agent.role].push(agent)
      return acc
    },
    {} as Record<string, typeof agents>
  )

  const handleSelect = (agentId: string) => {
    if (value.includes(agentId)) {
      onChange(value.filter((id) => id !== agentId))
    } else if (value.length < max) {
      onChange([...value, agentId])
    }
  }

  const handleRemove = (agentId: string) => {
    onChange(value.filter((id) => id !== agentId))
  }

  const getAgentName = (agentId: string) => {
    return agents.find((a) => a.id === agentId)?.name ?? agentId
  }

  return (
    <div className="space-y-2">
      <Label>メインキャラクター（最大{max}人）</Label>
      <div className="flex flex-wrap gap-2">
        {value.map((agentId) => (
          <Badge
            key={agentId}
            variant="secondary"
            className="pl-3 pr-1 py-1 flex items-center gap-1"
          >
            {getAgentName(agentId)}
            <button
              type="button"
              onClick={() => handleRemove(agentId)}
              className="ml-1 hover:bg-white/20 rounded-full p-0.5"
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {value.length < max && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || !game}
                className={cn(error && 'border-red-500')}
              >
                <Plus className="h-4 w-4 mr-1" />
                追加
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="max-h-[300px] overflow-y-auto p-2">
                {Object.entries(groupedAgents).map(([role, roleAgents]) => (
                  <div key={role} className="mb-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-1 px-2">
                      {role}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {roleAgents.map((agent) => (
                        <Button
                          key={agent.id}
                          type="button"
                          variant={
                            value.includes(agent.id) ? 'default' : 'ghost'
                          }
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            handleSelect(agent.id)
                            if (
                              !value.includes(agent.id) &&
                              value.length + 1 >= max
                            ) {
                              setOpen(false)
                            }
                          }}
                          disabled={
                            !value.includes(agent.id) && value.length >= max
                          }
                        >
                          {agent.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
