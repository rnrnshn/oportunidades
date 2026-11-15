import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-[var(--field-placeholder)] selection:bg-primary selection:text-primary-foreground h-[var(--field-height)] w-full min-w-0 rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-background)] px-[var(--field-padding-x)] py-2 text-base text-[var(--field-text)] shadow-none outline-none transition-[border-color,box-shadow,background-color] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--field-disabled)] disabled:text-[#656565] md:text-sm",
        "hover:border-[var(--field-border-hover)] focus-visible:border-[var(--field-focus)] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[var(--field-focus)] focus-visible:ring-offset-1",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
