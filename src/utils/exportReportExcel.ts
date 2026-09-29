import * as XLSX from 'xlsx'
import { ReportItem } from '../types/reporttype'

function formatCellDate(value?: string): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-GB')
}

function titleCase(value?: string): string {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/** Builds and downloads an Excel file for finance report rows. */
export function downloadReportExcel(
  items: ReportItem[],
  filename = 'tipapp-finance-report'
): void {
  const rows = items.map((item) => ({
    Date: formatCellDate(item.createdAt),
    'Transaction Type': titleCase(item.TransactionType),
    Account: titleCase(item.Account),
    Amount: item.Amount ?? '',
    'Open Balance': item.OpenBalance ?? '',
    'Close Balance': item.CloseBalance ?? '',
  }))

  const worksheet = XLSX.utils.json_to_sheet(
    rows.length
      ? rows
      : [
          {
            Date: '',
            'Transaction Type': '',
            Account: '',
            Amount: '',
            'Open Balance': '',
            'Close Balance': '',
          },
        ]
  )

  worksheet['!cols'] = [
    { wch: 14 },
    { wch: 18 },
    { wch: 14 },
    { wch: 12 },
    { wch: 14 },
    { wch: 14 },
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Finance Report')

  const stamp = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(workbook, `${filename}-${stamp}.xlsx`)
}
