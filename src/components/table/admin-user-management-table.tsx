import React, { useState } from 'react'
import { truncate } from 'lodash'
import Table from '../common/table'
import Lucide from '../common/lucide'
import { UserDetailsItem } from '../../types/adminUserTypes'
import permissionChecker from '../../hooks/permissonChecker'
import StatusButton from '../common/button/statusBtn'
import ConfirmationModal from '../common/confirmation/ConfirmationModal'
import UserAvatar from '../common/user-avatar'

interface AdminManagementTableProps {
  headers: { key: number; label: string }[]
  Items: UserDetailsItem[]
  handleViewOnClick: (userId: string) => void
  handleEditOnClick: (userId: string) => void
  handleDeleteOnClick: (userId: string) => void
}

const AdminManagementTable: React.FC<AdminManagementTableProps> = ({
  headers,
  Items,
  handleViewOnClick,
  handleEditOnClick,
  handleDeleteOnClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  function handleDelete(userId: string) {
    setSelectedUserId(userId)
    setIsModalOpen(true)
  }

  function confirmDelete() {
    if (selectedUserId) {
      handleDeleteOnClick(selectedUserId)
    }
    setIsModalOpen(false)
  }

  function cancelDelete() {
    setSelectedUserId(null)
    setIsModalOpen(false)
  }

  return (
    <div>
      <Table cards>
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={
                  header.key === 5 || header.key === 6 ? 'text-center' : ''
                }
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Items.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td className="font-medium">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    src={item.ProfilePictureURL}
                    alt={`${item.FirstName || ''} ${item.LastName || ''}`.trim() || 'User'}
                    className="h-9 w-9"
                  />
                  <span>
                    {`${item.FirstName || ''} ${item.LastName || ''}`.trim()}
                  </span>
                </div>
              </Table.Td>
              <Table.Td >
                {truncate(item.Email, { length: 28 }) || 'N/A'}
              </Table.Td>
              <Table.Td>{item.Phone || 'N/A'}</Table.Td>
              <Table.Td>
                {item?.role?.name === 'SUPER_ADMIN'
                  ? 'Administrator'
                  : item?.role?.name || 'N/A'}
              </Table.Td>
              <Table.Td>
                <div className="flex justify-center">
                  <StatusButton status={item?.Status} />
                </div>
              </Table.Td>
              <Table.Td>
                <div className="flex items-center justify-center gap-1">
                  <button
                    type="button"
                    className="tipapp-table__action"
                    aria-label="View user"
                    onClick={() => handleViewOnClick(item.id.toString())}
                  >
                    <Lucide icon="Eye" className="h-5 w-5" />
                  </button>
                  {permissionChecker(
                    <button
                      type="button"
                      className="tipapp-table__action"
                      aria-label="Edit user"
                      onClick={() => handleEditOnClick(item.id.toString())}
                    >
                      <Lucide icon="Edit" className="h-5 w-5" />
                    </button>,
                    'user_management.edit'
                  )}
                  {permissionChecker(
                    <button
                      type="button"
                      className="tipapp-table__action text-red-500"
                      aria-label="Delete user"
                      onClick={() => handleDelete(item.KeyCloakID.toString())}
                    >
                      <Lucide icon="Trash2" className="h-5 w-5" />
                    </button>,
                    'user_management.delete'
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
        message="Are you sure you want to delete this User?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default AdminManagementTable
