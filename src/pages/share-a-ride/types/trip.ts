export interface SavedVehicle {
  id: number
  label: string
  meta: string
}

export interface TripDetailsForm {
  vehicleId: string
  tripTitle: string
  aboutMe: string
  startLocation: string
  endLocation: string
  startDate: string
  endDate: string
  departureTime: string
}

export interface VehicleSeatsForm {
  stops: string[]
  currency: string
  travellingWith: number
  frontSeats: number
  frontSeatCharge: string
  backSeats: number
  backSeatCharge: string
  luggageLimit: number
  addDiscount: boolean
  petsAllowed: boolean
  termsAndConditions: string
  policyNotes: string
}

export interface TripFormData {
  tripDetails: TripDetailsForm
  vehicleSeats: VehicleSeatsForm
}

export const EMPTY_TRIP_DETAILS: TripDetailsForm = {
  vehicleId: '',
  tripTitle: '',
  aboutMe: '',
  startLocation: '',
  endLocation: '',
  startDate: '',
  endDate: '',
  departureTime: '',
}

export const EMPTY_VEHICLE_SEATS: VehicleSeatsForm = {
  stops: [],
  currency: 'USD',
  travellingWith: 1,
  frontSeats: 1,
  frontSeatCharge: '',
  backSeats: 0,
  backSeatCharge: '',
  luggageLimit: 0,
  addDiscount: false,
  petsAllowed: false,
  termsAndConditions: '',
  policyNotes: '',
}

export const MOCK_VEHICLES: SavedVehicle[] = [
  { id: 1, label: '2019 Honda Civic', meta: 'sedan · automatic · 9226' },
  { id: 2, label: '2021 Toyota Camry', meta: 'sedan · automatic · 4412' },
  { id: 3, label: '2020 Ford Explorer', meta: 'suv · automatic · 7781' },
]

export const CURRENCY_OPTIONS = [
  { id: 1, name: 'USD - US Dollar', value: 'USD' },
  { id: 2, name: 'GBP - British Pound', value: 'GBP' },
  { id: 3, name: 'AED - UAE Dirham', value: 'AED' },
  { id: 4, name: 'EUR - Euro', value: 'EUR' },
]
