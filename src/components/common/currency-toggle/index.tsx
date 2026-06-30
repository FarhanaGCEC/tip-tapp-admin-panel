import clsx from 'clsx'
import { Currency } from '../../../types/currency'
import { useCurrencyStore } from '../../../stores/currencyStore'

const CURRENCIES: Currency[] = ['GBP', 'AED']

function CurrencyToggle() {
  const currency = useCurrencyStore((state) => state.currency)
  const setCurrency = useCurrencyStore((state) => state.setCurrency)

  return (
    <div className="flex h-8 items-center rounded-md border border-slate-200 bg-white p-0.5">
      {CURRENCIES.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setCurrency(option)}
          className={clsx(
            'rounded px-2.5 py-1 text-xs font-medium transition-colors',
            currency === option
              ? 'bg-black text-white'
              : 'text-gray-500 hover:text-gray-900'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default CurrencyToggle
