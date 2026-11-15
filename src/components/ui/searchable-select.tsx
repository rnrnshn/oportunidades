import { Check } from 'lucide-react'
import { useId, useRef, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { CustomSelectOption } from '@/components/ui/custom-select'
import { Input } from '@/components/ui/input'

type SearchableSelectProps = {
  label: string
  value: string
  query: string
  options: readonly CustomSelectOption[]
  placeholder: string
  onQueryChange: (query: string) => void
  onChange: (value: string) => void
}

export function SearchableSelect({ label, value, query, options, placeholder, onQueryChange, onChange }: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const inputId = useId()
  const optionsId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const filteredOptions = options.filter((option) => !option.value || option.label.toLocaleLowerCase('pt').includes(query.toLocaleLowerCase('pt')))

  function focusOption(index: number) {
    const nextIndex = (index + filteredOptions.length) % filteredOptions.length
    optionRefs.current[nextIndex]?.focus()
  }

  return (
    <div>
      <label htmlFor={inputId} className="block text-xs font-medium leading-[1.7] text-navy">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
              ref={inputRef}
              type="text"
              id={inputId}
              role="combobox"
              aria-expanded={open}
              aria-controls={optionsId}
              aria-autocomplete="list"
              value={query}
              placeholder={placeholder}
              onFocus={() => setOpen(true)}
              onChange={(event) => { onQueryChange(event.target.value); onChange(''); setOpen(true) }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); window.requestAnimationFrame(() => focusOption(0)) }
              }}
            />
        </PopoverTrigger>
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} onCloseAutoFocus={(event) => event.preventDefault()} align="start" sideOffset={4} className="w-[var(--radix-popover-trigger-width)] rounded-[var(--field-radius)] border border-[var(--field-border)] bg-white p-1 shadow-lg">
          <div id={optionsId} role="listbox" aria-label={label} className="max-h-64 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <button
                key={option.value || 'all'}
                ref={(node) => { optionRefs.current[index] = node }}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') { event.preventDefault(); focusOption(index + 1) }
                  if (event.key === 'ArrowUp') { event.preventDefault(); index === 0 ? inputRef.current?.focus() : focusOption(index - 1) }
                }}
                onClick={() => { onChange(option.value); onQueryChange(option.value ? option.label : ''); setOpen(false) }}
                className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[#262626] hover:bg-[#f5f5f5] focus-visible:bg-[#d6e7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0049af]"
              >
                <span>{option.label}</span>
                {option.value === value && <Check className="size-4 text-[#0049af]" aria-hidden="true" />}
              </button>
            ))}
            {filteredOptions.length === 0 && <p className="px-3 py-4 text-sm text-[#656565]">Nenhuma universidade encontrada.</p>}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
