import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

// Label, hint and error sizes match the dashboard: 13px, medium label, 8px above the field.
export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label className={cn('mb-2 block text-xs font-medium leading-[1.7] text-navy', className)} {...props} />
}

export function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null
  return <p id={id} className="mt-1 text-xs text-danger">{message}</p>
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: ReactNode
  htmlFor?: string
  hint?: ReactNode
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('min-w-0', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <FieldError id={htmlFor ? `${htmlFor}-error` : undefined} message={error} />
      ) : hint ? (
        <p id={htmlFor ? `${htmlFor}-hint` : undefined} className="mt-1 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  )
}
