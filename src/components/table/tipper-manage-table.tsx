import { useState } from 'react'
import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { TipItem } from '../../types/tpandsptype'
import Lucide from '../common/lucide'
import StatusButton from '../common/button/statusBtn'
import UserAvatar from '../common/user-avatar'
import { formatDisplayAmount } from '../../utils/formatMoney'
import TipsGivenNotesModal from '../tp-managemet/tips-given-notes-modal'

interface TpAndSpManagemenTableProps {
  headers: { key: number; label: string }[]
  tipItems: TipItem[]
  handleClick: (
    formContent: {
      title: string
      component: (props: {
        userId: string
        Ispending: boolean
      }) => React.ReactElement
    },
    userId: string,
    Ispending: boolean
  ) => void
}

const TPManagemenTable: React.FC<TpAndSpManagemenTableProps> = ({
  headers,
  tipItems,
  handleClick,
}) => {
  const [notesUser, setNotesUser] = useState<{
    name: string
    dualRole: boolean
  } | null>(null)

  return (
    <>
      <Table cards>
        <Table.Thead variant="default">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th
                key={header.key}
                className={
                  header.label.toLowerCase() === 'status' ||
                  header.label.toLowerCase() === 'action' ||
                  header.label.toLowerCase() === 'actions'
                    ? 'text-center'
                    : ''
                }
              >
                {header.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tipItems.map((item) => {
            const fullName =
              `${item.FirstName || ''} ${item.LastName || ''}`.trim() ||
              'Not Provided Yet'
            const tipCount = item.tipsGiven?.count ?? 0
            const isDualRole = String(item.Role || '').toLowerCase() === 'both'

            return (
              <Table.Tr key={item.id}>
                <Table.Td className="font-medium">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      src={item.ProfilePictureURL}
                      alt={fullName}
                      className="h-9 w-9"
                    />
                    <span>
                      {fullName}
                      {isDualRole ? (
                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                          Both
                        </span>
                      ) : null}
                    </span>
                  </div>
                </Table.Td>
                <Table.Td className="max-w-[220px] truncate">
                  {item.Email || 'Not Provided Yet'}
                </Table.Td>
                <Table.Td>{item.Phone || 'Not Provided Yet'}</Table.Td>
                <Table.Td>{item.Whatsapp || 'Not Provided Yet'}</Table.Td>
                <Table.Td>{item.Country || 'Not Provided Yet'}</Table.Td>
                <Table.Td>
                  <div className="flex items-start gap-2">
                    <div>
                      <p className="font-medium">{tipCount}</p>
                      <p className="text-sm text-slate-600">
                        {formatDisplayAmount(item.tipsGiven?.amounts)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-0.5 rounded-md border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm hover:border-primary hover:text-primary"
                      aria-label={
                        isDualRole
                          ? `View tips sent and received by ${fullName}`
                          : `View tips given by ${fullName}`
                      }
                      title={
                        isDualRole
                          ? 'View tips sent & received'
                          : 'View who received tips'
                      }
                      onClick={() =>
                        setNotesUser({ name: fullName, dualRole: isDualRole })
                      }
                    >
                      <Lucide icon="FileText" className="h-4 w-4" />
                    </button>
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="flex justify-center">
                    <StatusButton status={item?.Status} />
                  </div>
                </Table.Td>
                <Table.Td>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="tipapp-table__action"
                      aria-label="View user"
                      onClick={() =>
                        handleClick(
                          SlideoverRegistry.viewTpAndSpManagement,
                          item.id.toString(),
                          false
                        )
                      }
                    >
                      <Lucide icon="Eye" className="h-5 w-5" />
                    </button>
                  </div>
                </Table.Td>
              </Table.Tr>
            )
          })}
        </Table.Tbody>
      </Table>

      <TipsGivenNotesModal
        open={Boolean(notesUser)}
        tipperName={notesUser?.name || ''}
        dualRole={notesUser?.dualRole}
        onClose={() => setNotesUser(null)}
      />
    </>
  )
}

export default TPManagemenTable
