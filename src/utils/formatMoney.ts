import { AmountLike, Currency, DualAmount } from '../types/currency'

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  GBP: '£',
  AED: 'AED ',
  USD: '$',
  EUR: '€',
}

const CURRENCY_KEYS: Currency[] = ['GBP', 'AED', 'USD', 'EUR']

function isAmountShape(value: unknown): value is AmountLike {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return (
    'amounts' in obj ||
    'amount' in obj ||
    'amountAED' in obj ||
    'amountUSD' in obj ||
    'amountEUR' in obj ||
    'Amount' in obj ||
    'totalTipAmount' in obj
  )
}

function readCurrencyMap(source: Record<string, unknown>): DualAmount | undefined {
  const hasCurrency = CURRENCY_KEYS.some((code) => code in source)
  if (!hasCurrency) return undefined
  return {
    GBP: Number(source.GBP) || 0,
    AED: Number(source.AED) || 0,
    USD: Number(source.USD) || 0,
    EUR: Number(source.EUR) || 0,
  }
}

/** Reads currency totals from flat or nested `toAmountResponse` shapes. */
export function extractDualAmount(source: unknown): DualAmount | undefined {
  if (!source || typeof source !== 'object') return undefined
  const obj = source as Record<string, unknown>

  if (obj.amounts && typeof obj.amounts === 'object') {
    const nested = readCurrencyMap(obj.amounts as Record<string, unknown>)
    if (nested) return nested
  }

  return readCurrencyMap(obj)
}

/** Unwraps `{ data: ... }` API envelopes and legacy string balances. */
export function normalizeAmountLike(input: unknown): AmountLike {
  if (input == null) return undefined

  if (typeof input === 'string' || typeof input === 'number') {
    const num = Number(input)
    return Number.isNaN(num) ? undefined : { amount: num }
  }

  if (!isAmountShape(input) && typeof input === 'object') {
    const obj = input as Record<string, unknown>

    if ('data' in obj && obj.data != null) {
      return normalizeAmountLike(obj.data)
    }
  }

  if (isAmountShape(input)) {
    return input
  }

  return undefined
}

export function getAmountValue(
  data: AmountLike | unknown,
  selected: Currency
): number | undefined {
  const normalized = normalizeAmountLike(data)
  if (!normalized) return undefined

  const dual =
    extractDualAmount(normalized.amounts) ?? extractDualAmount(normalized)
  if (dual) {
    const value = dual[selected]
    if (value != null && !Number.isNaN(Number(value))) {
      return Number(value)
    }
  }

  if (
    selected === 'GBP' &&
    'Amount' in normalized &&
    normalized.Amount != null
  ) {
    return Number(normalized.Amount)
  }

  if (
    selected === 'GBP' &&
    'totalTipAmount' in normalized &&
    normalized.totalTipAmount != null
  ) {
    return Number(normalized.totalTipAmount)
  }

  const named =
    selected === 'GBP'
      ? normalized.amount
      : selected === 'AED'
        ? normalized.amountAED
        : selected === 'USD'
          ? (normalized as { amountUSD?: number }).amountUSD
          : (normalized as { amountEUR?: number }).amountEUR
  if (named == null || Number.isNaN(Number(named))) return undefined
  return Number(named)
}

export function formatPlainMoney(value: number, selected: Currency): string {
  return `${CURRENCY_SYMBOL[selected]}${value.toFixed(2)}`
}

const EXTRA_CURRENCY_SYMBOL: Record<string, string> = {
  LKR: 'Rs ',
}

export function formatAmountWithCurrency(value: number, currency: string): string {
  if (!Number.isFinite(value)) return '—'
  const known = CURRENCY_SYMBOL[currency as Currency] ?? EXTRA_CURRENCY_SYMBOL[currency]
  const prefix = known ?? (currency ? `${currency} ` : '')
  return `${prefix}${value.toFixed(2)}`
}

function readDirectDisplay(
  source: object
): { amount: number; currency: string } | undefined {
  const obj = source as Record<string, unknown>
  if (obj.displayAmount == null || typeof obj.currency !== 'string' || !obj.currency) {
    return undefined
  }
  const amount = Number(obj.displayAmount)
  if (Number.isNaN(amount)) return undefined
  return { amount, currency: obj.currency }
}

/** Country dashboards display `displayAmount` in that object's currency. */
export function readDisplayMoney(
  source: unknown
): { amount: number; currency: string } | undefined {
  if (!source || typeof source !== 'object') return undefined
  const obj = source as Record<string, unknown>

  if (obj.amounts && typeof obj.amounts === 'object') {
    const nested = readDirectDisplay(obj.amounts)
    if (nested) return nested
  }

  const direct = readDirectDisplay(obj)
  if (direct) return direct

  if (obj.amount && typeof obj.amount === 'object') {
    return readDirectDisplay(obj.amount)
  }

  return undefined
}

export function formatDisplayAmount(source: unknown): string {
  const money = readDisplayMoney(source)
  if (!money) return '—'
  return formatAmountWithCurrency(money.amount, money.currency)
}

export function formatMoney(
  data: AmountLike | unknown,
  selected: Currency
): string {
  const display = readDisplayMoney(data)
  if (display) {
    return formatAmountWithCurrency(display.amount, display.currency)
  }
  const value = getAmountValue(data, selected)
  if (value == null) return '—'
  return formatPlainMoney(value, selected)
}

export function getDualAmountValue(
  amounts: DualAmount | unknown,
  selected: Currency
): number {
  const dual = extractDualAmount(amounts)
  if (!dual) return 0
  const value = dual[selected]
  return value == null || Number.isNaN(Number(value)) ? 0 : Number(value)
}
