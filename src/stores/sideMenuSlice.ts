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
let availablePermissons: { permissions: string[]; name?: string } = {
  permissions: [],
}

if (permissionsToken) {
  try {
    const tokenParts = permissionsToken.split('.')
    if (tokenParts.length >= 2) {
      const payload = tokenParts[1]
      // Add padding if needed for Base64 decoding
      const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4)
      availablePermissons = JSON.parse(atob(paddedPayload))
    }
  } catch (error) {
    console.warn('Failed to decode permissions token:', error)
    availablePermissons = { permissions: [] }
  }
}

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
      title: 'Dashboard',
      pathname: '/dashboard',
    },
    hasPermission('user_management.view')
      ? {
          icon: 'User',
          title: 'Admin Users',
          subMenu: [
            hasPermission('user_management.view')
              ? {
                  icon: 'Activity',
                  pathname: '/manage-users',
                  title: 'User List',
                }
              : null,
            hasPermission('role_management.view')
              ? {
                  icon: 'Activity',
                  pathname: '/manage-user-roles',
                  title: 'User Roles',
                }
              : null,
          ].filter((item) => item !== null) as Menu[],
        }
      : null,
    hasPermission('tp_management.view')
      ? {
          icon: 'Users',
          title: 'Tipper',
          pathname: '/manage-tippers',
        }
      : null,
    hasPermission('sp_management.view')
      ? {
          icon: 'Box',
          title: 'Service Provider',
          pathname: '/manage-service-providers',
        }
      : null,
    {
      icon: 'Wallet',
      title: 'Tip Management',
      pathname: '/manage-finances',
    },
    hasPermission('review_management.view')
      ? {
          icon: 'MessageSquare',
          title: 'Reviews',
          pathname: '/manage-reviews',
        }
      : null,
    hasPermission('support_management.view')
      ? {
          icon: 'Headphones',
          title: 'Support',
          pathname: '/contact-us-management',
        }
      : null,
    hasPermission('footer_management.view')
      ? {
          icon: 'FileCode',
          title: 'Footer',
          subMenu: [
            hasPermission('footer_management.view')
              ? {
                  icon: 'Activity',
                  pathname: '/footer-management',
                  title: 'Footer List',
                }
              : null,
            hasPermission('faq_management.view')
              ? {
                  icon: 'Activity',
                  pathname: '/manage-faqs',
                  title: 'FAQ',
                }
              : null,
            hasPermission('faq_category.view')
              ? {
                  icon: 'Activity',
                  pathname: '/manage-faq-categories',
                  title: 'FAQ Category',
                }
              : null,
          ].filter((item) => item !== null) as Menu[],
        }
      : null,
    'devider',
    hasPermission('announcement.view')
      ? {
          icon: 'Megaphone',
          title: 'Announcements',
          pathname: '/annoucements',
        }
      : null,
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
    hasPermission('settings.view')
      ? {
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
        }
      : null,
  ].filter((item) => item !== null) as (Menu | 'devider')[],
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {},
})

export const selectSideMenu = (state: RootState) => state.sideMenu.menu

export default sideMenuSlice.reducer
