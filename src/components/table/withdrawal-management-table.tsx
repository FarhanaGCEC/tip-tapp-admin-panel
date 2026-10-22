import date from 'date-and-time'
import Table from '../common/table'
import { WithdrawalItem } from '../../types/tips'
import { formatDisplayAmount } from '../../utils/formatMoney'

interface WithdrawalTableProps {
  headers: { key: number; label: string }[]
  withdrawalItems: WithdrawalItem[]
}

function formatWithdrawDate(value?: string): string {
  if (!value) return '—'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return '—'
  return date.format(parsed, 'DD MMM YYYY')
}

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({
  headers,
  withdrawalItems,
}) => {
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
              {formatWithdrawDate(item.DateCreate)}
            </Table.Td>
            <Table.Td>{item.serviceProviderName || 'N/A'}</Table.Td>
            <Table.Td className="text-end font-semibold">
              {formatDisplayAmount(item.amounts ?? item)}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default WithdrawalTable
