import { MIN_AMOUNT, MAX_AMOUNT, AMOUNT_STEP } from '../types'
import { CustomSelect } from '@/components/ui/custom-select'

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
    maximumFractionDigits: 0,
  }).format(value)
}

export function SelectField({
  label,
  placeholder,
  value,
  options,
  onChange,
  formatOption,
}: {
  label: string
  placeholder?: string
  value: string
  options: string[]
  formatOption?: (value: string) => string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium leading-[1.7] text-navy">{label}</label>
      <CustomSelect
        value={value}
        onChange={onChange}
        ariaLabel={label}
        className="w-full"
        options={[
          { value: '', label: placeholder ?? 'Seleciona' },
          ...options.map((option) => ({ value: option, label: formatOption ? formatOption(option) : option })),
        ]}
      />
    </div>
  )
}

export function RangeSlider({
  value,
  onChange,
  label = 'Valor',
}: {
  value: [number, number]
  onChange: (value: [number, number]) => void
  label?: string
}) {
  const [minValue, maxValue] = value
  const minPercent = ((minValue - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100
  const maxPercent = ((maxValue - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100

  return (
    <div className="space-y-1">
      <div className="relative h-20" aria-hidden="true">
        <div className="absolute inset-x-2 bottom-3 flex h-14 items-end gap-[2px]">
          {[18, 27, 24, 34, 29, 41, 36, 48, 44, 55, 51, 46, 39, 35, 30, 26, 22, 19, 15, 12, 9, 7].map((height, index) => (
            <span key={index} className="min-w-0 flex-1 rounded-t-sm bg-[#e5e7eb]" style={{ height: `${height}px` }} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-3 h-1.5 rounded-full bg-[#d3dae6]" />
        <div
          className="absolute bottom-3 h-1.5 rounded-full bg-brand"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
      </div>
      <div className="relative -mt-9 h-11 [&_input]:pointer-events-none [&_input::-moz-range-thumb]:pointer-events-auto [&_input::-webkit-slider-thumb]:pointer-events-auto">
        <input
          type="range"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={AMOUNT_STEP}
          value={minValue}
          aria-label={`${label} mínimo`}
          onChange={(event) => {
            const nextValue = Math.min(
              Number(event.target.value),
              maxValue - AMOUNT_STEP
            )
            onChange([nextValue, maxValue])
          }}
          className="absolute inset-0 h-11 w-full appearance-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#0049af] focus-visible:ring-offset-2 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand"
        />
        <input
          type="range"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={AMOUNT_STEP}
          value={maxValue}
          aria-label={`${label} máximo`}
          onChange={(event) => {
            const nextValue = Math.max(
              Number(event.target.value),
              minValue + AMOUNT_STEP
            )
            onChange([minValue, nextValue])
          }}
          className="absolute inset-0 h-11 w-full appearance-none bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#0049af] focus-visible:ring-offset-2 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand"
        />
      </div>
      <div className="flex items-center justify-between text-xs font-semibold text-muted">
        <span>{formatCurrency(MIN_AMOUNT)}</span>
        <span>{formatCurrency(MAX_AMOUNT)}</span>
      </div>
    </div>
  )
}
