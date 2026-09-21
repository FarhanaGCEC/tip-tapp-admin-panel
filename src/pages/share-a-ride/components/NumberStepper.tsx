import clsx from 'clsx'
import Lucide from '../../../components/common/lucide'

interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
  className?: string
}

function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  disabled = false,
  className,
}: NumberStepperProps) {
  const decrement = () => onChange(Math.max(min, value - 1))
  const increment = () => onChange(Math.min(max, value + 1))

  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-xl border border-slate-200 bg-white',
        disabled && 'opacity-60',
        className
      )}
    >
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={decrement}
        className="flex h-10 w-10 items-center justify-center rounded-l-xl text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease"
      >
        <Lucide icon="Minus" className="h-4 w-4" />
      </button>
      <span className="min-w-[2.5rem] px-2 text-center text-sm font-semibold text-brand-navy">
        {value}
      </span>
      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={increment}
        className="flex h-10 w-10 items-center justify-center rounded-r-xl text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase"
      >
        <Lucide icon="Plus" className="h-4 w-4" />
      </button>
    </div>
  )
}

export default NumberStepper
