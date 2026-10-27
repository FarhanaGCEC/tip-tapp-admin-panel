import { monthNames } from '../constants/months'

/** Zero user-status counts for Unassigned dashboard charts. */
export const ZERO_USER_COUNTS = {
  Tippers: { active: 0, deactive: 0, new: 0 },
  ServiceProviders: { active: 0, deactive: 0, new: 0 },
  Both: { active: 0, deactive: 0, new: 0 },
}

const emptyAgeGroup = {
  '18-30': 0,
  '31-50': 0,
  '51+': 0,
  'Below 18': 0,
}

/** Zero age buckets for Unassigned dashboard charts. */
export const ZERO_AGE_BY_ROLE = {
  tp: { ...emptyAgeGroup },
  sp: { ...emptyAgeGroup },
  both: { ...emptyAgeGroup },
}

/** 12 months of zero signups for Unassigned user-trend chart. */
export function zeroMonthlySignups(year = new Date().getFullYear()) {
  return monthNames.map((_, index) => ({
    month: `${year}-${String(index + 1).padStart(2, '0')}`,
    count: '0',
  }))
}

export function isUnassignedCountry(
  countryCode: string | null | undefined,
  selection?: string
): boolean {
  return (
    selection === 'unassigned' ||
    countryCode === 'UNASSIGNED' ||
    countryCode === '__UNASSIGNED__'
  )
}
