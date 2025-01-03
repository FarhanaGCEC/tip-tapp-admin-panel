import Table from '../common/table'
import { ReportItem } from '../../types/reporttype'

interface ReportTableProps {
  headers: { key: number; label: string }[]
  reportItems: ReportItem[]
}

const ReportTable: React.FC<ReportTableProps> = ({ headers, reportItems }) => {
  return (
    <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
      <Table.Thead variant="default">
        <Table.Tr>
          {headers.map((header) => (
            <Table.Th
              key={header.key}
              //  className="whitespace-nowrap border-b-0 "
              className={`whitespace-nowrap border-b-0  ${
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
          <Table.Tr className="intro-x h-[68px] drop-shadow-lg " key={item.nId}>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 ">
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.TransactionType
                ? item.TransactionType.charAt(0).toUpperCase() +
                  item.TransactionType.slice(1)
                : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Account
                ? item.Account.charAt(0).toUpperCase() +
                  item.Account.slice(1)
                : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white  text-end shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.Amount ? item.Amount : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white text-end shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.OpenBalance ? item.OpenBalance : 'Not Provide Yet'}
            </Table.Td>
            <Table.Td className="border-b-0 bg-white text-end shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
              {item.CloseBalance ? item.CloseBalance : 'Not Provide Yet'}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default ReportTable
