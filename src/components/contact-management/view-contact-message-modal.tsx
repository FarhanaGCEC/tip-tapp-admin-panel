/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Dialog } from '../common/headless'
import { ContactMessage } from '../../types/contactUsTypes'

interface ViewContactMessageModalProps {
  isOpen: boolean
  onClose: () => void
  contactMessage: ContactMessage | null
}

const ViewContactMessageModal: React.FC<ViewContactMessageModalProps> = ({
  isOpen,
  onClose,
  contactMessage,
}) => {
  if (!contactMessage) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Panel className="max-w-4xl">
        <Dialog.Title className="px-6 py-4 text-lg font-medium text-gray-900">
          Contact Message Details
        </Dialog.Title>

        <div className="px-6 pb-6">
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="text-sm text-gray-900">{contactMessage.name}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-sm text-gray-900">{contactMessage.email}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="text-sm text-gray-900">
                  {contactMessage['phone no'] || '-'}
                </p>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Action
              </label>
              <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-800">
                {(contactMessage.action || contactMessage.status || 'pending')
                  .charAt(0)
                  .toUpperCase() +
                  (contactMessage.action || contactMessage.status || 'pending').slice(
                    1
                  )}
              </span>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date
              </label>
              <p className="text-sm text-gray-900">
                {formatDate(contactMessage.date || contactMessage.createdAt)}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-2 rounded-md bg-gray-50 p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-900">
                  {contactMessage.message}
                </p>
              </div>
            </div>

            {contactMessage.replies && contactMessage.replies.length > 0 && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Replies
                </label>
                <div className="mt-2 space-y-3">
                  {contactMessage.replies.map((reply) => (
                    <div key={reply.id} className="rounded-md bg-blue-50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-900">
                        {reply.replyMessage || reply.message || ''}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {formatDate(reply.sentAt || reply.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default ViewContactMessageModal
