interface BankDetails {
  accountNumber: string | null;
  bankName: string | null;
  routingNumber: string | null;
  accountName: string | null;
  ibanNumber: string | null;
}

export type OnboardingStatus = 'not_started' | 'incomplete' | 'completed'

export interface CardDetails {
  bankName?: string | null
  accountNumber?: string | null
  ibanNumber?: string | null
  accountHolderName?: string | null
  currency?: string | null
  onboardingStatus?: OnboardingStatus
  onboardingStatusLabel?: string | null
  isOnboarded?: boolean
  payoutsEnabled?: boolean
}

export interface PayoutOnboarding {
  status?: OnboardingStatus
  statusLabel?: string | null
  isOnboarded?: boolean
  payoutsEnabled?: boolean
  bankName?: string | null
  accountLast4?: string | null
}
export interface TipItem {
  id: number
  KeyCloakID: string
  Username: string
  FirstName: string
  LastName: string
  Address: string
  Email: string
  Phone: string
  Whatsapp: string
  Country: string
  City: string
  VerificationCode: string | null
  Bio: string
  Paypal: string | null
  ProfilePictureURL: string
  DateOfBirth: string | null
  Role: string
  role: any
  Status: string
  NotificationSettings: string | null
  bankDetails: BankDetails[] | null
  cardDetails?: CardDetails | null
  payoutOnboarding?: PayoutOnboarding | null
  Provider: string
  CreatedAt: string
  UpdatedAt: string
  FrontImageID: string
  BackImageID: string
  EmiratesId: string
  balance?: number
  BalanceOriginal?: number
  TotalWithdrawal?: number
  TotalWithdrawalOriginal?: number
  TotalTipsGiven?: number
  TotalTipsGivenOriginal?: number
  financials?: {
    balance?: { amounts?: { GBP: number; AED: number }; amount?: number; amountAED?: number }
    totalWithdrawal?: { amounts?: { GBP: number; AED: number }; amount?: number; amountAED?: number }
    totalTipsGiven?: { amounts?: { GBP: number; AED: number }; amount?: number; amountAED?: number }
  }
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface GetTpAndspiResponse {
  data: {
    items: TipItem[]
    meta: Meta
  }
  message: string
}

export interface GetPending {
  data: {
    items: TipItem[]
    meta: Meta
    total: number
  }
  message: string
}
