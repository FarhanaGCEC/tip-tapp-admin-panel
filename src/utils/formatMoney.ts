import { AmountLike, Currency, DualAmount } from '../types/currency'

function isAmountShape(value: unknown): value is AmountLike {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return (
    'amounts' in obj ||
    'amount' in obj ||
    'amountAED' in obj ||
    'Amount' in obj ||
    'totalTipAmount' in obj
  )
}

/** Reads `{ GBP, AED }` from flat or nested `toAmountResponse` shapes. */
export function extractDualAmount(source: unknown): DualAmount | undefined {
  if (!source || typeof source !== 'object') return undefined
  const obj = source as Record<string, unknown>

  if (obj.amounts && typeof obj.amounts === 'object') {
    const nested = obj.amounts as Record<string, unknown>
    if ('GBP' in nested || 'AED' in nested) {
      return {
        GBP: Number(nested.GBP) || 0,
        AED: Number(nested.AED) || 0,
      }
    }
  }

  if ('GBP' in obj || 'AED' in obj) {
    return {
      GBP: Number(obj.GBP) || 0,
      AED: Number(obj.AED) || 0,
    }
  }

  return undefined
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

  const fallback =
    selected === 'GBP' ? normalized.amount : normalized.amountAED
  if (fallback == null || Number.isNaN(Number(fallback))) return undefined
  return Number(fallback)
}

export function formatMoney(
  data: AmountLike | unknown,
  selected: Currency
): string {
  const value = getAmountValue(data, selected)
  if (value == null) return '—'
  return selected === 'GBP'
    ? `£${value.toFixed(2)}`
    : `AED ${value.toFixed(2)}`
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
