import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminMarkets } from '../../../api/admin-country'
import { useCountryStore } from '../../../stores/countryStore'
import { Currency } from '../../../types/currency'
import { useCurrencyStore } from '../../../stores/currencyStore'
import { MarketItem } from '../../../types/admin-country'

const KNOWN_CURRENCIES: Currency[] = ['GBP', 'AED', 'USD', 'EUR']
const UNASSIGNED = 'UNASSIGNED'

const FALLBACK_MARKETS: MarketItem[] = [
  { countryCode: 'GB', country: 'United Kingdom', currency: 'GBP', tippers: 0, serviceProviders: 0, both: 0, users: 0 },
  { countryCode: 'AE', country: 'United Arab Emirates', currency: 'AED', tippers: 0, serviceProviders: 0, both: 0, users: 0 },
  { countryCode: 'US', country: 'United States', currency: 'USD', tippers: 0, serviceProviders: 0, both: 0, users: 0 },
  { countryCode: 'FR', country: 'France', currency: 'EUR', tippers: 0, serviceProviders: 0, both: 0, users: 0 },
]

function CountrySelector() {
  const navigate = useNavigate()
  const { data: markets, isLoading, isError } = useAdminMarkets()
  const selection = useCountryStore((state) => state.selection)
  const countryCode = useCountryStore((state) => state.countryCode)
  const setCountry = useCountryStore((state) => state.setCountry)
  const setUnassigned = useCountryStore((state) => state.setUnassigned)
  const clearCountry = useCountryStore((state) => state.clearCountry)
  const setCurrency = useCurrencyStore((state) => state.setCurrency)

  const marketList = markets && markets.length > 0 ? markets : FALLBACK_MARKETS

  useEffect(() => {
    if (!markets || selection !== 'country' || !countryCode) return
    if (countryCode === UNASSIGNED) return
    const selected = markets.find((market) => market.countryCode === countryCode)
    if (!selected && !FALLBACK_MARKETS.some((m) => m.countryCode === countryCode)) {
      clearCountry()
      return
    }
    const currency =
      selected?.currency ||
      FALLBACK_MARKETS.find((m) => m.countryCode === countryCode)?.currency
    if (currency && KNOWN_CURRENCIES.includes(currency as Currency)) {
      setCurrency(currency as Currency)
    }
  }, [markets, selection, countryCode, clearCountry, setCurrency])

  const assignedMarkets = marketList.filter(
    (market) => market.countryCode && market.countryCode !== UNASSIGNED
  )
  const unassignedMarket = marketList.find(
    (market) =>
      !market.countryCode || market.countryCode === UNASSIGNED
  )

  const value =
    selection === 'unassigned' || countryCode === UNASSIGNED
      ? UNASSIGNED
      : selection === 'country' && countryCode
        ? countryCode
        : ''

  return (
    <label className="relative z-[60] flex items-center gap-2 text-xs font-medium text-slate-500">
      <span className="hidden sm:inline">Country</span>
      <select
        aria-label="Country"
        value={value}
        disabled={isLoading && !markets}
        onChange={(event) => {
          const next = event.target.value
          if (!next) {
            clearCountry()
            return
          }
          if (next === UNASSIGNED) {
            setUnassigned()
            // Incomplete profiles are unfinished SP signups — open SP list.
            navigate('/manage-service-providers')
            return
          }
          setCountry(next)
          const market =
            marketList.find((item) => item.countryCode === next) ||
            FALLBACK_MARKETS.find((item) => item.countryCode === next)
          if (
            market?.currency &&
            KNOWN_CURRENCIES.includes(market.currency as Currency)
          ) {
            setCurrency(market.currency as Currency)
          }
        }}
        className="h-8 min-w-[180px] max-w-[260px] cursor-pointer rounded-md border border-slate-200 bg-white px-2 text-xs font-medium text-brand-navy focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">
          {isLoading && !markets ? 'Loading countries…' : 'Select a country'}
        </option>
        {assignedMarkets.map((market) => (
          <option key={market.countryCode!} value={market.countryCode!}>
            {market.country || market.countryCode} ({market.countryCode}
            {market.currency ? ` · ${market.currency}` : ''})
          </option>
        ))}
        <option value={UNASSIGNED}>
          Unassigned (incomplete)
          {unassignedMarket?.users != null && unassignedMarket.users > 0
            ? ` · ${unassignedMarket.users}`
            : ''}
        </option>
      </select>
      {isError && !markets ? (
        <span className="text-danger">Countries unavailable</span>
      ) : null}
    </label>
  )
}

export default CountrySelector
