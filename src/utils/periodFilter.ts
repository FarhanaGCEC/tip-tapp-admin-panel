import { monthNames } from '../constants/months'

export type PeriodMonth = 'all' | string

export function getMonthKey(year: string, month: PeriodMonth): string | null {
  if (month === 'all') return null
  return `${year}-${month}`
}

export function getPreviousMonthKey(year: string, month: PeriodMonth): string | null {
  if (month === 'all') return null
  const monthIndex = Number(month) - 1
  if (monthIndex <= 0) {
    return `${Number(year) - 1}-12`
  }
  return `${year}-${String(monthIndex).padStart(2, '0')}`
}

export function getPeriodLabel(year: string, month: PeriodMonth): string {
  if (month === 'all') return `${year}/01 to ${year}/12`
  const monthLabel = monthNames[Number(month) - 1] ?? month
  return `${monthLabel} ${year}`
}

export function filterMonthlyPoints<T extends { month: string }>(
  points: T[],
  year: string,
  month: PeriodMonth
): T[] {
  if (month === 'all') return points
  const key = getMonthKey(year, month)
  return points.filter((point) => point.month === key)
}

export function getChartWindowPoints<T extends { month: string; monthLabel?: string }>(
  points: T[],
  year: string,
  month: PeriodMonth
): T[] {
  if (month === 'all') return points

  const selectedIndex = points.findIndex(
    (point) => point.month === getMonthKey(year, month)
  )
  if (selectedIndex === -1) return []

  const start = Math.max(0, selectedIndex - 2)
  const end = Math.min(points.length, selectedIndex + 3)
  return points.slice(start, end)
}
