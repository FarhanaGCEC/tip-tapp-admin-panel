import Table from '../common/table'
import SlideoverRegistry from '../../pages/user-management/slideover-registry'
import { TipItem } from '../../types/tpandsptype'
import Label from '../common/label/active-banned-new-label'
import Lucide from '../common/lucide'
import StatusButton from '../common/button/statusBtn'

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

  //pending: boolean
}

const TPManagemenTable: React.FC<TpAndSpManagemenTableProps> = ({
  headers,
  tipItems,
  handleClick,
}) => {
  return (
    <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              //  className="whitespace-nowrap border-b-0 "
              className={`whitespace-nowrap border-b-0    ${
                header.label.toLowerCase() === 'status' ? ' px-10 ' : ''
              }`}
            >
              {header.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {tipItems.map((item) => (
          <Table.Tr
            className="intro-x  h-[68px] drop-shadow-lg"
            key={item.id}
          >
            <Table.Td className="border-b-0  bg-white  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.FirstName + ' ' + item.LastName || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className=" border-b-0  bg-white  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Email || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Whatsapp || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Phone || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Country || 'Not Provided Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white  shadow-[20px_3px_9.6px_-2px_#0000001a] first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              <StatusButton status={item?.Status} />
            </Table.Td>
            <Table.Td className="flex h-[68px] cursor-pointer    border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              <div className=" mt-2  flex flex-row   ">
                <Lucide
                  icon="Eye"
                  className="ml-3 h-10 w-6 text-black"
                  onClick={() =>
                    handleClick(
                      SlideoverRegistry.viewTpAndSpManagement,
                      item.KeyCloakID,
                      false
                    )
                  }
                />
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default TPManagemenTable
