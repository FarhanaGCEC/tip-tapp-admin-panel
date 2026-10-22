import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PlatformName } from '../data/fleet-dummy'

export const COMPANIES: PlatformName[] = ['Uber', 'Yango', 'Bolt']

interface CompanyState {
  company: PlatformName
  setCompany: (company: PlatformName) => void
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      company: 'Uber',
      setCompany: (company) => set({ company }),
    }),
    { name: 'fleetCompany' }
  )
)
