interface SectionHeadingProps {
  id: string
  title: string
  description?: string
  className?: string
  divider?: boolean
}

export function SectionHeading({ id, title, description, className = '', divider = true }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <h2 id={id} className="min-w-0 text-[22px] font-semibold text-[#262626]">
          {title}
        </h2>
        {divider ? <span className="h-px min-w-8 flex-1 bg-[#c7c7c7]" aria-hidden="true" /> : null}
      </div>
      {description ? <p className="mt-2 text-sm text-[#525252]">{description}</p> : null}
    </div>
  )
}
