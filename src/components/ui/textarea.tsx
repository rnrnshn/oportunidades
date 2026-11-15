import * as React from 'react'

import { cn } from '@/lib/utils'

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'min-h-28 w-full resize-y rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-background)] px-[var(--field-padding-x)] py-3 text-base text-[var(--field-text)] shadow-none outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[var(--field-placeholder)] hover:border-[var(--field-border-hover)] focus-visible:border-[var(--field-focus)] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[var(--field-focus)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[var(--field-disabled)] disabled:text-[#656565] md:text-sm',
        className,
      )}
      {...props}
    />
  )
}
