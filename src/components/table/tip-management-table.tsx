import date from 'date-and-time'
import Table from '../common/table'
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
    <Table cards>
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              className={header.label.toLowerCase().includes('amount') ? 'text-end' : ''}
            >
              {header.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {tipItems.map((item) => (
          <Table.Tr key={item.TipId}>
            <Table.Td className="font-medium">
              #{item.TipId}
            </Table.Td>
            <Table.Td className="whitespace-nowrap">
              {date.format(new Date(item.createdAt), 'DD MMM YYYY')}
            </Table.Td>
            <Table.Td>{item.tipperName || 'N/A'}</Table.Td>
            <Table.Td>{item.serviceProviderName || 'N/A'}</Table.Td>
            <Table.Td className="text-end font-semibold">
              {formatMoney(item, currency)}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default TipManagementTable
