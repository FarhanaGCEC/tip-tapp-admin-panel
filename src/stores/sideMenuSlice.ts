import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { icons } from '../base-components/lucide'

export interface Menu {
  icon: keyof typeof icons
  title: string
  pathname?: string
  subMenu?: Menu[]
  ignore?: boolean
}

export interface SideMenuState {
  menu: Array<Menu | 'devider'>
}

export function buildSideMenu(): Array<Menu | 'devider'> {
  return [
    {
      icon: 'Home',
      title: 'Dashboard',
      pathname: '/dashboard',
    },
    {
      icon: 'Wallet',
      title: 'Accounts',
      pathname: '/accounts',
    },
    {
      icon: 'Users',
      title: 'Drivers',
      pathname: '/manage-tippers',
    },
    {
      icon: 'Car',
      title: 'Cars',
      pathname: '/manage-service-providers',
    },
    {
      icon: 'FileText',
      title: 'Rentals',
      pathname: '/manage-finances',
    },
  ]
}

const initialState: SideMenuState = {
  menu: buildSideMenu(),
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    rebuildSideMenu(state) {
      state.menu = buildSideMenu()
    },
  },
})

export const { rebuildSideMenu } = sideMenuSlice.actions

export const selectSideMenu = (state: RootState) => state.sideMenu.menu

export default sideMenuSlice.reducer
