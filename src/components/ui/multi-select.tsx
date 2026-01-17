import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface MultiSelectProps {
  label?: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select items',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option])
    } else {
      onChange(value.filter((item) => item !== option))
    }
  }

  const activeCount = value.length

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-semibold text-navy">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-11 w-full justify-between rounded-lg border-soft bg-white px-3 font-normal hover:bg-white"
          >
            <span className={cn('truncate', activeCount === 0 && 'text-muted')}>
              {activeCount > 0
                ? `${activeCount} selecionado${activeCount > 1 ? 's' : ''}`
                : placeholder}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="min-w-full p-0"
          align="start"
          style={{ width: 'var(--radix-popover-trigger-width)' }}
        >
          <div className="max-h-64 overflow-y-auto p-1">
            {options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center justify-start gap-2 rounded-sm px-2 py-2 text-sm text-navy hover:bg-canvas-soft hover:text-brand"
              >
                <Checkbox
                  checked={value.includes(option)}
                  onCheckedChange={(checked) => handleSelect(option, checked as boolean)}
                />
                <span className="flex-1 truncate">{option}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
