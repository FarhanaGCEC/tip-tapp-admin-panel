export type MarketItem = {
  countryCode: string | null
  country: string
  currency: string | null
  tippers: number
  serviceProviders: number
  both: number
  users: number
}

export type AdminAmount = {
  displayAmount?: number
  currency?: string
}

export type MonthlyReceivedPoint = {
  month: string
  monthIndex: number
  monthLabel: string
  total: number
  amounts?: AdminAmount
}

export type RankedUser = {
  id?: string | number
  firstName: string
  lastName: string
  country: string
  profilePictureUrl?: string
  tipCount: number
  amount?: unknown
  averageRating?: number
}

export type ChargeCurrencyRow = {
  currency: string
  count: number
  chargeTotal: number | null
}

export type AdminDashboard = {
  market: {
    countryCode: string
    country: string
    currency: string
  }
  users: {
    tippers: number
    serviceProviders: number
    both: number
    tipsGivenCount: number
    tipsGivenIncludedInCountryCash: boolean
  }
  tips: {
    count: number
    gross?: unknown
    net?: unknown
    platformFee?: unknown
    stripeFee?: unknown
    countedOn?: string
  }
  serviceProviders: {
    pendingBalance?: unknown
    withdrawals?: unknown
  }
  monthlyReceived: {
    totalsByMonth: MonthlyReceivedPoint[]
  }
  chargeCurrencies: ChargeCurrencyRow[]
  topTippers: RankedUser[]
  topServiceProviders: RankedUser[]
}
