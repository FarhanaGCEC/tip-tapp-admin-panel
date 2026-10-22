import { MonthlyReceivedPoint } from '../types/admin-country'
import { monthNames } from '../constants/months'

export type PlatformName = 'Uber' | 'Yango' | 'Bolt'
export type FleetCity = 'Dubai' | 'Abu Dhabi' | 'Sharjah'

export const FLEET_CITIES: { code: string; label: FleetCity }[] = [
  { code: 'DXB', label: 'Dubai' },
  { code: 'AUH', label: 'Abu Dhabi' },
  { code: 'SHJ', label: 'Sharjah' },
]

const CITY_BY_CODE: Record<string, FleetCity> = {
  DXB: 'Dubai',
  AUH: 'Abu Dhabi',
  SHJ: 'Sharjah',
}

export function cityFromCode(code: string | null): FleetCity | null {
  if (!code) return null
  return CITY_BY_CODE[code] ?? null
}

export function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString('en-AE')}`
}

export type RentalStatus = 'On trip' | 'Completed' | 'Scheduled'

export type RentalRecord = {
  id: string
  platform: PlatformName
  driver: string
  phone: string
  car: string
  plate: string
  city: FleetCity
  outTime: string
  inTime: string
  duration: string
  distanceKm: number
  from: string
  to: string
  grossRent: number
  platformFee: number
  driverShare: number
  ownerRent: number
  fuel: number
  status: RentalStatus
}

export type DriverRecord = {
  id: string
  name: string
  phone: string
  city: FleetCity
  platforms: PlatformName[]
  car: string
  plate: string
  tripsThisWeek: number
  rentThisWeek: number
  status: 'On trip' | 'Available' | 'Off shift'
  dateOfBirth: string
}

export type CarRecord = {
  id: string
  model: string
  plate: string
  platform: PlatformName
  driver: string
  city: FleetCity
  dailyRent: number
  status: 'On trip' | 'Idle' | 'Workshop'
}

export const RENTALS: RentalRecord[] = [
  {
    id: 'RNT-1042',
    platform: 'Uber',
    driver: 'Ahmed Khan',
    phone: '+971 50 441 2201',
    car: 'Toyota Corolla',
    plate: 'D 48291',
    city: 'Dubai',
    outTime: '22 Oct 2026, 06:40',
    inTime: '22 Oct 2026, 14:15',
    duration: '7h 35m',
    distanceKm: 186,
    from: 'Al Quoz Yard',
    to: 'Dubai Marina',
    grossRent: 640,
    platformFee: 96,
    driverShare: 380,
    ownerRent: 164,
    fuel: 72,
    status: 'On trip',
  },
  {
    id: 'RNT-1041',
    platform: 'Yango',
    driver: 'Sara Al Maktoum',
    phone: '+971 55 902 1184',
    car: 'Nissan Sunny',
    plate: 'A 22018',
    city: 'Abu Dhabi',
    outTime: '22 Oct 2026, 07:05',
    inTime: '22 Oct 2026, 13:40',
    duration: '6h 35m',
    distanceKm: 142,
    from: 'Mussafah Yard',
    to: 'Corniche',
    grossRent: 510,
    platformFee: 77,
    driverShare: 300,
    ownerRent: 133,
    fuel: 58,
    status: 'On trip',
  },
  {
    id: 'RNT-1040',
    platform: 'Bolt',
    driver: 'Imran Hussain',
    phone: '+971 52 330 7740',
    car: 'Hyundai Accent',
    plate: 'S 11904',
    city: 'Sharjah',
    outTime: '22 Oct 2026, 08:20',
    inTime: '—',
    duration: 'In progress',
    distanceKm: 64,
    from: 'Industrial Area 6',
    to: 'Al Majaz',
    grossRent: 280,
    platformFee: 42,
    driverShare: 168,
    ownerRent: 70,
    fuel: 31,
    status: 'On trip',
  },
  {
    id: 'RNT-1038',
    platform: 'Uber',
    driver: 'Bilal Rahman',
    phone: '+971 50 228 6612',
    car: 'Kia Cerato',
    plate: 'D 77310',
    city: 'Dubai',
    outTime: '21 Oct 2026, 16:10',
    inTime: '21 Oct 2026, 23:55',
    duration: '7h 45m',
    distanceKm: 210,
    from: 'Deira Yard',
    to: 'JBR',
    grossRent: 720,
    platformFee: 108,
    driverShare: 430,
    ownerRent: 182,
    fuel: 81,
    status: 'Completed',
  },
  {
    id: 'RNT-1036',
    platform: 'Bolt',
    driver: 'Ahmed Khan',
    phone: '+971 50 441 2201',
    car: 'Toyota Yaris',
    plate: 'D 90552',
    city: 'Dubai',
    outTime: '21 Oct 2026, 09:00',
    inTime: '21 Oct 2026, 15:20',
    duration: '6h 20m',
    distanceKm: 128,
    from: 'Al Quoz Yard',
    to: 'Business Bay',
    grossRent: 455,
    platformFee: 68,
    driverShare: 270,
    ownerRent: 117,
    fuel: 49,
    status: 'Completed',
  },
  {
    id: 'RNT-1033',
    platform: 'Yango',
    driver: 'Fatima Noor',
    phone: '+971 56 114 8830',
    car: 'Honda City',
    plate: 'A 44190',
    city: 'Abu Dhabi',
    outTime: '21 Oct 2026, 11:30',
    inTime: '21 Oct 2026, 19:05',
    duration: '7h 35m',
    distanceKm: 167,
    from: 'Mussafah Yard',
    to: 'Yas Island',
    grossRent: 590,
    platformFee: 89,
    driverShare: 350,
    ownerRent: 151,
    fuel: 66,
    status: 'Completed',
  },
  {
    id: 'RNT-1031',
    platform: 'Uber',
    driver: 'Hassan Ali',
    phone: '+971 58 670 2291',
    car: 'Toyota Corolla',
    plate: 'S 30881',
    city: 'Sharjah',
    outTime: '22 Oct 2026, 18:00',
    inTime: '—',
    duration: 'Booked 8h',
    distanceKm: 0,
    from: 'Industrial Area 6',
    to: 'Airport Road',
    grossRent: 400,
    platformFee: 60,
    driverShare: 240,
    ownerRent: 100,
    fuel: 0,
    status: 'Scheduled',
  },
  {
    id: 'RNT-1028',
    platform: 'Yango',
    driver: 'Omar Farooq',
    phone: '+971 54 219 4408',
    car: 'Nissan Altima',
    plate: 'D 15670',
    city: 'Dubai',
    outTime: '20 Oct 2026, 13:15',
    inTime: '20 Oct 2026, 21:40',
    duration: '8h 25m',
    distanceKm: 198,
    from: 'Al Quoz Yard',
    to: 'DXB Airport T3',
    grossRent: 810,
    platformFee: 122,
    driverShare: 486,
    ownerRent: 202,
    fuel: 90,
    status: 'Completed',
  },
]

export const DRIVERS: DriverRecord[] = [
  {
    id: 'DRV-01',
    name: 'Ahmed Khan',
    phone: '+971 50 441 2201',
    city: 'Dubai',
    platforms: ['Uber', 'Bolt'],
    car: 'Toyota Corolla',
    plate: 'D 48291',
    tripsThisWeek: 18,
    rentThisWeek: 4280,
    status: 'On trip',
    dateOfBirth: '1998-03-12',
  },
  {
    id: 'DRV-02',
    name: 'Sara Al Maktoum',
    phone: '+971 55 902 1184',
    city: 'Abu Dhabi',
    platforms: ['Yango'],
    car: 'Nissan Sunny',
    plate: 'A 22018',
    tripsThisWeek: 15,
    rentThisWeek: 3610,
    status: 'On trip',
    dateOfBirth: '1994-07-09',
  },
  {
    id: 'DRV-03',
    name: 'Imran Hussain',
    phone: '+971 52 330 7740',
    city: 'Sharjah',
    platforms: ['Bolt', 'Yango'],
    car: 'Hyundai Accent',
    plate: 'S 11904',
    tripsThisWeek: 12,
    rentThisWeek: 2740,
    status: 'On trip',
    dateOfBirth: '1999-01-22',
  },
  {
    id: 'DRV-04',
    name: 'Bilal Rahman',
    phone: '+971 50 228 6612',
    city: 'Dubai',
    platforms: ['Uber'],
    car: 'Kia Cerato',
    plate: 'D 77310',
    tripsThisWeek: 14,
    rentThisWeek: 3390,
    status: 'Available',
    dateOfBirth: '1989-05-18',
  },
  {
    id: 'DRV-05',
    name: 'Fatima Noor',
    phone: '+971 56 114 8830',
    city: 'Abu Dhabi',
    platforms: ['Yango', 'Uber'],
    car: 'Honda City',
    plate: 'A 44190',
    tripsThisWeek: 11,
    rentThisWeek: 2980,
    status: 'Off shift',
    dateOfBirth: '1996-02-02',
  },
  {
    id: 'DRV-06',
    name: 'Hassan Ali',
    phone: '+971 58 670 2291',
    city: 'Sharjah',
    platforms: ['Uber'],
    car: 'Toyota Corolla',
    plate: 'S 30881',
    tripsThisWeek: 9,
    rentThisWeek: 2110,
    status: 'Available',
    dateOfBirth: '2001-06-08',
  },
  {
    id: 'DRV-07',
    name: 'Omar Farooq',
    phone: '+971 54 219 4408',
    city: 'Dubai',
    platforms: ['Yango', 'Bolt', 'Uber'],
    car: 'Nissan Altima',
    plate: 'D 15670',
    tripsThisWeek: 16,
    rentThisWeek: 4020,
    status: 'Available',
    dateOfBirth: '1984-04-04',
  },
  {
    id: 'DRV-08',
    name: 'Layla Hassan',
    phone: '+971 52 880 3316',
    city: 'Abu Dhabi',
    platforms: ['Bolt'],
    car: 'Hyundai Elantra',
    plate: 'A 88021',
    tripsThisWeek: 8,
    rentThisWeek: 1860,
    status: 'Off shift',
    dateOfBirth: '2003-09-14',
  },
]

export const CARS: CarRecord[] = [
  {
    id: 'CAR-01',
    model: 'Toyota Corolla',
    plate: 'D 48291',
    platform: 'Uber',
    driver: 'Ahmed Khan',
    city: 'Dubai',
    dailyRent: 180,
    status: 'On trip',
  },
  {
    id: 'CAR-02',
    model: 'Nissan Sunny',
    plate: 'A 22018',
    platform: 'Yango',
    driver: 'Sara Al Maktoum',
    city: 'Abu Dhabi',
    dailyRent: 160,
    status: 'On trip',
  },
  {
    id: 'CAR-03',
    model: 'Hyundai Accent',
    plate: 'S 11904',
    platform: 'Bolt',
    driver: 'Imran Hussain',
    city: 'Sharjah',
    dailyRent: 140,
    status: 'On trip',
  },
  {
    id: 'CAR-04',
    model: 'Kia Cerato',
    plate: 'D 77310',
    platform: 'Uber',
    driver: 'Bilal Rahman',
    city: 'Dubai',
    dailyRent: 170,
    status: 'Idle',
  },
  {
    id: 'CAR-05',
    model: 'Honda City',
    plate: 'A 44190',
    platform: 'Yango',
    driver: 'Fatima Noor',
    city: 'Abu Dhabi',
    dailyRent: 165,
    status: 'Idle',
  },
  {
    id: 'CAR-06',
    model: 'Toyota Corolla',
    plate: 'S 30881',
    platform: 'Uber',
    driver: 'Hassan Ali',
    city: 'Sharjah',
    dailyRent: 150,
    status: 'Idle',
  },
  {
    id: 'CAR-07',
    model: 'Nissan Altima',
    plate: 'D 15670',
    platform: 'Yango',
    driver: 'Omar Farooq',
    city: 'Dubai',
    dailyRent: 190,
    status: 'Idle',
  },
  {
    id: 'CAR-08',
    model: 'Hyundai Elantra',
    plate: 'A 88021',
    platform: 'Bolt',
    driver: 'Layla Hassan',
    city: 'Abu Dhabi',
    dailyRent: 155,
    status: 'Workshop',
  },
]

export const TOP_DRIVERS = [
  { name: 'Ahmed Khan', meta: 'Uber · Dubai', amount: 'AED 4,280', badge: '18 trips' },
  { name: 'Omar Farooq', meta: 'Yango · Dubai', amount: 'AED 4,020', badge: '16 trips' },
  { name: 'Sara Al Maktoum', meta: 'Yango · Abu Dhabi', amount: 'AED 3,610', badge: '15 trips' },
  { name: 'Bilal Rahman', meta: 'Uber · Dubai', amount: 'AED 3,390', badge: '14 trips' },
  { name: 'Fatima Noor', meta: 'Yango · Abu Dhabi', amount: 'AED 2,980', badge: '11 trips' },
]

export const TOP_CARS = [
  { name: 'Toyota Corolla', meta: 'D 48291 · Uber', amount: 'Dubai', badge: 'On trip' },
  { name: 'Nissan Altima', meta: 'D 15670 · Yango', amount: 'Dubai', badge: 'Idle' },
  { name: 'Kia Cerato', meta: 'D 77310 · Uber', amount: 'Dubai', badge: 'Idle' },
  { name: 'Nissan Sunny', meta: 'A 22018 · Yango', amount: 'Abu Dhabi', badge: 'On trip' },
  { name: 'Honda City', meta: 'A 44190 · Yango', amount: 'Abu Dhabi', badge: 'Idle' },
]

export const PLATFORM_CAR_STATUS = {
  Uber: { onTrip: 14, idle: 6, workshop: 2 },
  Bolt: { onTrip: 9, idle: 7, workshop: 1 },
  Yango: { onTrip: 11, idle: 4, workshop: 3 },
}

export type AgeBandKey = '18-30' | '31-50' | '51+' | 'Below 18'

export type DriverBirth = {
  platforms: PlatformName[]
  dateOfBirth: string
}

/** Rest of the fleet, stored as dates of birth so ages are calculated, not typed in. */
const EXTRA_FLEET_AGES: Record<PlatformName, number[]> = {
  Bolt: [
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 22, 24, 31, 33, 34, 35, 36, 38,
    40, 41, 43, 45, 47, 49, 50, 52, 56, 61,
  ],
  Uber: [
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 21, 23, 25, 27, 29, 22, 26,
    31, 32, 34, 35, 36, 37, 38, 40, 42, 44, 46, 48, 50, 33, 39, 45, 52, 55, 58,
    63,
  ],
  Yango: [
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 22, 24, 26, 28, 21, 23, 32, 33,
    35, 36, 38, 40, 42, 44, 46, 48, 50, 34, 39, 51, 54, 57, 60, 64,
  ],
}

function dateOfBirthForAge(age: number, index: number): string {
  const year = 2026 - age
  const day = String((index % 28) + 1).padStart(2, '0')
  return `${year}-03-${day}`
}

function extraBirths(platform: PlatformName): DriverBirth[] {
  return EXTRA_FLEET_AGES[platform].map((age, index) => ({
    platforms: [platform],
    dateOfBirth: dateOfBirthForAge(age, index),
  }))
}

export function ageFromDateOfBirth(
  dateOfBirth: string,
  today = new Date()
): number {
  const birth = new Date(`${dateOfBirth}T00:00:00`)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDelta = today.getMonth() - birth.getMonth()
  if (
    monthDelta < 0 ||
    (monthDelta === 0 && today.getDate() < birth.getDate())
  ) {
    age -= 1
  }
  return age
}

export function ageBandFor(age: number): AgeBandKey {
  if (age < 18) return 'Below 18'
  if (age <= 30) return '18-30'
  if (age <= 50) return '31-50'
  return '51+'
}

export type DriverAgeStats = {
  counts: Record<AgeBandKey, number>
  total: number
  average: number
  youngest: number
  oldest: number
}

export function getDriverAgeStats(
  company: PlatformName,
  today = new Date()
): DriverAgeStats {
  const people: DriverBirth[] = [
    ...DRIVERS.filter((driver) => driver.platforms.includes(company)).map(
      (driver) => ({
        platforms: driver.platforms,
        dateOfBirth: driver.dateOfBirth,
      })
    ),
    ...extraBirths(company),
  ]
  const ages = people.map((person) =>
    ageFromDateOfBirth(person.dateOfBirth, today)
  )
  const counts: Record<AgeBandKey, number> = {
    '18-30': 0,
    '31-50': 0,
    '51+': 0,
    'Below 18': 0,
  }
  ages.forEach((age) => {
    counts[ageBandFor(age)] += 1
  })
  const total = ages.length
  const average = total
    ? Math.round(ages.reduce((sum, age) => sum + age, 0) / total)
    : 0
  return {
    counts,
    total,
    average,
    youngest: total ? Math.min(...ages) : 0,
    oldest: total ? Math.max(...ages) : 0,
  }
}

const UBER_TRIPS = [118, 126, 134, 141, 150, 162, 170, 158, 149, 166, 0, 0]
const BOLT_TRIPS = [84, 91, 96, 102, 110, 118, 124, 115, 108, 121, 0, 0]
const YANGO_TRIPS = [97, 104, 111, 120, 128, 136, 142, 133, 127, 139, 0, 0]

export function monthlyTripCounts(
  year: string,
  platform: 'uber' | 'bolt' | 'yango'
) {
  const values =
    platform === 'uber' ? UBER_TRIPS : platform === 'bolt' ? BOLT_TRIPS : YANGO_TRIPS
  return values.map((count, index) => ({
    month: `${year}-${String(index + 1).padStart(2, '0')}`,
    count: String(count),
  }))
}

const RENT_BY_MONTH = [
  186400, 198200, 210500, 224800, 236100, 251400, 268900, 244600, 231200, 259800,
  0, 0,
]
const PAYOUT_BY_MONTH = [
  112000, 119400, 126800, 135200, 142000, 151600, 162400, 147200, 139400, 156200,
  0, 0,
]

const COMPANY_SHARE: Record<PlatformName, number> = {
  Uber: 0.46,
  Yango: 0.32,
  Bolt: 0.22,
}

export function monthlyMoneyPoints(
  year: string,
  kind: 'rent' | 'payout',
  company: PlatformName
): MonthlyReceivedPoint[] {
  const values = kind === 'rent' ? RENT_BY_MONTH : PAYOUT_BY_MONTH
  const share = COMPANY_SHARE[company]
  return values.map((total, index) => {
    const amount = Math.round(total * share)
    return {
      month: `${year}-${String(index + 1).padStart(2, '0')}`,
      monthIndex: index + 1,
      monthLabel: monthNames[index],
      total: amount,
      amounts: { displayAmount: amount, currency: 'AED' },
    }
  })
}

export type PlatformAccount = {
  company: PlatformName
  trips: number
  onTrip: number
  cars: number
  drivers: number
  gross: number
  platformFee: number
  driverShare: number
  ownerRent: number
  fuel: number
}

const PLATFORM_ORDER: PlatformName[] = ['Uber', 'Yango', 'Bolt']

export function platformAccount(company: PlatformName): PlatformAccount {
  const trips = RENTALS.filter((row) => row.platform === company)
  return {
    company,
    trips: trips.length,
    onTrip: trips.filter((row) => row.status === 'On trip').length,
    cars: CARS.filter((car) => car.platform === company).length,
    drivers: DRIVERS.filter((driver) => driver.platforms.includes(company)).length,
    gross: trips.reduce((sum, row) => sum + row.grossRent, 0),
    platformFee: trips.reduce((sum, row) => sum + row.platformFee, 0),
    driverShare: trips.reduce((sum, row) => sum + row.driverShare, 0),
    ownerRent: trips.reduce((sum, row) => sum + row.ownerRent, 0),
    fuel: trips.reduce((sum, row) => sum + row.fuel, 0),
  }
}

export function allPlatformAccounts(): PlatformAccount[] {
  return PLATFORM_ORDER.map(platformAccount)
}

export function fleetOverview(rows: RentalRecord[]) {
  const onTrip = rows.filter((row) => row.status === 'On trip').length
  const today = rows.filter((row) => row.outTime.startsWith('22 Oct 2026'))
  const gross = rows.reduce((sum, row) => sum + row.grossRent, 0)
  const fees = rows.reduce((sum, row) => sum + row.platformFee, 0)
  const payouts = rows.reduce((sum, row) => sum + row.driverShare, 0)
  return {
    onTrip: String(onTrip),
    trips: String(today.length || rows.length),
    gross: formatAed(gross),
    fees: formatAed(fees),
    payouts: formatAed(payouts),
  }
}
