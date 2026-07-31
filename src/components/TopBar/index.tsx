/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/extensions */
import { useState } from 'react'
import _, { truncate } from 'lodash'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Lucide from '../../components/common/lucide'
import Breadcrumb from '../../base-components/Breadcrumb'
import { FormInput } from '../common/form-elements/components'
import { Menu, Popover } from '../common/headless'
import UserAvatar from '../common/user-avatar'
import SocketClient from '../../hooks/SocketClient'
import {
  useGetNotificationsList,
  useMarkNotificationAsRead,
} from '../../api/notification'
import NoDataFound from '../../assets/images/NoDataFound.png'
import CurrencyToggle from '../common/currency-toggle'

// function getCurrentDate() {
//   const currentDate = new Date()
//   const day = currentDate.getDate()
//   const month = currentDate.getMonth() + 1
//   const year = currentDate.getFullYear()
//   return `${day}/${month}/${year}`
// }

// Define the breadcrumb map with specific types
const breadcrumbMap: { [key: string]: string } = {
  '/tip-setting': 'Tip Settings',
  '/manage-users': 'Admin User Management',
  '/manage-user-roles': 'Admin Role Management',
  '/manage-tippers': 'Tipper Management',
  '/manage-service-providers': 'Service Provider Management',
  '/manage-finances': 'Tip Management',
  '/manage-reviews': 'Review Management',
  '/gateway-setting': 'Gateway Settings',
  '/footer-management': 'Footer Management',
  '/annoucements': 'Annoucements',
  '/reports': 'Reports',
  '/newsletter-management': 'Newsletter Management',
  '/manage-faqs': 'FAQs',
  '/manage-faq-categories': 'FAQ Categories',
}

function Main() {
  const [searchDropdown, setSearchDropdown] = useState(false)

  const { pathname } = useLocation()

  // Type assertion for pathname to ensure it's a valid key
  const breadcrumbLabel =
    breadcrumbMap[pathname as keyof typeof breadcrumbMap] || 'Dashboard'

  const showSearchDropdown = () => {
    setSearchDropdown(true)
  }
  const hideSearchDropdown = () => {
    setSearchDropdown(false)
  }

  let user: {
    Email: string
    Role: string
    ProfilePictureURL?: string
    FirstName?: string
    LastName?: string
  } = { Email: '', Role: '' }
  try {
    const userData = localStorage.getItem('user')
    if (userData) {
      user = JSON.parse(userData)
    }
  } catch (error) {
    console.warn('Failed to parse user data from localStorage:', error)
  }
  const { data, isLoading, error } = useGetNotificationsList(1, 10)
  const markAsReadMutation = useMarkNotificationAsRead()

  // Calculate unread count
  const unreadCount = data?.items?.filter((item) => !item.IsRead).length || 0

  // Handle marking notification as read
  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsReadMutation.mutateAsync(notificationId)
      // The query will automatically refetch due to React Query's cache invalidation
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    )

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="relative z-[51] flex h-[67px] items-center border-b border-slate-200">
        <SocketClient email={user.Email} role={user.Role} />
        {/* BEGIN: Breadcrumb */}
        <Breadcrumb className="-intro-x mr-auto hidden sm:flex">
          <Breadcrumb.Link to="/" className="text-brand-navy">
            TipApp
          </Breadcrumb.Link>
          <Breadcrumb.Link to={pathname} active>
            {breadcrumbLabel}
          </Breadcrumb.Link>
        </Breadcrumb>
        {/* <Menu>
          <Menu.Button>
            <Button
              size="sm"
              variant="twitter"
              className="relative mr-2 w-20 justify-start rounded-full"
            >
              POS
              <span className="absolute bottom-0 right-0 top-0 my-auto ml-auto mr-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary">
                <Lucide icon="Airplay" className="h-4 w-4" />
              </span>
            </Button>
          </Menu.Button>

          <Menu.Items className="w-36">
            <a href="/pos">
              <Menu.Item>
                <Lucide icon="Monitor" className="mr-2 h-4 w-4 " /> POS
              </Menu.Item>
            </a>
            <Menu.Item>
              <Link className="flex" to="/pos">
                <Lucide icon="Tv2" className="mr-2 mt-0.5 h-4 w-4" /> SM POS
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu> */}
        {/* <Tippy
          as="a"
          href="https://projects.storemate.lk/customer"
          className="zoom-in mr-2 flex h-8 w-8 items-center justify-center rounded-full border bg-primary bg-opacity-90 text-white dark:border-darkmode-400"
          content="Support"
        >
          <Lucide icon="Headphones" className="h-4 w-4 " />
        </Tippy> */}

        {/* <Tippy
          as="a"
          href="/pos"
          className="zoom-in mr-2 flex h-8 w-8 items-center justify-center rounded-full border bg-danger bg-opacity-60 text-white dark:border-darkmode-400"
          content="Add Repair"
        >
          <Lucide icon="Wrench" className="h-4 w-4 " />
        </Tippy> */}
        {/* <Button
              size='sm'
              variant="twitter"
              className="relative justify-start mr-2 w-24 rounded-full"
            >
              Support   
              <span className="w-6 h-6 absolute flex justify-center items-center bg-white text-primary rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                <Lucide icon="Headphones" className="w-4 h-4" />
              </span>
            </Button> */}

        <div className="intro-x relative mr-3">
          <CurrencyToggle />
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Popover className="intro-x mr-4 sm:mr-2">
            <Popover.Button
              className={clsx([
                'zoom-in relative block items-center',
                unreadCount > 0 &&
                  "before:absolute before:right-0 before:top-[-2px] before:h-[8px] before:w-[8px] before:rounded-full before:bg-danger before:content-['']",
              ])}
            >
              <Lucide icon="Bell" className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Popover.Button>
            <Popover.Panel className="mt-2 w-[280px] p-5 sm:w-[350px]">
              <div className="mb-5 font-medium">Notifications</div>
              <div className="h-64 overflow-y-auto">
                {isLoading ? (
                  <div className="flex h-32 items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="flex h-32 items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-red-500">
                        Failed to load notifications
                      </div>
                    </div>
                  </div>
                ) : !data?.items || data.items.length === 0 ? (
                  <div className="flex h-32 items-center justify-center">
                    <div className="text-center">
                      <img
                        src={NoDataFound}
                        alt="No notifications"
                        className="mx-auto mb-2 h-16 w-16"
                      />
                      <div className="text-sm text-slate-500">
                        No notifications available
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {data.items.slice(0, 10).map((item) => (
                      <div
                        key={item.NotificationID}
                        className={clsx([
                          'mb-3 rounded-lg p-2 transition-colors',
                          item.IsRead
                            ? 'hover:bg-slate-50'
                            : 'bg-blue-50 hover:bg-blue-100',
                        ])}
                      >
                        <div className="flex items-start">
                          {!item.IsRead && (
                            <div className="mr-2 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                          )}
                          <div className="flex-1">
                            <div
                              className={clsx([
                                'text-sm',
                                item.IsRead
                                  ? 'text-slate-600'
                                  : 'font-semibold text-slate-900',
                              ])}
                            >
                              {item.Title}
                            </div>
                            <div className="mt-1 line-clamp-2 text-xs text-slate-500">
                              {item.Message}
                            </div>
                            {/* <div className="mt-1 text-xs text-slate-400">
                              {formatDate(item.NotificationDate)}
                            </div> */}
                            {!item.IsRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMarkAsRead(item.NotificationID)
                                }}
                                className="mt-2 text-xs text-blue-600 underline hover:text-blue-800"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {data.items.length > 0 && (
                      <div className="border-t border-slate-200 pt-3">
                        <Link
                          to="/notifications"
                          className="hover:text-primary-dark block w-full py-2 text-center text-sm text-primary"
                        >
                          View All Notifications
                        </Link>
                      </div>
                    )}

                    {data.items.length <= 10 && data.meta.totalItems > 10 && (
                      <div className="border-t border-slate-200 pt-3">
                        <Link
                          to="/notifications"
                          className="hover:text-primary-dark block w-full py-2 text-center text-sm text-primary"
                        >
                          View All Notifications
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Popover.Panel>
          </Popover>
          <Menu>
            <Menu.Button className="image-fit zoom-in intro-x block h-8 w-8 scale-110 overflow-hidden rounded-full shadow-lg">
              <UserAvatar
                src={user.ProfilePictureURL}
                alt={`${user.FirstName || 'User'} ${user.LastName || ''}`.trim()}
                className="h-full w-full"
              />
            </Menu.Button>
            <Menu.Items className="relative mt-px w-56  before:absolute before:inset-0 before:z-[-1] before:block before:rounded-md before:bg-brand-navy ">
              <Menu.Header className="font-normal">
                <div className="font-medium">
                  {`${user.FirstName || 'User'} ${user.LastName || ''}`}
                </div>
                <div className="/70 mt-0.5 break-before-auto text-xs dark:text-slate-500">
                  {truncate(user.Email)}
                </div>
              </Menu.Header>
              <Menu.Devider />
              <Link
                className="flex hover:rounded-md hover:bg-primary/10 "
                to="/login"
              >
                <Menu.Item>
                  <Lucide icon="ToggleRight" className="mr-2 h-4 w-4 " /> Logout
                </Menu.Item>
              </Link>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </>
  )
}

export default Main
