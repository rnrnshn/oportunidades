import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-5 shrink-0 rounded border border-[#767676] bg-white shadow-none outline-none transition-colors data-[state=checked]:border-[var(--field-focus)] data-[state=checked]:bg-[var(--field-focus)] data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-[var(--field-focus)] focus-visible:ring-offset-2 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive disabled:cursor-not-allowed disabled:bg-[var(--field-disabled)] disabled:opacity-60",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
