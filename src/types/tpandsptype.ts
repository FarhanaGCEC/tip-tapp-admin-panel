interface BankDetails {
  accountNumber: string | null;
  bankName: string | null;
  routingNumber: string | null;
  accountName: string | null;
  ibanNumber: string | null;
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
  Provider: string
  CreatedAt: string
  UpdatedAt: string
  FrontImageID: string
  BackImageID: string
  EmiratesId: string
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
