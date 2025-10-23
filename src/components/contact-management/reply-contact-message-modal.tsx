/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { Dialog } from '../common/headless'
import { ContactMessage } from '../../types/contactUsTypes'

interface ReplyContactMessageModalProps {
  isOpen: boolean
  onClose: () => void
  contactMessage: ContactMessage | null
  onReply: (messageId: string, replyMessage: string) => void
}

const ReplyContactMessageModal: React.FC<ReplyContactMessageModalProps> = ({
  isOpen,
  onClose,
  contactMessage,
  onReply,
}) => {
  const [replyMessage, setReplyMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!contactMessage) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyMessage.trim()) return

    setIsSubmitting(true)
    try {
      await onReply(contactMessage.id.toString(), replyMessage)
      setReplyMessage('')
      onClose()
    } catch (error) {
      console.error('Error sending reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setReplyMessage('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Dialog.Panel className="max-w-4xl">
        <Dialog.Title className="text-lg font-medium text-gray-900">
          Reply to Contact Message
        </Dialog.Title>

        <div className="mt-4 space-y-4 p-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {contactMessage.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {contactMessage.email}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Original Message
            </label>
            <div className="mt-1 rounded-md bg-gray-50 p-3">
              <p className="whitespace-pre-wrap text-sm text-gray-900">
                {contactMessage.message}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="replyMessage"
                className="block text-sm font-medium text-gray-700"
              >
                Your Reply
              </label>
              <textarea
                id="replyMessage"
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                placeholder="Type your reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting || !replyMessage.trim()}
              >
                {isSubmitting ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </form>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default ReplyContactMessageModal
