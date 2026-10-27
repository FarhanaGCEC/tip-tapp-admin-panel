import { useQuery, UseQueryResult } from 'react-query'
import authFetch from './axiosinterceptor'
import { useCountryStore } from '../stores/countryStore'
import {
  AdminDashboard,
  ChargeCurrencyRow,
  MarketItem,
  MonthlyReceivedPoint,
  RankedUser,
} from '../types/admin-country'
import { monthNames } from '../constants/months'
import { TipItem } from '../types/tpandsptype'

type PageMeta = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export type AdminUserPage = {
  data: {
    items: TipItem[]
    meta: PageMeta
  }
  message: string
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  return value as Record<string, unknown>
}

function num(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function text(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  }
  return ''
}

export function readEnvelope(body: unknown): unknown {
  const record = asRecord(body)
  if (record && 'data' in record) return record.data
  return body
}

function personName(value: unknown): string {
  if (typeof value === 'string') return value
  const record = asRecord(value)
  if (!record) return ''
  const combined = text(record.name, record.fullName)
  if (combined) return combined
  return `${text(record.FirstName, record.firstName)} ${text(record.LastName, record.lastName)}`.trim()
}

function personCountry(value: unknown): string {
  const record = asRecord(value)
  if (!record) return ''
  return text(record.country, record.Country, record.countryCode, record.CountryCode)
}

export function normalizeAdminUser(raw: unknown): TipItem {
  const user = asRecord(raw) ?? {}
  const tipsGiven = asRecord(user.tipsGiven)
  const idValue = user.id ?? user.Id ?? user.userId
  const id = num(idValue)

  return {
    id,
    KeyCloakID: text(user.KeyCloakID, user.keyCloakID),
    Username: text(user.Username, user.username),
    FirstName: text(user.FirstName, user.firstName),
    LastName: text(user.LastName, user.lastName),
    Address: text(user.Address, user.address),
    Email: text(user.Email, user.email),
    Phone: text(user.Phone, user.phone),
    Whatsapp: text(user.Whatsapp, user.whatsapp),
    Country: text(user.Country, user.country, user.countryCode),
    City: text(user.City, user.city),
    VerificationCode: null,
    Bio: text(user.Bio, user.bio),
    Paypal: null,
    ProfilePictureURL: text(user.ProfilePictureURL, user.profilePictureUrl, user.profilePicture),
    DateOfBirth: null,
    Role: text(user.Role, user.role),
    role: user.role,
    Status: text(user.Status, user.status),
    NotificationSettings: null,
    bankDetails: null,
    Provider: text(user.Provider, user.provider),
    CreatedAt: text(user.CreatedAt, user.createdAt),
    UpdatedAt: text(user.UpdatedAt, user.updatedAt),
    FrontImageID: '',
    BackImageID: '',
    EmiratesId: text(user.EmiratesId, user.emiratesId),
    tipsGiven: tipsGiven
      ? {
          count: num(tipsGiven.count),
          amounts: tipsGiven.amounts,
          includedInCountryCash: tipsGiven.includedInCountryCash === true,
        }
      : undefined,
  }
}

function emptyMeta(page: number, limit: number): PageMeta {
  return {
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: limit,
    totalPages: 0,
    currentPage: page,
  }
}

export function readUserPage(body: unknown, page: number, limit: number): AdminUserPage {
  const data = readEnvelope(body)
  const record = asRecord(data)
  const itemsRaw = Array.isArray(data)
    ? data
    : Array.isArray(record?.items)
      ? (record?.items as unknown[])
      : []
  const metaRaw = asRecord(record?.meta)
  const items = itemsRaw.map(normalizeAdminUser)
  return {
    message: '',
    data: {
      items,
      meta: {
        totalItems: num(metaRaw?.totalItems ?? items.length),
        itemCount: num(metaRaw?.itemCount ?? items.length),
        itemsPerPage: num(metaRaw?.itemsPerPage ?? limit),
        totalPages: num(metaRaw?.totalPages ?? (items.length ? 1 : 0)),
        currentPage: num(metaRaw?.currentPage ?? page),
      },
    },
  }
}

function normalizeRank(raw: unknown): RankedUser {
  const item = asRecord(raw) ?? {}
  return {
    id: (item.id ?? item.userId) as string | number | undefined,
    firstName: text(item.firstName, item.FirstName),
    lastName: text(item.lastName, item.LastName),
    country: text(item.country, item.Country, item.countryCode),
    profilePictureUrl: text(item.profilePictureUrl, item.ProfilePictureURL),
    tipCount: num(item.tipCount ?? item.count ?? item.tipsCount ?? item.tips),
    amount: item.amounts ?? item.amount ?? item.total ?? item.totalAmount,
    averageRating: item.averageRating == null ? undefined : num(item.averageRating),
  }
}

function listFrom(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  const record = asRecord(value)
  if (!record) return []
  if (Array.isArray(record.items)) return record.items as unknown[]
  if (Array.isArray(record.data)) return record.data as unknown[]
  return []
}

function normalizeChargeCurrencies(input: unknown): ChargeCurrencyRow[] {
  const rows = Array.isArray(input) ? input : listFrom(input)
  return rows.map((item) => {
    const record = asRecord(item) ?? {}
    const chargeTotal = record.chargeTotal ?? record.chargeAmount
    return {
      currency:
        text(record.currency, record.chargeCurrency, record.code, record.label) ||
        'UNRECORDED',
      count: num(record.count),
      chargeTotal:
        chargeTotal == null || chargeTotal === '' ? null : num(chargeTotal),
    }
  })
}

function normalizeMonth(
  raw: unknown,
  index: number,
  year: string
): MonthlyReceivedPoint {
  const point = asRecord(raw) ?? {}
  const monthIndex = num(point.monthIndex) || index + 1
  const month = text(point.month) || `${year}-${String(monthIndex).padStart(2, '0')}`
  const monthLabel = text(point.monthLabel) || monthNames[monthIndex - 1] || month
  const amounts = asRecord(point.amounts)
  return {
    month,
    monthIndex,
    monthLabel,
    total: num(point.total),
    amounts: amounts
      ? {
          displayAmount:
            amounts.displayAmount == null ? undefined : num(amounts.displayAmount),
          currency: text(amounts.currency),
        }
      : undefined,
  }
}

export function normalizeDashboard(body: unknown, year: string): AdminDashboard {
  const data = asRecord(readEnvelope(body)) ?? {}
  const market = asRecord(data.market) ?? {}
  const users = asRecord(data.users) ?? {}
  const tips = asRecord(data.tips) ?? {}
  const serviceProviders = asRecord(data.serviceProviders) ?? {}
  const monthly = data.monthlyReceived
  const monthlyRecord = asRecord(monthly)
  const monthRows = Array.isArray(monthly)
    ? monthly
    : monthlyRecord && Array.isArray(monthlyRecord.totalsByMonth)
      ? (monthlyRecord.totalsByMonth as unknown[])
      : []

  return {
    market: {
      countryCode: text(market.countryCode),
      country: text(market.country),
      currency: text(market.currency),
    },
    users: {
      tippers: num(users.tippers),
      serviceProviders: num(users.serviceProviders),
      both: num(users.both),
      tipsGivenCount: num(users.tipsGivenCount),
      tipsGivenIncludedInCountryCash: users.tipsGivenIncludedInCountryCash === true,
    },
    tips: {
      count: num(tips.count),
      gross: tips.gross,
      net: tips.net,
      platformFee: tips.platformFee,
      stripeFee: tips.stripeFee,
      countedOn: text(tips.countedOn),
    },
    serviceProviders: {
      pendingBalance: serviceProviders.pendingBalance,
      withdrawals: serviceProviders.withdrawals,
    },
    monthlyReceived: {
      totalsByMonth: monthRows.map((point, index) => normalizeMonth(point, index, year)),
    },
    chargeCurrencies: normalizeChargeCurrencies(data.chargeCurrencies),
    topTippers: listFrom(data.topTippers).map(normalizeRank),
    topServiceProviders: listFrom(data.topServiceProviders).map(normalizeRank),
  }
}

function normalizeMarkets(body: unknown): MarketItem[] {
  const data = readEnvelope(body)
  const rows = Array.isArray(data) ? data : listFrom(data)
  return rows.map((row) => {
    const item = asRecord(row) ?? {}
    const code = item.countryCode
    return {
      countryCode: typeof code === 'string' && code ? code : null,
      country: text(item.country) || (code == null ? 'Unassigned' : ''),
      currency: text(item.currency) || null,
      tippers: num(item.tippers),
      serviceProviders: num(item.serviceProviders),
      both: num(item.both),
      users: num(item.users),
    }
  })
}

export function useAdminMarkets(): UseQueryResult<MarketItem[]> {
  return useQuery({
    queryKey: ['admin_markets'],
    queryFn: async () => {
      const response = await authFetch.get('/admin/markets')
      return normalizeMarkets(response.data)
    },
  })
}

export function useAdminDashboard(): UseQueryResult<AdminDashboard> {
  const countryCode = useCountryStore((state) => state.countryCode)
  const year = useCountryStore((state) => state.year)

  return useQuery({
    queryKey: ['admin_dashboard', countryCode, year],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      const response = await authFetch.get(
        `/admin/dashboard?countryCode=${encodeURIComponent(countryCode || '')}&year=${encodeURIComponent(year)}`
      )
      return normalizeDashboard(response.data, year)
    },
  })
}

export function useAdminUsers(
  role: 'tp' | 'sp' | 'both',
  page: number,
  limit: number,
  search: string,
  status: string
): UseQueryResult<AdminUserPage> {
  const countryCode = useCountryStore((state) => state.countryCode)

  return useQuery({
    queryKey: ['admin_users', countryCode, role, page, limit, search, status],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      const params = new URLSearchParams({
        countryCode: countryCode || '',
        role,
        page: String(page),
        limit: String(limit),
        search: search || '',
        status: status || '',
      })
      const response = await authFetch.get(`/admin/users?${params.toString()}`)
      return readUserPage(response.data, page, limit)
    },
  })
}

export function personLabel(value: unknown, fallback = 'N/A'): string {
  return personName(value) || fallback
}

export function countryLabel(value: unknown): string {
  return personCountry(value)
}
