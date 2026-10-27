const COUNTRY_NAMES: Record<string, string> = {
  GB: 'United Kingdom',
  UK: 'United Kingdom',
  AE: 'United Arab Emirates',
  US: 'United States',
  FR: 'France',
}

const CURRENCY_LABELS: Record<string, string> = {
  GBP: 'GBP (British Pound)',
  AED: 'AED (UAE Dirham)',
  USD: 'USD (US Dollar)',
  EUR: 'EUR (Euro)',
}

/** Maps ISO country code (or returns full name if already a name). */
export function formatCountryName(value?: string | null): string {
  if (!value) return '—'
  const trimmed = value.trim()
  if (!trimmed) return '—'
  if (trimmed.length > 3) return trimmed
  return COUNTRY_NAMES[trimmed.toUpperCase()] || trimmed
}

/** e.g. GBP → GBP (British Pound) */
export function formatCurrencyLabel(code?: string | null): string {
  if (!code) return '—'
  const upper = code.trim().toUpperCase()
  return CURRENCY_LABELS[upper] || upper
}

export function getInitials(name?: string | null): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] || ''}${parts[parts.length - 1][0] || ''}`.toUpperCase()
}
