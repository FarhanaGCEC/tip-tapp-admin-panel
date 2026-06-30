import Table from '../common/table'
import date from 'date-and-time'
import { TipItem } from '../../types/tips'
import { useCurrencyStore } from '../../stores/currencyStore'
import { formatMoney } from '../../utils/formatMoney'

interface TipManagementTableProps {
  headers: { key: number; label: string }[]
  tipItems: TipItem[]
}

const TipManagementTable: React.FC<TipManagementTableProps> = ({
  headers,
  tipItems,
}) => {
  const currency = useCurrencyStore((state) => state.currency)

  return (
    <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              className={`whitespace-nowrap border-b-0 ${
                header.key === 2 ||
                header.key === 3 ||
                header.key === 4 
                  ? ' px-16 '
                  : header.key === 5
                  ? ' text-end  '
                  : ''
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
            className="intro-x h-[68px] drop-shadow-lg "
            key={item.TipId}
          >
            <Table.Td className="w-[150px] border-b-0  bg-[#fff]  first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              {item.TipId}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white px-16  first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              {date.format(new Date(item.createdAt), 'DD/MM/YYYY')}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white px-16  first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              {item.tipperName || 'N/A'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white px-16  first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              {item.serviceProviderName || 'N/A'}
            </Table.Td>
            <Table.Td className="cursor-pointer border-b-0  bg-white   text-end  first:rounded-l-lg last:rounded-r-lg dark:bg-darkmode-600">
              {formatMoney(item, currency)}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default TipManagementTable
