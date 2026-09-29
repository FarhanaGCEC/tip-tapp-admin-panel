import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { TipItem } from '../../types/tpandsptype'
import Lucide from '../common/lucide'
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
}

const TPManagemenTable: React.FC<TpAndSpManagemenTableProps> = ({
  headers,
  tipItems,
  handleClick,
}) => {
  return (
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
            <Table.Td>{item.Country || 'Not Provided Yet'}</Table.Td>
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
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default TPManagemenTable
