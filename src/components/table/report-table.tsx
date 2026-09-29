import Table from '../common/table'
import { ReportItem } from '../../types/reporttype'

interface ReportTableProps {
  headers: { key: number; label: string }[]
  reportItems: ReportItem[]
}

const ReportTable: React.FC<ReportTableProps> = ({ headers, reportItems }) => {
  return (
    <Table cards className="sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              //  className="whitespace-nowrap"
              className={`whitespace-nowrap  ${
                header.label.toLowerCase() === 'amount' ||
                header.label.toLowerCase() === 'open balance' ||
                header.label.toLowerCase() === 'close balance'
                  ? ' text-end '
                  : ''
              }`}
            >
              {header.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {reportItems.map((item) => (
          <Table.Tr key={item.nId}>
            <Table.Td >
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td >
              {item.TransactionType
                ? item.TransactionType.charAt(0).toUpperCase() +
                  item.TransactionType.slice(1)
                : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td >
              {item.Account
                ? item.Account.charAt(0).toUpperCase() +
                  item.Account.slice(1)
                : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="text-end">
              {item.Amount ? item.Amount : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="text-end">
              {item.OpenBalance ? item.OpenBalance : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="text-end">
              {item.CloseBalance ? item.CloseBalance : 'Not Provide Yet'}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default ReportTable
