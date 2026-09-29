/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import clsx from 'clsx'
import { truncate } from 'lodash'
import { DateTime } from 'luxon'
import Lucide from '../common/lucide'
import Label from '../common/label/active-banned-new-label'
import Table from '../common/table'
import { toTitleCase } from '../../utils/textFormatters'
import { useMarkNotificationAsRead } from '../../api/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import Toast from '../../utils/notification'

interface FormContent {
  title: string
  component: (props: { content: any }) => React.ReactElement
}

interface NotificationsTableItem {
  NotificationID: number
  Title: string
  Message: string
  NotificationDate: string
  IsRead: boolean
  NotificationType: string
}

interface NotificationsTableProps {
  headers: { key: number; label: string }[]
  notificationItems: NotificationsTableItem[]
  handleClick: (formContent: FormContent, item: any) => void
}

const NotificationsTable: React.FC<NotificationsTableProps> = ({
  headers,
  notificationItems,
  handleClick,
}) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput)

    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }

    return inputDate.toLocaleDateString('en-US', options)
  }

  const { setNotification } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState(false)

  const markAsReadMutation = useMarkNotificationAsRead()

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      setIsLoading(true)
      await markAsReadMutation.mutateAsync(notificationId)

      setNotification({
        title: 'Success',
        message: 'Notification marked as read',
        icon: Icons.CHECKCIRCLE,
        type: NotificationTypes.SUCCESS,
      })
      Toast()

      window.location.reload()
    } catch (error) {
      setNotification({
        title: 'Error',
        message: 'Failed to mark notification as read',
        icon: Icons.XCIRCLE,
        type: NotificationTypes.ERROR,
      })
      Toast()
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusLabel = (isRead: boolean) => {
    return isRead ? (
      <Label labledata="Read" lablestyle="bg-slate-400" />
    ) : (
      <Label labledata="Unread" lablestyle="bg-blue-400 text-blue-600" />
    )
  }

  const getTypeLabel = (type: string) => {
    const typeColors: { [key: string]: string } = {
      tip: 'bg-green-400 text-green-600',
      announcement: 'bg-blue-400 text-blue-600',
      system: 'bg-gray-400 text-gray-600',
    }

    return (
      <Label
        labledata={toTitleCase(type)}
        lablestyle={typeColors[type] || 'bg-gray-400 text-gray-600'}
      />
    )
  }

  return (
    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <Table cards className="border-slate-200">
        <Table.Thead variant="default">
          <Table.Tr className="border-b border-slate-200/60">
            {headers.map((header, headerKey) => (
              <Table.Th
                key={headerKey}
                className="whitespace-nowrap px-2.5 py-3.5 font-medium text-slate-700"
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {notificationItems.map((item, itemKey) => (
            <Table.Tr
              key={itemKey}
              className={clsx([
                'intro-x',
                item.IsRead ? 'bg-slate-50' : 'bg-blue-50',
                'transition-colors hover:bg-slate-100',
              ])}
            >
              <Table.Td className="whitespace-nowrap px-2.5 py-3.5">
                <div className="flex items-center">
                  {!item.IsRead && (
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                  )}
                  <div
                    className={clsx([
                      'font-medium',
                      item.IsRead
                        ? ''
                        : 'font-semibold text-slate-900',
                    ])}
                  >
                    {item.Title}
                  </div>
                </div>
              </Table.Td>
              <Table.Td className="whitespace-nowrap px-2.5 py-3.5">
                <div >
                  {truncate(item.Message, { length: 50 })}
                </div>
              </Table.Td>
              <Table.Td className="whitespace-nowrap px-2.5 py-3.5">
                {getTypeLabel(item.NotificationType)}
              </Table.Td>
              <Table.Td className="whitespace-nowrap px-2.5 py-3.5">
                <div >
                  {getDateValue(item.NotificationDate)}
                </div>
              </Table.Td>
              <Table.Td className="whitespace-nowrap px-2.5 py-3.5">
                <div className="flex items-center gap-2">
                  {getStatusLabel(item.IsRead)}
                  {!item.IsRead && (
                    <button
                      onClick={() => handleMarkAsRead(item.NotificationID)}
                      className="text-xs text-blue-600 underline hover:text-blue-800"
                      disabled={isLoading}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default NotificationsTable
