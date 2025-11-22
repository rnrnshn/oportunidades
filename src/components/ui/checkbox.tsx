import React from 'react'

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={`h-5 w-5 appearance-none rounded border border-muted bg-white text-brand transition checked:border-brand checked:bg-brand checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath d='M6.173 13.414 2.05 9.293l1.414-1.414 2.709 2.709 6.364-6.364 1.414 1.414-7.778 7.778Z'/%3E%3C/svg%3E\")] bg-[length:12px_12px] bg-center bg-no-repeat focus:outline-none focus:ring-2 focus:ring-brand ${className}`}
      {...props}
    />
  ),
)

Checkbox.displayName = 'Checkbox'
