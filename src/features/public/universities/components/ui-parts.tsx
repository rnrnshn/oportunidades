import { MIN_TUITION, MAX_TUITION, TUITION_STEP } from '../types'

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
      <label className="text-sm font-semibold text-navy">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-soft bg-white px-3 text-sm text-navy outline-none focus:border-brand"
      >
        <option value="">{placeholder ?? 'Seleciona'}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption ? formatOption(option) : option}
          </option>
        ))}
      </select>
    </div>
  )
}

export function RangeSlider({
  value,
  onChange,
}: {
  value: [number, number]
  onChange: (value: [number, number]) => void
}) {
  const [minValue, maxValue] = value
  const minPercent = ((minValue - MIN_TUITION) / (MAX_TUITION - MIN_TUITION)) * 100
  const maxPercent = ((maxValue - MIN_TUITION) / (MAX_TUITION - MIN_TUITION)) * 100

  return (
    <div className="space-y-2">
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#e5e8f0]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={MIN_TUITION}
          max={MAX_TUITION}
          step={TUITION_STEP}
          value={minValue}
          onChange={(event) => {
            const nextValue = Math.min(Number(event.target.value), maxValue - TUITION_STEP)
            onChange([nextValue, maxValue])
          }}
          className="absolute inset-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand"
        />
        <input
          type="range"
          min={MIN_TUITION}
          max={MAX_TUITION}
          step={TUITION_STEP}
          value={maxValue}
          onChange={(event) => {
            const nextValue = Math.max(Number(event.target.value), minValue + TUITION_STEP)
            onChange([minValue, nextValue])
          }}
          className="absolute inset-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand"
        />
      </div>
      <div className="flex items-center justify-between text-xs font-semibold text-muted">
        <span>{formatCurrency(MIN_TUITION)}</span>
        <span>{formatCurrency(MAX_TUITION)}</span>
      </div>
    </div>
  )
}
