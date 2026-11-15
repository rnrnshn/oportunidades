import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface MultiSelectProps {
  label?: string
  ariaLabel?: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  label,
  ariaLabel,
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
            aria-label={ariaLabel ?? label ?? placeholder}
            className="h-[var(--field-height)] w-full justify-between rounded-[var(--field-radius)] border-[var(--field-border)] bg-[var(--field-background)] px-[var(--field-padding-x)] font-normal shadow-none hover:border-[var(--field-border-hover)] hover:bg-white focus-visible:border-[var(--field-focus)] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[var(--field-focus)] focus-visible:ring-offset-1"
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
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
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
