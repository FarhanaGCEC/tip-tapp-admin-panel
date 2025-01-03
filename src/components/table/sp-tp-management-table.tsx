import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { TipItem } from '../../types/tpandsptype'
import Label from '../common/label/active-banned-new-label'
import actionEye from '../../assets/images/svg/actions.svg'
import { truncate } from 'lodash'

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
    <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
      <Table.Thead variant="default" className="">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th key={header.key} className="mb-[30px] w-full border-b-0">
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
          <Table.Tr className="intro-x h-[68px] drop-shadow-lg" key={item.id}>
            <Table.Td className="bg-white  border-b-0 shadow-[20px_3px_9.6px_-2px_#0000001a] first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              <a href="#" className="whitespace-nowrap font-medium">
                {`${item.FirstName + ' ' + item.LastName}`}
              </a>
            </Table.Td>
            <Table.Td className="bg-white border-b-0 shadow-[20px_3px_9.6px_-2px_#0000001a] first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              {item.Email || 'no'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Phone || 'N/A'}
            </Table.Td>
            <Table.Td className="min-w-[180px] border-b-0  bg-white  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Country || 'no'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md ">
              <Label
                labledata={item.Status === 'active' ? 'Active' : 'Inactive'}
                lablestyle={`${
                  item.Status === 'active'
                    ? 'bg-[#03C50B]'
                    : item.Status === 'new'
                    ? 'bg-yellow-400'
                    : 'bg-[#D70000]'
                } min-w-[115px]`}
              />
            </Table.Td>
            <Table.Td className="cursor-pointer border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              <div
                className="flex cursor-pointer justify-center duration-300 hover:scale-90"
                onClick={() =>
                  handleClick(
                    SlideoverRegistry.viewTpAndSpManagement,
                    item.KeyCloakID
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
