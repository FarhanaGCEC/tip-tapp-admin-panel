import * as XLSX from 'xlsx'
import { TipItem, WithdrawalItem } from '../types/tips'
import { formatCountryName } from './countryLabels'
import { readDisplayMoney } from './formatMoney'

function formatCellDate(value?: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function excelDisplay(source: unknown): { amount: string | number; currency: string } {
  const money = readDisplayMoney(source)
  if (!money) return { amount: '', currency: '' }
  return { amount: money.amount.toFixed(2), currency: money.currency }
}

function excelCountry(value?: string | null): string {
  const name = formatCountryName(value)
  return name === '—' ? '' : name
}

type TipExcelItem = TipItem & { direction?: 'sent' | 'received' }

/** Downloads tips list as Excel. */
export function downloadTipsExcel(
  items: TipExcelItem[],
  filename = 'tipapp-tips',
  fallbackCountry?: string | null,
  options?: { includeDirection?: boolean }
): void {
  const includeDirection = Boolean(options?.includeDirection)
  const rows = items.map((item) => {
    const display = excelDisplay(item.amounts ?? item)
    const base = {
      '#': item.TipId ?? '',
      'Date & Time': formatCellDate(item.createdAt),
      Tipper: item.tipperName || '',
      'Tipper Country': excelCountry(item.tipperCountry || fallbackCountry),
      'Service Provider': item.serviceProviderName || '',
      'Service Provider Country': excelCountry(
        item.serviceProviderCountry || fallbackCountry
      ),
      Amount: display.amount,
      Currency: display.currency,
    }
    if (!includeDirection) return base
    return {
      '#': base['#'],
      Type: item.direction === 'received' ? 'Received' : 'Sent',
      'Date & Time': base['Date & Time'],
      Tipper: base.Tipper,
      'Tipper Country': base['Tipper Country'],
      'Service Provider': base['Service Provider'],
      'Service Provider Country': base['Service Provider Country'],
      Amount: base.Amount,
      Currency: base.Currency,
    }
  })

  const emptyRow = includeDirection
    ? {
        '#': '',
        Type: '',
        'Date & Time': '',
        Tipper: '',
        'Tipper Country': '',
        'Service Provider': '',
        'Service Provider Country': '',
        Amount: '',
        Currency: '',
      }
    : {
        '#': '',
        'Date & Time': '',
        Tipper: '',
        'Tipper Country': '',
        'Service Provider': '',
        'Service Provider Country': '',
        Amount: '',
        Currency: '',
      }

  const worksheet = XLSX.utils.json_to_sheet(rows.length ? rows : [emptyRow])

  worksheet['!cols'] = includeDirection
    ? [
        { wch: 8 },
        { wch: 10 },
        { wch: 20 },
        { wch: 22 },
        { wch: 22 },
        { wch: 22 },
        { wch: 24 },
        { wch: 10 },
        { wch: 10 },
      ]
    : [
        { wch: 8 },
        { wch: 20 },
        { wch: 22 },
        { wch: 22 },
        { wch: 22 },
        { wch: 24 },
        { wch: 10 },
        { wch: 10 },
      ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tips')
  const stamp = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(workbook, `${filename}-${stamp}.xlsx`)
}

/** Downloads withdrawals list as Excel. */
export function downloadWithdrawalsExcel(
  items: WithdrawalItem[],
  filename = 'tipapp-withdrawals'
): void {
  const rows = items.map((item) => {
    const display = excelDisplay(item.amounts ?? item)
    return {
      'Withdraw ID': item.WithdrawId ?? '',
      Date: formatCellDate(item.DateCreate),
      'Service Provider': item.serviceProviderName || '',
      Method: item.Method || '',
      Amount: display.amount,
      Currency: display.currency,
    }
  })

  const worksheet = XLSX.utils.json_to_sheet(
    rows.length
      ? rows
      : [
          {
            'Withdraw ID': '',
            Date: '',
            'Service Provider': '',
            Method: '',
            Amount: '',
            Currency: '',
          },
        ]
  )

  worksheet['!cols'] = [
    { wch: 12 },
    { wch: 14 },
    { wch: 22 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Withdrawals')
  const stamp = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(workbook, `${filename}-${stamp}.xlsx`)
}
