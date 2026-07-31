import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { TipItem } from '../../types/tpandsptype'
import Label from '../common/label/active-banned-new-label'
import actionEye from '../../assets/images/svg/actions.svg'
import UserAvatar from '../common/user-avatar'

interface TpAndSpManagemenTableProps {
  headers: { key: number; label: string }[]
  tipItems: TipItem[]
  handleClick: (
    formContent: {
      title: string
      component: (props: { userId: string; Ispending: boolean }) => React.ReactElement
    },
    userId: string
  ) => void
}



const TpAndSpManagemenTable: React.FC<TpAndSpManagemenTableProps> = ({
  headers,
  tipItems,
  handleClick,
}) => {
  return (
    <Table cards className="sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th key={header.key} className="mb-[30px] w-full">
              <span
                className={`flex w-full text-center ${
                  header.label === 'STATUS'
                    ? 'items-center justify-center '
                    : ''
                } ${header.label === 'MOBILE NUMBER' && 'flex min-w-[150px] '}`}
              >
                {header.label}
              </span>
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {tipItems.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>
              <div className="flex items-center gap-3 whitespace-nowrap font-medium">
                <UserAvatar
                  src={item.ProfilePictureURL}
                  alt={`${item.FirstName || ''} ${item.LastName || ''}`.trim() || 'User'}
                  className="h-9 w-9"
                />
                <span>{`${item.FirstName || ''} ${item.LastName || ''}`.trim()}</span>
              </div>
            </Table.Td>
            <Table.Td >
              {item.Email || 'no'}
            </Table.Td>
            <Table.Td >
              {item.Phone || 'N/A'}
            </Table.Td>
            <Table.Td className="min-w-[180px]">
              {item.Country || 'no'}
            </Table.Td>
            <Table.Td >
              <Label
                labledata={item.Status === 'active' ? 'Active' : 'Inactive'}
                lablestyle={`${
                  item.Status === 'active'
                    ? 'bg-[#2F9E44]'
                    : item.Status === 'new'
                    ? 'bg-yellow-400'
                    : 'bg-[#D70000]'
                } min-w-[115px]`}
              />
            </Table.Td>
            <Table.Td className="cursor-pointer">
              <div
                className="flex cursor-pointer justify-center duration-300 hover:scale-90"
                onClick={() =>
                  handleClick(
                    SlideoverRegistry.viewTpAndSpManagement,
                    item.id.toString()
                  )
                }
              >
                <img src={actionEye} alt="" />
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default TpAndSpManagemenTable
