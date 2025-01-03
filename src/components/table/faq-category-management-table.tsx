import React, { useState } from 'react'
import Lucide from '../common/lucide'
import SharedDataContainer from '../../containers/sharedData'
import Toast from '../../utils/notification'
import { Icons, NotificationTypes } from '../../constants'
import { GetDeleteFAQCategory } from '../../api/faq-management/faq-management'
import StatusButton from '../common/button/statusBtn'
import ConfirmationModal from '../common/confirmation/ConfirmationModal'
import Table from '../../base-components/Table'
import {FaqCategory} from '../../types/faq-category'
interface FAQCategoryManagementTableProps {
  headers: { key: number; label: string }[]
  faqCategoryItems: FaqCategory[]
  handleClick: any
}

const FAQCategoryManagementTable: React.FC<FAQCategoryManagementTableProps> = ({
  headers,
  faqCategoryItems,
  handleClick,
}) => {
  const { setNotification } = SharedDataContainer.useContainer()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  )

  const successMessage = () => {
    setNotification({
      title: '',
      message: 'FAQ Category Deleted Successfully',
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

  const deleteFAQCategory = GetDeleteFAQCategory(
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
      <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`${
                  header.key == 4
                    ? 'whitespace-nowrap border-b-0 text-center'
                    : header.key == 5
                    ? ' border-b-0 pr-5 text-end'
                    : 'whitespace-nowrap border-b-0'
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {faqCategoryItems.map((item) => (
            <Table.Tr
              className="intro-x h-[68px] drop-shadow-lg "
              key={item?.id || 'unknown-id'}
            >
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {item?.name || 'N/A'}
              </Table.Td>
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {item?.orderType || 'N/A'}
              </Table.Td>
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {item?.addedBy || 'N/A'}
              </Table.Td>
              <Table.Td className="flex items-center justify-center  border-b-0 bg-white  py-6 shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <StatusButton status={item?.status} />
              </Table.Td>

              <Table.Td className="cursor-pointer border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <div className="flex items-center justify-end gap-3 pr-5 text-right">
                  <Lucide
                    icon={'Trash2'}
                    className="h-6 w-6 text-red-500"
                    onClick={() => {
                      if (item?.id) {
                        handleDelete(item.id.toString())
                      } else {
                        console.error('Item ID is undefined or invalid:', item)
                      }
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
        message="Are you sure you want to delete this FAQ Categories?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  )
}

export default FAQCategoryManagementTable
