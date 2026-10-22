import date from 'date-and-time'
import Table from '../common/table'
import { TipItem } from '../../types/tips'
import { formatAmountWithCurrency, formatDisplayAmount } from '../../utils/formatMoney'

interface TipManagementTableProps {
  headers: { key: number; label: string }[]
  tipItems: TipItem[]
  variant?: 'received' | 'given'
}

function formatTipDate(value?: string): string {
  if (!value) return '—'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return '—'
  return date.format(parsed, 'DD MMM YYYY')
}

function formatCharge(item: TipItem): string {
  if (item.chargeAmount == null || item.chargeAmount === '' || !item.chargeCurrency) {
    return '—'
  }
  const amount = Number(item.chargeAmount)
  if (Number.isNaN(amount)) return '—'
  return formatAmountWithCurrency(amount, item.chargeCurrency)
}

const TipManagementTable: React.FC<TipManagementTableProps> = ({
  headers,
  tipItems,
  variant: _variant = 'received',
}) => {
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
              {formatTipDate(item.createdAt)}
            </Table.Td>
            <Table.Td>{item.tipperName || 'N/A'}</Table.Td>
            <Table.Td>{item.serviceProviderName || 'N/A'}</Table.Td>
            <Table.Td className="text-end font-semibold">
              {formatDisplayAmount(item.amounts ?? item)}
            </Table.Td>
            <Table.Td className="text-end">{formatCharge(item)}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default TipManagementTable
