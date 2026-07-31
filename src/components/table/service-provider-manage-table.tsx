/* eslint-disable react/function-component-definition */
import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { TipItem } from '../../types/tpandsptype'
import Lucide from '../common/lucide'
import { useDeactiveUserAndActive } from '../../api/tp-and-sp-management/tp-sp-management'
import StatusButton from '../common/button/statusBtn'
import UserAvatar from '../common/user-avatar'

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
  pending: boolean
}

const SPManagemenTable: React.FC<TpAndSpManagemenTableProps> = ({
  headers,
  tipItems,
  pending,
  handleClick,
}) => {
  const { mutate: deactivateActivateUser } = useDeactiveUserAndActive()

  const DeactiveAndActivehandle = (userid: string, typesatus: string) => {
    deactivateActivateUser({ userid, satustype: typesatus })
  }

  const Tdheader = headers
    .map((header) => {
      if (pending && header.label === 'STATUS') {
        return { ...header, label: 'EMIRATES ID' }
      }
      return header
    })
    .filter((header) => !(pending && header.label === 'STATUS'))

  return (
    <Table cards>
      <Table.Thead variant="default">
        <Table.Tr>
          {Tdheader.map((header) => (
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
        {tipItems.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td className="font-medium">
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={item.ProfilePictureURL}
                  alt={`${item.FirstName || ''} ${item.LastName || ''}`.trim() || 'User'}
                  className="h-9 w-9"
                />
                <span>
                  {`${item.FirstName || ''} ${item.LastName || ''}`.trim() ||
                    'Not Provided Yet'}
                </span>
              </div>
            </Table.Td>
            <Table.Td className="max-w-[220px] truncate">
              {item.Email || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td>{item.Whatsapp || 'Not Provided Yet'}</Table.Td>
            <Table.Td>{item.Phone || 'Not Provided Yet'}</Table.Td>
            <Table.Td>{item.Country || 'N/A'}</Table.Td>
            {pending ? (
              <Table.Td>{item.EmiratesId || 'Not Provided Yet'}</Table.Td>
            ) : (
              <Table.Td>
                <div className="flex justify-center">
                  <StatusButton status={item?.Status} />
                </div>
              </Table.Td>
            )}
            <Table.Td>
              <div className="flex items-center justify-center gap-1">
                <button
                  type="button"
                  className="tipapp-table__action"
                  aria-label="View user"
                  onClick={() =>
                    handleClick(
                      SlideoverRegistry.viewTpAndSpManagement,
                      item.id.toString(),
                      pending
                    )
                  }
                >
                  <Lucide icon="Eye" className="h-5 w-5" />
                </button>
                {pending ? (
                  <>
                    <button
                      type="button"
                      className="tipapp-table__action text-emerald-600"
                      aria-label="Approve"
                      onClick={() =>
                        DeactiveAndActivehandle(item.KeyCloakID, item.Status)
                      }
                    >
                      <Lucide icon="CheckCircle" className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="tipapp-table__action text-red-500"
                      aria-label="Reject"
                      onClick={() =>
                        DeactiveAndActivehandle(item.KeyCloakID, 'active')
                      }
                    >
                      <Lucide icon="XCircle" className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default SPManagemenTable
