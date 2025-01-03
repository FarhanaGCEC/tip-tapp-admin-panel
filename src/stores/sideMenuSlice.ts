import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { icons } from '../base-components/lucide'

// Interfaces
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

const permissionsToken = localStorage.getItem('validationToken')
let availablePermissons = permissionsToken ? JSON.parse(atob(permissionsToken.split('.')[1])) : { permissions: [] }

const hasPermission = (requiredPermission: string) => {
  if (availablePermissons.name === 'SUPER_ADMIN') {
    return true
  }
  return availablePermissons.permissions.includes(requiredPermission)
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: 'Home',
      title: 'Home',
      pathname: '/dashboard',
    },
    hasPermission('user_management.view') && {
      icon: 'User',
      title: 'Admin Users',
      subMenu: [
        hasPermission('user_management.view') && {
          icon: 'Activity',
          pathname: '/manage-users',
          title: 'User List',
        },
        hasPermission('role_management.view') && {
          icon: 'Activity',
          pathname: '/manage-user-roles',
          title: 'User Roles',
        },
      ].filter(Boolean), 
    },
    hasPermission('tp_management.view') && {
      icon: 'Users',
      title: 'Tipper',
      pathname: '/manage-tippers',
    },
    hasPermission('sp_management.view') && {
      icon: 'Box',
      title: 'Service Provider',
      pathname: '/manage-service-providers',
    },
    {
      icon: 'Wallet',
      title: 'Tip Management',
      pathname: '/manage-finances',
    },
    hasPermission('review_management.view') && {
      icon: 'MessageSquare',
      title: 'Reviews',
      pathname: '/manage-reviews',
    },
    hasPermission('footer_management.view') && {
      icon: 'FileCode',
      title: 'Footer',
      subMenu: [
        hasPermission('footer_management.view') && {
          icon: 'Activity',
          pathname: '/footer-management',
          title: 'Footer List',
        },
        hasPermission('faq_management.view') && {
          icon: 'Activity',
          pathname: '/manage-faqs',
          title: 'FAQ',
        },
        hasPermission('faq_category.view') && {
          icon: 'Activity',
          pathname: '/manage-faq-categories',
          title: 'FAQ Category',
        },
      ].filter(Boolean), 
    },
    'devider',
    hasPermission('announcement.view') && {
      icon: 'Megaphone',
      title: 'Announcements',
      pathname: '/annoucements',
    },
    {
      icon: 'Newspaper',
      title: 'Newsletters',
      pathname: '/newsletter-management',
    },
    {
      icon: 'FileText',
      title: 'Reports',
      pathname: '/reports',
    },
    hasPermission('settings.view') && {
      icon: 'Settings',
      title: 'Settings',
      subMenu: [
        {
          icon: 'Activity',
          pathname: '/tip-setting',
          title: 'Tip Settings',
        },
        {
          icon: 'Activity',
          pathname: '/gateway-setting',
          title: 'Gateways',
        },
      ],
    },
  ].filter(Boolean), 
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {},
})

export const selectSideMenu = (state: RootState) => state.sideMenu.menu

export default sideMenuSlice.reducer
