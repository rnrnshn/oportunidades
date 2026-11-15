import { ArrowUpDown, Check, ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'

import { fieldClass } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export type CustomSelectOption<T extends string = string> = {
  value: T
  label: string
}

type CustomSelectProps<T extends string> = {
  id?: string
  autoFocus?: boolean
  value: T
  options: readonly CustomSelectOption<T>[]
  onChange: (value: T) => void
  ariaLabel: string
  className?: string
  variant?: 'field' | 'sort'
}

export function CustomSelect<T extends string>({
  id,
  autoFocus = false,
  value,
  options,
  onChange,
  ariaLabel,
  className,
  variant = 'field',
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))
  const selected = options[selectedIndex]

  function focusOption(index: number) {
    const nextIndex = (index + options.length) % options.length
    optionRefs.current[nextIndex]?.focus()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          data-autofocus={autoFocus || undefined}
          type="button"
          aria-expanded={open}
          aria-label={`${ariaLabel}: ${selected?.label ?? ''}`}
          className={cn(
            'flex h-[var(--field-height)] items-center justify-between gap-3 text-left outline-none',
            variant === 'sort'
              ? 'rounded-md border border-transparent bg-transparent px-2 text-sm font-medium text-[#0049af] transition-colors hover:bg-[#edf5ff] focus-visible:ring-2 focus-visible:ring-[var(--field-focus)] focus-visible:ring-offset-1'
              : fieldClass,
            className
          )}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              setOpen(true)
              window.requestAnimationFrame(() => focusOption(selectedIndex))
            }
          }}
        >
          <span className="truncate">{variant === 'sort' ? 'Ordenar' : selected?.label}</span>
          {variant === 'sort'
            ? <ArrowUpDown className="size-4 shrink-0" aria-hidden="true" />
            : <ChevronDown className={cn('size-4 shrink-0 transition-transform duration-200 ease-out', open && 'rotate-180')} aria-hidden="true" />}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-[var(--radix-popover-trigger-width)] rounded-[var(--field-radius)] border border-[var(--field-line)] bg-white p-1 shadow-lg">
        <fieldset>
          <legend className="sr-only">{ariaLabel}</legend>
          {options.map((option, index) => (
            <button
              key={option.value || 'all'}
              ref={(node) => { optionRefs.current[index] = node }}
              type="button"
              aria-pressed={option.value === value}
              className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm text-[#262626] outline-none hover:bg-[#f5f5f5] focus-visible:bg-[#d6e7ff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0049af] transition-colors duration-150 ease-out"
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  focusOption(index + 1)
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  focusOption(index - 1)
                } else if (event.key === 'Home') {
                  event.preventDefault()
                  focusOption(0)
                } else if (event.key === 'End') {
                  event.preventDefault()
                  focusOption(options.length - 1)
                }
              }}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
            >
              {option.label}
              {option.value === value && <Check className="size-4 text-[#0049af]" aria-hidden="true" />}
            </button>
          ))}
        </fieldset>
      </PopoverContent>
    </Popover>
  )
}
