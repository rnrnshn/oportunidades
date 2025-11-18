type ImagePlaceholderProps = {
  label?: string
  className?: string
}

export default function ImagePlaceholder({
  label = 'Imagem',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-md border border-dashed border-blue bg-placeholder text-xs font-semibold uppercase tracking-widest text-indigo-soft ${className}`}
    >
      {label}
    </div>
  )
}
