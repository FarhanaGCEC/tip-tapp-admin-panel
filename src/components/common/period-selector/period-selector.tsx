import clsx from 'clsx'
import Lucide from '../lucide'
import { Menu } from '../headless'
import { monthNames } from '../../../constants/months'
import { PeriodMonth } from '../../../utils/periodFilter'

export type { PeriodMonth }

interface PeriodSelectorProps {
  year: string
  month: PeriodMonth
  onYearChange: (year: string) => void
  onMonthChange: (month: PeriodMonth) => void
  yearCount?: number
  className?: string
  compact?: boolean
}

const fieldWrap =
  'relative flex h-10 shrink-0 items-center border-r border-slate-200 last:border-r-0'

const triggerClass =
  'flex h-10 w-full items-center justify-between gap-2 px-3 text-sm font-medium text-[#2D3748]'

interface PeriodDropdownProps {
  label: string
  ariaLabel: string
  minWidth: string
  children: React.ReactNode
}

function PeriodDropdown({
  label,
  ariaLabel,
  minWidth,
  children,
}: PeriodDropdownProps) {
  return (
    <div className={clsx(fieldWrap, minWidth)}>
      <Menu className="h-full w-full">
        <Menu.Button
          className={triggerClass}
          aria-label={ariaLabel}
        >
          <span className="truncate">{label}</span>
          <Lucide icon="ChevronDown" className="h-4 w-4 shrink-0 text-gray-400" />
        </Menu.Button>
        <Menu.Items
          placement="bottom-start"
          className="max-h-56 min-w-[120px] overflow-y-auto p-1"
        >
          {children}
        </Menu.Items>
      </Menu>
    </div>
  )
}

function PeriodSelector({
  year,
  month,
  onYearChange,
  onMonthChange,
  yearCount = 4,
  className = '',
  compact = false,
}: PeriodSelectorProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: yearCount }, (_, i) => currentYear - i)

  const monthLabel =
    month === 'all' ? 'All Months' : monthNames[Number(month) - 1] ?? month

  const optionClass = (active: boolean) =>
    clsx(
      'w-full rounded-md px-3 py-2 text-left text-sm',
      active
        ? 'bg-[#06768d]/10 font-medium text-[#06768d]'
        : 'text-[#2D3748] hover:bg-slate-100'
    )

  return (
    <div className={clsx('inline-flex flex-col gap-1', className)}>
      <div className="inline-flex h-10 items-center overflow-visible rounded-lg border border-slate-200 bg-white shadow-sm">
        <div
          className={clsx(fieldWrap, 'justify-center bg-slate-50 px-3 text-[#06768d]')}
          aria-hidden
        >
          <Lucide icon="Calendar" className="h-4 w-4" />
        </div>

        <PeriodDropdown
          label={year}
          ariaLabel="Select year"
          minWidth="min-w-[88px]"
        >
          {years.map((y) => {
            const value = y.toString()
            return (
              <Menu.Item key={value} as="div">
                <button
                  type="button"
                  className={optionClass(value === year)}
                  onClick={() => onYearChange(value)}
                >
                  {value}
                </button>
              </Menu.Item>
            )
          })}
        </PeriodDropdown>

        <PeriodDropdown
          label={monthLabel}
          ariaLabel="Select month"
          minWidth={compact ? 'min-w-[120px]' : 'min-w-[132px]'}
        >
          <Menu.Item as="div">
            <button
              type="button"
              className={optionClass(month === 'all')}
              onClick={() => onMonthChange('all')}
            >
              All Months
            </button>
          </Menu.Item>
          {monthNames.map((name, index) => {
            const value = String(index + 1).padStart(2, '0')
            return (
              <Menu.Item key={value} as="div">
                <button
                  type="button"
                  className={optionClass(month === value)}
                  onClick={() => onMonthChange(value)}
                >
                  {name}
                </button>
              </Menu.Item>
            )
          })}
        </PeriodDropdown>
      </div>
    </div>
  )
}

export default PeriodSelector
