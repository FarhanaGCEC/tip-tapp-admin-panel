/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import Lucide from '../common/lucide'
import ViewFooterManagementDetails from '../slider/footer-management/view-footer-management'
import EditPencil from '../../assets/images/svg/edit-pencil.svg'
import { getDateValue } from '../../hooks/formatter'
import Label from '../common/label/active-banned-new-label'
import EditFAQDetails from '../slider/faq-management/edit-faq-category'
import { GetDeleteFAQs } from '../../api/faq-management/faq-management'
import SharedDataContainer from '../../containers/sharedData'
import Toast from '../../utils/notification'
import { Icons, NotificationTypes } from '../../constants'
import StatusButton from '../common/button/statusBtn'
import ConfirmationModal from '../common/confirmation/ConfirmationModal'
import Table from '../common/table'
import Rating from '../rating/Rating'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { FAQ } from '../../types/faqs'
interface FormContent {
  title: string
  component: (props: {
    userId: string
    content: any
    mainTopic: string
  }) => React.ReactElement
}

interface FAQManagementTableProps {
  headers: { key: number; label: string }[]
  footerItems: FAQ[]
  handleClick: (
    formContent: {
      title: string
      component: (props: { userletterId: number }) => React.ReactElement
    },
    userletterId: number
  ) => void
}

const FAQManagementTable: React.FC<FAQManagementTableProps> = ({
  headers,
  footerItems,
  handleClick,
}) => {
  const { setNotification } = SharedDataContainer.useContainer()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFAQId, setSelectedFAQId] = useState<string | null>(null)

  const successMessage = () => {
    setNotification({
      title: '',
      message: 'FAQ Deleted Successfully',
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

  const deleteFAQs = GetDeleteFAQs(
    () => {
      successMessage()
    },
    () => {
      errorMessage()
    }
  )

  function handleDelete(faqId: string) {
    setSelectedFAQId(faqId)
    setIsModalOpen(true)
  }

  function confirmDelete() {
    if (selectedFAQId) {
      deleteFAQs.mutate(selectedFAQId)
    }
    setIsModalOpen(false)
  }

  function cancelDelete() {
    setSelectedFAQId(null)
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
                className={`${
                  header.key == 4
                    ? 'whitespace-nowrap text-center'
                    : header.key == 5
                    ? ' pr-5 text-end'
                    : 'whitespace-nowrap'
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {footerItems.map((item) => (
            <Table.Tr
              key={item.id}
            >
              <Table.Td >
                {getDateValue(item.createdAt)}
              </Table.Td>
              <Table.Td >
                {item.title}
              </Table.Td>
              <Table.Td >
                {item.faqCategory.name}
              </Table.Td>
              <Table.Td className="flex items-center justify-center py-6">
                <StatusButton status={item?.status} />
              </Table.Td>

              <Table.Td className="cursor-pointer">
                <div className="flex items-center justify-end gap-3 text-right">
                  <Lucide
                    icon="Eye"
                    className="ml-3 h-6 w-6 text-black"
                    onClick={() =>
                      handleClick(
                        SlideoverRegistry.viewFooterManagement,
                        item.id
                      )
                    }
                  />
                  {/* <Lucide
                    icon="Edit"
                    className="h-5 w-5"
                    onClick={() =>
                      handleClick(
                        {
                          title: `View ${item.name} Details`,
                          component: EditFAQDetails as any,
                        },
                        item
                      )
                    }
                  /> */}
                  <Lucide
                    icon={'Trash2'}
                    className="h-6 w-6 text-red-500"
                    onClick={() => handleDelete(item.id.toString())}
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
        message="Are you sure you want to delete this FAQs?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  )
}

export default FAQManagementTable
