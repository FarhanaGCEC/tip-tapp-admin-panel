/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React, { useState } from 'react'
import ContactUsTable from '../components/table/contact-us-table'
import ViewContactMessageModal from '../components/contact-management/view-contact-message-modal'
import ReplyContactMessageModal from '../components/contact-management/reply-contact-message-modal'
import { ContactMessage, ContactUsFilters } from '../types/contactUsTypes'
import {
  FormInput,
  FormSelect,
} from '../components/common/form-elements/components'
import Button from '../components/common/button'
import Lucide from '../components/common/lucide'
import FilterIcon from '../assets/images/icons/filter-icon.svg'
import Toast from '../utils/notification'
import SharedDataContainer from '../containers/sharedData'
import { Icons, NotificationTypes } from '../constants'
import {
  useGetContactMessages,
  useGetContactMessageById,
  useReplyToContactMessage,
  useDeleteContactMessage,
} from '../api/contact-us-management'

const ContactUsManagement: React.FC = () => {
  const { setNotification } = SharedDataContainer.useContainer()
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  )
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)

  // Filters and pagination
  const [filters, setFilters] = useState<ContactUsFilters>({
    page: 1,
    limit: 10,
    search: '',
    status: undefined,
    dateFrom: '',
    dateTo: '',
  })

  // React Query hooks
  const { data: contactMessagesData, isLoading } =
    useGetContactMessages(filters)

  const { data: selectedMessageData } = useGetContactMessageById(
    selectedMessageId || '',
    !!selectedMessageId
  )

  const replyMutation = useReplyToContactMessage()
  const deleteMutation = useDeleteContactMessage()

  const tableHeaders = [
    { key: 1, label: 'Name' },
    { key: 2, label: 'Email' },
    { key: 3, label: 'Message' },
    { key: 4, label: 'Date' },
    { key: 5, label: 'Status' },
    { key: 6, label: 'Actions' },
  ]

  // Extract data from React Query
  const contactMessages = contactMessagesData?.data?.items || []
  const pagination = {
    totalItems: contactMessagesData?.data?.meta?.totalItems || 0,
    totalPages: contactMessagesData?.data?.meta?.totalPages || 0,
    currentPage: contactMessagesData?.data?.meta?.currentPage || 1,
    itemsPerPage: contactMessagesData?.data?.meta?.itemsPerPage || 10,
  }

  const selectedMessage = selectedMessageData?.data || null

  const handleViewMessage = (messageId: string) => {
    setSelectedMessageId(messageId)
    setIsViewModalOpen(true)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedMessageId(null)
  }

  const handleReplyMessage = (messageId: string) => {
    setSelectedMessageId(messageId)
    setIsReplyModalOpen(true)
  }

  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false)
    setSelectedMessageId(null)
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
      setIsReplyModalOpen(false)
      setSelectedMessageId(null)
    } catch (error) {
      console.error('Error sending reply:', error)
      setNotification({
        title: '',
        message: 'Failed to send reply',
        icon: Icons.XCIRCLE,
        type: NotificationTypes.ERROR,
      })
      Toast()
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
    setFilters((prev: ContactUsFilters) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'pending' | 'replied' | ''
    setFilters((prev: ContactUsFilters) => ({
      ...prev,
      status: value === '' ? undefined : value,
      page: 1,
    }))
  }

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: ContactUsFilters) => ({
      ...prev,
      dateFrom: e.target.value,
      page: 1,
    }))
  }

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: ContactUsFilters) => ({
      ...prev,
      dateTo: e.target.value,
      page: 1,
    }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev: ContactUsFilters) => ({ ...prev, page }))
  }

  return (
    <div className="intro-y box mt-5">
      <div className="flex flex-col border-b border-slate-200/60 p-5 dark:border-darkmode-400 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="mr-auto text-base font-medium">Contact Us Management</h2>
      </div>

      <div className="p-5">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <FormInput
              type="text"
              className="box w-full"
              placeholder="Search by name or email..."
              value={filters.search || ''}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2">
            <FormSelect
              className="box w-32"
              value={filters.status || ''}
              onChange={handleStatusChange}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="replied">Replied</option>
            </FormSelect>
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

        {/* Table */}
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Lucide icon="Loader" className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <ContactUsTable
            headers={tableHeaders}
            contactMessages={contactMessages}
            handleViewOnClick={handleViewMessage}
            handleReplyOnClick={handleReplyMessage}
            handleDeleteOnClick={handleDeleteMessage}
          />
        )}

        {/* Pagination */}
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

      {/* Modals */}
      <ViewContactMessageModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        contactMessage={selectedMessage}
      />

      <ReplyContactMessageModal
        isOpen={isReplyModalOpen}
        onClose={handleCloseReplyModal}
        contactMessage={selectedMessage}
        onReply={handleSendReply}
      />
    </div>
  )
}

export default ContactUsManagement
