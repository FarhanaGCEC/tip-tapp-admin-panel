/** Escapes text before embedding in HTML contexts (e.g. chart tooltips). */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Shows only last 4 digits of bank/account numbers in admin UI. */
export function maskAccountNumber(value?: string | null): string {
  if (!value) return 'Managed by Stripe'
  const digits = value.replace(/\s/g, '')
  if (digits.length <= 4) return '••••'
  return `•••• ${digits.slice(-4)}`
}
