/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import Lucide from '../common/lucide'
import EditPencil from '../../assets/images/svg/edit-pencil.svg'
import DeleteIcon from '../../assets/images/svg/delete-icon.svg'
import Label from '../common/label/active-banned-new-label'
import ViewAnnouncementDetails from '../slider/annoucements/view-annoucements'
import { truncate } from 'lodash'
import Table from '../common/table'
import permissionChecker from '../../hooks/permissonChecker'
import { toTitleCase } from '../../utils/textFormatters'
import EditAnnouncements from '../../pages/annoucements/edit-annoucements'
import { useDeleteAnnouncement } from '../../api/announcement-management/announcement-management'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import Toast from '../../utils/notification'
import StatusButton from '../common/button/statusBtn'
import { DateTime } from 'luxon'
import ConfirmationModal from '../common/confirmation/ConfirmationModal'

interface FormContent {
  title: string
  component: (props: {
    userId: string
    content: any
    mainTopic: string
  }) => React.ReactElement
}

interface NewsLettersTableItem {
  id: string
  createdAt: string
  title: string
  name: string
  RichText: string
  sentAt: string
  Title: string
  UserType: string
  NotificationType: string
  IsRead: boolean
  status: string
  NotificationDate: string
}

interface NewsLettersTableProps {
  headers: { key: number; label: string }[]
  newsletterItems: NewsLettersTableItem[]
  handleClick: (formContent: FormContent, item: any) => void
}

const AnnoucementsTable: React.FC<NewsLettersTableProps> = ({
  headers,
  newsletterItems,
  handleClick,
}) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput)
     

    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return inputDate.toLocaleDateString('en-US', options)
  }
  const { setNotification } = SharedDataContainer.useContainer()
const [isModalOpen, setIsModalOpen] = useState(false)
const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
  null
)
   const successMessage = () => {
     setNotification({
       title: '',
       message: 'Announcement deleted successfully',
       icon: Icons.CHECKCIRCLE,
       type: NotificationTypes.SUCCESS,
     })
     Toast()
   }

   const errorMessage = () => {
     setNotification({
       title: '',
       message: 'Something went wrong',
       icon: Icons.CHECKCIRCLE,
       type: NotificationTypes.ERROR,
     })
     Toast()
   }

   const deleteFAQCategory = useDeleteAnnouncement(
     () => {
       successMessage()
     },
     () => {
       errorMessage()
     }
   )

   function handleDelete(categoryId: string) {
     setSelectedCategoryId(categoryId)
     setIsModalOpen(true)
   }

   function confirmDelete() {
     if (selectedCategoryId) {
       deleteFAQCategory.mutate(selectedCategoryId)
     }
     setIsModalOpen(false)
   }

   function cancelDelete() {
     setSelectedCategoryId(null)
     setIsModalOpen(false)
   }

  return (
    <>
      <Table cards className="sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`whitespace-nowrap ${
                  header.key === 6 || header.key === 7 ? 'text-center' : ''
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {newsletterItems.map((item) => (
            <Table.Tr
              key={item.id}
            >
              <Table.Td >
                {item.NotificationDate
                  ? DateTime.fromISO(item.NotificationDate)
                      .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone) // Set to user's local timezone
                      .toLocaleString({
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })
                  : '-'}
              </Table.Td>
              <Table.Td >
                {item.sentAt && item?.status === 'sent'
                  ? new Date(item.sentAt).toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : '-'}
              </Table.Td>
              <Table.Td >
                {item.Title.length > 20
                  ? `${item.Title.slice(0, 20)} .....`
                  : item.Title}
              </Table.Td>
              <Table.Td >
                {item.UserType
                  ? item.UserType === 'tp'
                    ? 'Tipper'
                    : item.UserType === 'sp'
                    ? 'Service Provider'
                    : item.UserType === 'both'
                    ? 'BOTH'
                    : item.UserType === 'staff'
                    ? 'Staff'
                    : item.UserType === 'all'
                    ? 'All'
                    : '-'
                  : 'All'}
              </Table.Td>
              <Table.Td className="ml-4">
                {item.NotificationType
                  ? item.NotificationType.toLowerCase() === 'email'
                    ? 'Email'
                    : item.NotificationType.toLowerCase() === 'inapp'
                    ? 'In App'
                    : toTitleCase(item.NotificationType)
                  : '-'}
              </Table.Td>
              <Table.Td className="ml-4">
                <div className="flex justify-center">
                  <StatusButton status={item?.status} />
                </div>
              </Table.Td>
              <Table.Td className="cursor-pointer justify-center">
                <div className="flex justify-center gap-3">
                  <Lucide
                    icon="Eye"
                    className="h-6 w-6 text-black"
                    onClick={() => {
                      handleClick(
                        {
                          title: `View Announcement`,
                          component: (props) => (
                            <ViewAnnouncementDetails
                              {...props}
                              body={item?.RichText}
                              title={item?.Title}
                              dateTime={item?.sentAt}
                              scope={item?.UserType}
                              type={item?.NotificationType}
                              UserType={item?.UserType}
                            />
                          ),
                        },
                        item
                      )
                    }}
                  />
                  <Lucide
                    icon="Edit"
                    className="h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(
                        {
                          title: `Edit Announcement`,
                          component: (props) => (
                            <EditAnnouncements
                              {...props}
                              id={item.id}
                              body={item?.RichText}
                              title={item?.Title}
                              dateTime={item?.sentAt}
                              scope={item?.UserType}
                              type={item?.NotificationType}
                              UserType={item?.UserType}
                            />
                          ),
                        },
                        item
                      )
                    }
                  />
                  <Lucide
                    icon={'Trash2'}
                    className="h-6 w-6 text-red-500"
                    onClick={() => {
                      // mutate(item.id)
                      handleDelete(item.id)
                    }}
                  />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this Announcement?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  )
}

export default AnnoucementsTable
