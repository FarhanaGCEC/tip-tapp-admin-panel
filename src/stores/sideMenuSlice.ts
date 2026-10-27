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

type PermissionPayload = { permissions: string[]; name?: string }

function readPermissionsFromToken(): PermissionPayload {
  const permissionsToken = localStorage.getItem('validationToken')
  if (!permissionsToken) {
    return { permissions: [] }
  }

  try {
    const tokenParts = permissionsToken.split('.')
    if (tokenParts.length < 2) {
      return { permissions: [] }
    }
    const payload = tokenParts[1]
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4)
    return JSON.parse(atob(paddedPayload)) as PermissionPayload
  } catch (error) {
    console.warn('Failed to decode permissions token:', error)
    return { permissions: [] }
  }
}

function createPermissionChecker(available: PermissionPayload) {
  return (requiredPermission: string) => {
    if (available.name === 'SUPER_ADMIN') {
      return true
    }
    return available.permissions.includes(requiredPermission)
  }
}

/** Build menu from current validationToken — call after login, not only at module load. */
export function buildSideMenu(): Array<Menu | 'devider'> {
  const hasPermission = createPermissionChecker(readPermissionsFromToken())

  return [
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
    hasPermission('tp_management.view') || hasPermission('sp_management.view')
      ? {
          icon: 'UserPlus',
          title: 'Dual Role',
          pathname: '/manage-dual-role',
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
      icon: 'Car',
      title: 'Share a Ride',
      pathname: '/share-a-ride/add-trip',
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
  ].filter((item) => item !== null) as (Menu | 'devider')[]
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
