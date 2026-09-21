import * as XLSX from 'xlsx'
import { TipItem, WithdrawalItem } from '../types/tips'
import { extractDualAmount } from './formatMoney'

function formatCellDate(value?: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-GB')
}

function excelAmounts(source: unknown): { GBP: number; AED: number } {
  const dual = extractDualAmount(source)
  if (dual) return dual

  if (source && typeof source === 'object') {
    const obj = source as Record<string, unknown>
    const gbp = Number(obj.amount ?? obj.Amount ?? 0) || 0
    const aed = Number(obj.amountAED ?? 0) || 0
    return { GBP: gbp, AED: aed }
  }

  return { GBP: 0, AED: 0 }
}

/** Downloads tips list as Excel. */
export function downloadTipsExcel(
  items: TipItem[],
  filename = 'tipapp-tips'
): void {
  const rows = items.map((item) => {
    const amounts = excelAmounts(item)
    return {
      'Tip ID': item.TipId ?? '',
      Date: formatCellDate(item.createdAt),
      Tipper: item.tipperName || '',
      'Service Provider': item.serviceProviderName || '',
      'Amount (GBP)': amounts.GBP,
      'Amount (AED)': amounts.AED,
    }
  })

  const worksheet = XLSX.utils.json_to_sheet(
    rows.length
      ? rows
      : [
          {
            'Tip ID': '',
            Date: '',
            Tipper: '',
            'Service Provider': '',
            'Amount (GBP)': '',
            'Amount (AED)': '',
          },
        ]
  )

  worksheet['!cols'] = [
    { wch: 10 },
    { wch: 14 },
    { wch: 22 },
    { wch: 22 },
    { wch: 14 },
    { wch: 14 },
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
    const amounts = excelAmounts(item)
    return {
      'Withdraw ID': item.WithdrawId ?? '',
      Date: formatCellDate(item.DateCreate),
      'Service Provider': item.serviceProviderName || '',
      Method: item.Method || '',
      'Amount (GBP)': amounts.GBP,
      'Amount (AED)': amounts.AED,
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
            'Amount (GBP)': '',
            'Amount (AED)': '',
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
