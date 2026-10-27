import { useEffect } from 'react'
import { useAdminMarkets } from '../../../api/admin-country'
import { useCountryStore } from '../../../stores/countryStore'
import { Currency } from '../../../types/currency'
import { useCurrencyStore } from '../../../stores/currencyStore'

const KNOWN_CURRENCIES: Currency[] = ['GBP', 'AED', 'USD', 'EUR']

function CountrySelector() {
  const { data: markets, isLoading, isError } = useAdminMarkets()
  const selection = useCountryStore((state) => state.selection)
  const countryCode = useCountryStore((state) => state.countryCode)
  const setCountry = useCountryStore((state) => state.setCountry)
  const setUnassigned = useCountryStore((state) => state.setUnassigned)
  const clearCountry = useCountryStore((state) => state.clearCountry)
  const setCurrency = useCurrencyStore((state) => state.setCurrency)

  useEffect(() => {
    if (!markets || selection !== 'country' || !countryCode) return
    const selected = markets.find((market) => market.countryCode === countryCode)
    if (!selected) {
      clearCountry()
      return
    }
    if (
      selected.currency &&
      KNOWN_CURRENCIES.includes(selected.currency as Currency)
    ) {
      setCurrency(selected.currency as Currency)
    }
  }, [markets, selection, countryCode, clearCountry, setCurrency])

  const value =
    selection === 'country' && countryCode
      ? countryCode
      : selection === 'unassigned'
        ? '__unassigned__'
        : ''

  return (
    <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
      <span className="hidden sm:inline">Country</span>
      <select
        aria-label="Country"
        value={value}
        disabled={isLoading}
        onChange={(event) => {
          const next = event.target.value
          if (!next) {
            clearCountry()
            return
          }
          if (next === '__unassigned__') {
            setUnassigned()
            return
          }
          setCountry(next)
          const market = markets?.find((item) => item.countryCode === next)
          if (
            market?.currency &&
            KNOWN_CURRENCIES.includes(market.currency as Currency)
          ) {
            setCurrency(market.currency as Currency)
          }
        }}
        className="h-8 max-w-[220px] rounded-md border border-slate-200 bg-white px-2 text-xs font-medium text-brand-navy"
      >
        <option value="">{isLoading ? 'Loading countries…' : 'Select a country'}</option>
        {markets?.map((market) =>
          market.countryCode ? (
            <option key={market.countryCode} value={market.countryCode}>
              {market.country || market.countryCode} ({market.countryCode}
              {market.currency ? ` · ${market.currency}` : ''})
            </option>
          ) : (
            <option key="unassigned" value="__unassigned__">
              Unassigned
            </option>
          )
        )}
      </select>
      {isError ? <span className="text-danger">Countries unavailable</span> : null}
    </label>
  )
}

export default CountrySelector
