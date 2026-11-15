import { Star } from 'lucide-react'
import { Checkbox } from './checkbox'
import { cn } from '@/lib/utils'

interface RatingsFilterProps {
  value: number[]
  onChange: (value: number[]) => void
  options?: number[]
  className?: string
}

export function RatingsFilter({
  value,
  onChange,
  options = [5, 4, 3, 2, 1],
  className,
}: RatingsFilterProps) {
  const handleCheck = (rating: number, checked: boolean) => {
    if (checked) {
      onChange([...value, rating])
    } else {
      onChange(value.filter((v) => v !== rating))
    }
  }

  return (
    <div className={cn('grid grid-cols-2 gap-2', className)}>
      {options.map((rating) => (
        <label
          key={rating}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-soft bg-canvas-soft px-3 py-2 text-sm text-navy transition-colors hover:border-brand/40"
        >
          <Checkbox
            checked={value.includes(rating)}
            onCheckedChange={(checked) => handleCheck(rating, checked as boolean)}
            aria-label={`${rating} estrelas`}
          />
          <span className="flex items-center gap-1 font-medium">
            {rating}
            <Star className="h-4 w-4 fill-brand text-brand" aria-hidden="true" />
          </span>
        </label>
      ))}
    </div>
  )
}
