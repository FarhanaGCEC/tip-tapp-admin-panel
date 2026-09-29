/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useMemo, useState } from 'react'
import ContactUsTable from '../components/table/contact-us-table'
import ContactChatPanel from '../components/contact-management/contact-chat-panel'
import SlideoverPanel from '../components/slideover-panel'
import { ContactUsFilters } from '../types/contactUsTypes'
import {
  FormInput,
} from '../components/common/form-elements/components'
import Button from '../components/common/button'
import Lucide from '../components/common/lucide'
import FilterIcon from '../assets/images/icons/filter-icon.svg'
import Toast from '../utils/notification'
import SharedDataContainer from '../containers/sharedData'
import { Icons, NotificationTypes } from '../constants'
import {
  useGetContactMessages,
  useReplyToContactMessage,
  useDeleteContactMessage,
} from '../api/contact-us-management'
import {
  ContactThread,
  groupContactThreads,
} from '../utils/groupContactThreads'

const ContactUsManagement: React.FC = () => {
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [selectedThread, setSelectedThread] = useState<ContactThread | null>(
    null
  )

  const [filters, setFilters] = useState<ContactUsFilters>({
    page: 1,
    limit: 50,
    search: '',
    status: undefined,
    dateFrom: '',
    dateTo: '',
  })

  const { data: contactMessagesData, isLoading } =
    useGetContactMessages(filters)

  // Full conversation for selected person (by email search)
  const conversationFilters: ContactUsFilters = {
    page: 1,
    limit: 100,
    search: selectedThread?.email || '',
  }
  const { data: conversationData, isLoading: conversationLoading } =
    useGetContactMessages(
      conversationFilters,
      Boolean(selectedThread?.email)
    )

  const replyMutation = useReplyToContactMessage()
  const deleteMutation = useDeleteContactMessage()

  const tableHeaders = [
    { key: 1, label: 'Name' },
    { key: 2, label: 'Email' },
    { key: 3, label: 'Phone' },
    { key: 4, label: 'Last Message' },
    { key: 5, label: 'Date' },
    { key: 6, label: 'Actions' },
  ]

  const contactMessages = contactMessagesData?.data?.items || []
  const threads = useMemo(
    () => groupContactThreads(contactMessages),
    [contactMessages]
  )

  const conversationMessages = useMemo(() => {
    if (!selectedThread) return []
    const items = conversationData?.data?.items || []
    const email = selectedThread.email.trim().toLowerCase()
    const filtered = email
      ? items.filter((m) => (m.email || '').trim().toLowerCase() === email)
      : items
    return filtered.length ? filtered : selectedThread.messages
  }, [conversationData, selectedThread])

  const pagination = {
    totalItems: contactMessagesData?.data?.meta?.totalItems || 0,
    totalPages: contactMessagesData?.data?.meta?.totalPages || 0,
    currentPage: contactMessagesData?.data?.meta?.currentPage || 1,
    itemsPerPage: contactMessagesData?.data?.meta?.itemsPerPage || 50,
  }

  const handleOpenChat = (thread: ContactThread) => {
    setSelectedThread(thread)
    handleSlider()
  }

  const handleCloseChat = () => {
    setSelectedThread(null)
    handleSlider()
  }

  const handleSendReply = async (messageId: string, replyMessage: string) => {
    try {
      await replyMutation.mutateAsync({ messageId, replyMessage })
      setNotification({
        title: '',
        message: 'Reply sent successfully',
        icon: Icons.CHECKCIRCLE,
        type: NotificationTypes.SUCCESS,
      })
      Toast()
    } catch (error) {
      console.error('Error sending reply:', error)
      setNotification({
        title: '',
        message: 'Failed to send reply',
        icon: Icons.XCIRCLE,
        type: NotificationTypes.ERROR,
      })
      Toast()
      throw error
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMutation.mutateAsync(messageId)
      setNotification({
        title: '',
        message: 'Message deleted successfully',
        icon: Icons.CHECKCIRCLE,
        type: NotificationTypes.SUCCESS,
      })
      Toast()
    } catch (error) {
      console.error('Error deleting message:', error)
      setNotification({
        title: '',
        message: 'Failed to delete message',
        icon: Icons.XCIRCLE,
        type: NotificationTypes.ERROR,
      })
      Toast()
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }))
  }

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      dateFrom: e.target.value,
      page: 1,
    }))
  }

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      dateTo: e.target.value,
      page: 1,
    }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  return (
    <div className="intro-y box mt-5">
      <div className="flex flex-col border-b border-slate-200/60 p-5 dark:border-darkmode-400 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="mr-auto text-base font-medium">Contact Us Management</h2>
      </div>

      <div className="p-5">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <FormInput
              type="text"
              className="box w-full"
              placeholder="Search by name, email or phone..."
              value={filters.search || ''}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2">
            <FormInput
              type="date"
              className="box w-40"
              placeholder="From Date"
              value={filters.dateFrom || ''}
              onChange={handleDateFromChange}
            />
            <FormInput
              type="date"
              className="box w-40"
              placeholder="To Date"
              value={filters.dateTo || ''}
              onChange={handleDateToChange}
            />
            <Button className="!box flex items-center gap-2.5 !font-medium text-black dark:text-slate-300">
              <img src={FilterIcon} alt="Filter Icon" />
              <span className="hidden sm:block">Filters</span>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Lucide icon="Loader" className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <ContactUsTable
            headers={tableHeaders}
            threads={threads}
            handleOpenChat={handleOpenChat}
            handleDeleteOnClick={handleDeleteMessage}
          />
        )}

        {pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{' '}
              {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems
              )}{' '}
              of {pagination.totalItems} results
            </div>
            <div className="flex space-x-2">
              <Button
                className="!box"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                Previous
              </Button>
              <span className="px-3 py-2 text-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <Button
                className="!box"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <SlideoverPanel
        close
        size="lg"
        footer={null}
        contentClassName="!flex !h-full !min-h-0 !flex-col !overflow-hidden !p-0"
      >
        {selectedThread ? (
          <ContactChatPanel
            thread={selectedThread}
            messages={conversationMessages}
            isLoading={conversationLoading && !!selectedThread.email}
            onClose={handleCloseChat}
            onSendReply={handleSendReply}
          />
        ) : (
          <div />
        )}
      </SlideoverPanel>
    </div>
  )
}

export default ContactUsManagement
