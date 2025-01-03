import Table from '../common/table'
import date from 'date-and-time'
import { TipItem, WithdrawalItem } from '../../types/tips'

interface WithdrawalTableProps {
  headers: { key: number; label: string }[]
  withdrawalItems: WithdrawalItem[]
}

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({
  headers,
  withdrawalItems,
}) => {
  return (
    <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              className={`whitespace-nowrap border-b-0  ${
                header.label === 'WITHDRAW DATE'
                  ? ' pr-36 text-end '
                  : header.label === 'SEVICE PROVIDER NAME'
                  ? '    lg:ps-36'
                  : header.label === 'AMOUNT'
                  ? ' pr-5 text-end'
                  : ''
              }`}
            >
              {header.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {withdrawalItems.map((item) => (
          <Table.Tr
            className="intro-x  h-[68px] drop-shadow-lg"
            key={item.WithdrawId}
          >
            <Table.Td className=" border-b-0 bg-white px-6  shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.WithdrawId || 0}
            </Table.Td>
            <Table.Td className=" border-b-0 bg-white px-20   pr-44 text-end shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {date.format(new Date(item.DateCreate), 'DD/MM/YYYY')}
            </Table.Td>
            <Table.Td className="  border-b-0 bg-white  shadow-[20px_3px_20px_#0000000b]   first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 lg:ps-36">
              {item.serviceProviderName || 'N/A'}
            </Table.Td>
            <Table.Td className="cursor-pointer  border-b-0 bg-white px-16 pr-5 text-end shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Amount || 0}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default WithdrawalTable
