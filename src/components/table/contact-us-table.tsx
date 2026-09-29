/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import { truncate } from 'lodash'
import Table from '../common/table'
import Lucide from '../common/lucide'
import permissionChecker from '../../hooks/permissonChecker'
import ConfirmationModal from '../common/confirmation/ConfirmationModal'
import { ContactThread } from '../../utils/groupContactThreads'

interface ContactUsTableProps {
  headers: { key: number; label: string }[]
  threads: ContactThread[]
  handleOpenChat: (thread: ContactThread) => void
  handleDeleteOnClick: (messageId: string) => void
}

function ContactUsTable({
  headers,
  threads,
  handleOpenChat,
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
      <Table cards className="sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={`whitespace-nowrap ${
                  header.label.toLowerCase() === 'actions' ? 'text-center' : ''
                }`}
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {threads.map((thread) => (
            <Table.Tr
              key={thread.key}
              className="cursor-pointer"
              onClick={() => handleOpenChat(thread)}
            >
              <Table.Td className="font-medium">
                <div className="flex items-center gap-2">
                  <span>{thread.name}</span>
                  {thread.messageCount > 1 ? (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {thread.messageCount}
                    </span>
                  ) : null}
                </div>
              </Table.Td>
              <Table.Td>
                {truncate(thread.email, { length: 28 })}
              </Table.Td>
              <Table.Td>{thread.phone || '-'}</Table.Td>
              <Table.Td>
                {truncate(thread.lastMessage.message, { length: 50 })}
              </Table.Td>
              <Table.Td>
                {formatDate(
                  thread.lastMessage.date || thread.lastMessage.createdAt
                )}
              </Table.Td>
              <Table.Td
                className="cursor-pointer justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    className="tipapp-table__action"
                    aria-label="Open chat"
                    onClick={() => handleOpenChat(thread)}
                  >
                    <Lucide
                      icon="MessageSquare"
                      className="h-5 w-5 text-brand-navy"
                    />
                  </button>
                  {permissionChecker(
                    <button
                      type="button"
                      className="tipapp-table__action"
                      aria-label="Delete last message"
                      onClick={() =>
                        handleDelete(thread.lastMessage.id.toString())
                      }
                    >
                      <Lucide icon="Trash2" className="h-5 w-5 text-red-500" />
                    </button>,
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
