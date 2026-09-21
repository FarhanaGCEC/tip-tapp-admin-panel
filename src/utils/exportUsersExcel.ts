import * as XLSX from 'xlsx'
import { TipItem } from '../types/tpandsptype'

function formatCellDate(value?: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-GB')
}

function titleCase(value?: string | null): string {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function displayStatus(status?: string | null): string {
  if (!status) return ''
  if (status === 'banned') return 'Inactive'
  return titleCase(status)
}

/** Builds and downloads an Excel file for tipper / service provider rows. */
export function downloadUsersExcel(
  items: TipItem[],
  options: {
    filename?: string
    sheetName?: string
    includeEmiratesId?: boolean
  } = {}
): void {
  const {
    filename = 'tipapp-users',
    sheetName = 'Users',
    includeEmiratesId = false,
  } = options

  const rows = items.map((item) => {
    const base: Record<string, string | number> = {
      Name: `${item.FirstName || ''} ${item.LastName || ''}`.trim(),
      Email: item.Email || '',
      Phone: item.Phone || '',
      WhatsApp: item.Whatsapp || '',
      Country: item.Country || '',
      Status: displayStatus(item.Status),
      'Registered Date': formatCellDate(item.CreatedAt),
    }

    if (includeEmiratesId) {
      base['Emirates ID'] = item.EmiratesId || ''
    }

    return base
  })

  const emptyRow: Record<string, string> = {
    Name: '',
    Email: '',
    Phone: '',
    WhatsApp: '',
    Country: '',
    Status: '',
    'Registered Date': '',
  }
  if (includeEmiratesId) {
    emptyRow['Emirates ID'] = ''
  }

  const worksheet = XLSX.utils.json_to_sheet(rows.length ? rows : [emptyRow])

  worksheet['!cols'] = [
    { wch: 22 },
    { wch: 28 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 12 },
    { wch: 14 },
    ...(includeEmiratesId ? [{ wch: 18 }] : []),
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  const stamp = new Date().toISOString().slice(0, 10)
  XLSX.writeFile(workbook, `${filename}-${stamp}.xlsx`)
}
