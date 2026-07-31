import date from 'date-and-time'
import Table from '../common/table'
import { WithdrawalItem } from '../../types/tips'
import { useCurrencyStore } from '../../stores/currencyStore'
import { formatMoney } from '../../utils/formatMoney'

interface WithdrawalTableProps {
  headers: { key: number; label: string }[]
  withdrawalItems: WithdrawalItem[]
}

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({
  headers,
  withdrawalItems,
}) => {
  const currency = useCurrencyStore((state) => state.currency)

  return (
    <Table cards>
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              className={
                header.label.toLowerCase().includes('amount') ||
                header.label.toLowerCase().includes('date')
                  ? 'text-end'
                  : ''
              }
            >
              {header.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {withdrawalItems.map((item) => (
          <Table.Tr key={item.WithdrawId}>
            <Table.Td className="font-medium">
              #{item.WithdrawId || 0}
            </Table.Td>
            <Table.Td className="whitespace-nowrap text-end">
              {date.format(new Date(item.DateCreate), 'DD MMM YYYY')}
            </Table.Td>
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

export default WithdrawalTable
