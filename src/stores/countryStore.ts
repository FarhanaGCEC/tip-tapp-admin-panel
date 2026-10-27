import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CountrySelection = 'unset' | 'country' | 'unassigned'

interface CountryState {
  selection: CountrySelection
  countryCode: string | null
  year: string
  setCountry: (countryCode: string) => void
  setUnassigned: () => void
  clearCountry: () => void
  setYear: (year: string) => void
}

const DEFAULT_COUNTRY = {
  selection: 'country' as CountrySelection,
  countryCode: 'GB',
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      ...DEFAULT_COUNTRY,
      year: new Date().getFullYear().toString(),
      setCountry: (countryCode) =>
        set({ selection: 'country', countryCode }),
      setUnassigned: () =>
        set({ selection: 'unassigned', countryCode: 'UNASSIGNED' }),
      clearCountry: () => set({ ...DEFAULT_COUNTRY }),
      setYear: (year) => set({ year }),
    }),
    {
      name: 'adminCountry',
      version: 2,
      partialize: (state) => ({
        selection: state.selection,
        countryCode: state.countryCode,
        year: state.year,
      }),
      migrate: (persisted) => {
        const state = (persisted ?? {}) as Partial<CountryState>
        if (!state.countryCode || state.selection === 'unset') {
          return { ...state, ...DEFAULT_COUNTRY }
        }
        return state
      },
    }
  )
)
