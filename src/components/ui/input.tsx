import * as React from "react"

import { cn } from "@/lib/utils"

// One field style for inputs, textareas and select triggers. Mirrors the dashboard's form fields.
export const fieldClass =
  "w-full min-w-0 rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-background)] px-[var(--field-padding-x)] text-base text-[var(--field-text)] shadow-none outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[var(--field-placeholder)] hover:border-[var(--field-border-hover)] focus:border-[var(--field-focus)] aria-invalid:border-[var(--field-invalid)] aria-invalid:hover:border-[var(--field-invalid)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--field-disabled)] disabled:text-[#656565]"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        fieldClass,
        "h-[var(--field-height)] py-2 selection:bg-primary selection:text-primary-foreground file:mr-3 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--field-text)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
