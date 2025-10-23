/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import { truncate } from 'lodash'
import Table from '../common/table'
import Lucide from '../common/lucide'
import { ContactMessage } from '../../types/contactUsTypes'
import permissionChecker from '../../hooks/permissonChecker'
import ConfirmationModal from '../common/confirmation/ConfirmationModal'

interface ContactUsTableProps {
  headers: { key: number; label: string }[]
  contactMessages: ContactMessage[]
  handleViewOnClick: (messageId: string) => void
  handleReplyOnClick: (messageId: string) => void
  handleDeleteOnClick: (messageId: string) => void
}

function ContactUsTable({
  headers,
  contactMessages,
  handleViewOnClick,
  handleReplyOnClick,
  handleDeleteOnClick,
}: ContactUsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  )

  function handleDelete(messageId: string) {
    setSelectedMessageId(messageId)
    setIsModalOpen(true)
  }

  function confirmDelete() {
    if (selectedMessageId) {
      handleDeleteOnClick(selectedMessageId)
    }
    setIsModalOpen(false)
  }

  function cancelDelete() {
    setSelectedMessageId(null)
    setIsModalOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div>
      <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`whitespace-nowrap border-b-0 ${
                  header.key === 5 || header.key === 6 ? 'text-center' : ''
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {contactMessages.map((message) => (
            <Table.Tr
              className="intro-x h-[68px] drop-shadow-lg"
              key={message.id}
            >
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {message.name}
              </Table.Td>
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {truncate(message.email, { length: 25 })}
              </Table.Td>
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {truncate(message.message, { length: 50 })}
              </Table.Td>
              <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                {formatDate(message.createdAt)}
              </Table.Td>
              <Table.Td className="ml-4 border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md">
                <div className="flex justify-center">
                  <span
                    className={`inline-flex rounded px-3 py-1 text-xs font-semibold ${
                      message.status === 'replied'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {message.status === 'replied' ? 'Replied' : 'Not Replied'}
                  </span>
                </div>
              </Table.Td>
              <Table.Td className="cursor-pointer justify-center border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                <div className="flex justify-center gap-3">
                  <Lucide
                    icon="Eye"
                    className="h-6 w-6 text-black"
                    onClick={() => handleViewOnClick(message.id.toString())}
                  />
                  {message.status !== 'replied' && (
                    <Lucide
                      icon="MessageSquare"
                      className="h-6 w-6 text-blue-500"
                      onClick={() => handleReplyOnClick(message.id.toString())}
                    />
                  )}
                  {permissionChecker(
                    <Lucide
                      icon="Trash2"
                      className="h-6 w-6 text-red-500"
                      onClick={() => handleDelete(message.id.toString())}
                    />,
                    'support_management.delete'
                  )}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this contact message?"
        onConfirm={() => confirmDelete()}
        onCancel={() => cancelDelete()}
      />
    </div>
  )
}

export default ContactUsTable
